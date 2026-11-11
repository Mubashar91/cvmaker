import { test, expect, type Page } from "@playwright/test";

const store = (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem("folio-drafts-v2") || "[]") as { id: string; cv: { personal: { name: string }; experience: { title: string; description: string }[]; summary: string } }[]);

async function startCV(page: Page, name: string) {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill(name);
}

async function addExperience(page: Page, title: string, company: string, description: string) {
  await page.getByRole("button", { name: "Work experience", exact: true }).click();
  await page.getByRole("button", { name: "Add experience", exact: true }).click();
  await page.getByLabel("Job title", { exact: true }).last().fill(title);
  await page.getByLabel("Company", { exact: true }).last().fill(company);
  await page.getByLabel("Description", { exact: true }).last().fill(description);
}

test("downloads an editable Word document with the visible sections", async ({ page }) => {
  await startCV(page, "Word Person");
  await page.getByLabel("Email address", { exact: true }).fill("word@example.com");
  await addExperience(page, "Support lead", "Example Studio", "Answered 40 emails a day.\nTrained two new starters.");
  await page.getByRole("button", { name: "Skills", exact: true }).click();
  await page.getByLabel("Your skills").fill("HIDDEN_SKILL");
  await page.getByRole("button", { name: "Hide Skills", exact: true }).click();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Word document", exact: true }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("Word Person CV.docx");
  const mammoth = await import("mammoth");
  const { value } = await (mammoth.default ?? mammoth).extractRawText({ path: (await download.path())! });
  for (const expected of ["Word Person", "word@example.com", "Work experience", "Support lead", "Example Studio", "Answered 40 emails a day.", "Trained two new starters."]) expect(value).toContain(expected);
  expect(value).not.toContain("HIDDEN_SKILL");
});

test("undo and redo work with buttons and the keyboard, one step per typing burst", async ({ page }) => {
  await page.goto("/editor/");
  const undo = page.getByRole("button", { name: "Undo", exact: true });
  const redo = page.getByRole("button", { name: "Redo", exact: true });
  await expect(undo).toBeDisabled();
  const name = page.getByLabel("Full name", { exact: true });
  await name.pressSequentially("Undo Person", { delay: 20 });
  await undo.click();
  await expect(name).toHaveValue("");
  await redo.click();
  await expect(name).toHaveValue("Undo Person");
  await page.getByRole("button", { name: "Templates & layout" }).click();
  await page.getByRole("button", { name: "Use Modern template", exact: true }).click();
  await expect(page.getByRole("button", { name: "Use Modern template", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Control+z");
  await expect(page.getByRole("button", { name: "Use Classic template", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Control+y");
  await expect(page.getByRole("button", { name: "Use Modern template", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("entries and sections can be reordered by dragging", async ({ page }) => {
  await startCV(page, "Drag Person");
  await addExperience(page, "First role", "One Co", "Did the first thing.");
  await addExperience(page, "Second role", "Two Co", "Did the second thing.");
  const cards = page.locator(".entry-card");
  await cards.nth(1).locator(".drag-handle").hover();
  const target = await cards.nth(0).boundingBox();
  await page.mouse.down();
  await page.mouse.move(target!.x + 40, target!.y + 10, { steps: 12 });
  await page.mouse.up();
  await expect(page.getByLabel("Job title", { exact: true }).first()).toHaveValue("Second role");
  await page.keyboard.press("Control+z");
  await expect(page.getByLabel("Job title", { exact: true }).first()).toHaveValue("First role");

  await page.getByRole("button", { name: "Templates & layout" }).click();
  const rows = page.locator(".order-row");
  await expect(rows.first()).toContainText("Profile");
  await rows.nth(2).locator(".drag-handle").hover();
  const firstRow = await rows.nth(0).boundingBox();
  await page.mouse.down();
  await page.mouse.move(firstRow!.x + 40, firstRow!.y + 2, { steps: 10 });
  await page.mouse.up();
  await expect(rows.first()).toContainText("Education");
});

test("an older saved draft moves into the saved CV list, and copies are kept separately", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("folio-draft-v1", JSON.stringify({ version: 1, template: "classic", personal: { name: "Legacy Person", headline: "Analyst", email: "", phone: "", location: "", website: "" }, summary: "Legacy summary.", skills: "", languages: "", additional: "", experience: [], education: [], projects: [], certifications: [], sectionOrder: ["summary", "experience", "education", "skills", "languages", "projects", "certifications", "additional"], hiddenSections: [] })));
  await page.reload();
  await page.getByRole("button", { name: "Welcome back. Continue your saved draft" }).click();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Legacy Person");
  expect(await page.evaluate(() => localStorage.getItem("folio-draft-v1"))).toBeNull();
  expect((await store(page)).map(draft => draft.cv.personal.name)).toEqual(["Legacy Person"]);
  await expect(page.getByRole("status").filter({ hasText: "Saved on this device" })).toBeVisible();

  await page.getByLabel("Full name", { exact: true }).fill("Legacy Person for Job B");
  await expect(page.getByRole("status").filter({ hasText: "Unsaved changes" })).toBeVisible();
  await page.getByRole("button", { name: "Save as a copy", exact: true }).click();
  expect((await store(page)).map(draft => draft.cv.personal.name).sort()).toEqual(["Legacy Person", "Legacy Person for Job B"]);
  await expect(page.locator(".saved-cvs li")).toHaveCount(2);

  await page.getByRole("button", { name: /^Open saved CV: Legacy Person,/ }).click();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Legacy Person");
  await page.goto("/");
  await expect(page.getByText("Welcome back. Continue a saved CV:")).toBeVisible();
  await expect(page.locator(".resume-drafts .resume-draft")).toHaveCount(2);
});

test("automatic saving keeps changes without pressing Save", async ({ page }) => {
  await page.goto("/editor/");
  const toggle = page.getByRole("switch", { name: "Save changes automatically on this device" });
  await expect(toggle).not.toBeChecked();
  await toggle.check();
  await page.getByLabel("Full name", { exact: true }).fill("Auto Person");
  await expect.poll(async () => (await store(page))[0]?.cv.personal.name).toBe("Auto Person");
  await expect(page.getByRole("status").filter({ hasText: "Saved on this device" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("switch", { name: "Save changes automatically on this device" })).toBeChecked();
  await page.goto("/");
  await page.getByRole("button", { name: "Welcome back. Continue your saved draft" }).click();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Auto Person");
});

test("leaving with unsaved changes asks first", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Unsaved Person");
  const dialogs: string[] = [];
  page.on("dialog", dialog => { dialogs.push(dialog.type()); void dialog.dismiss(); });
  await page.reload({ timeout: 5_000 }).catch(() => { /* staying on the page cancels the reload */ });
  expect(dialogs).toContain("beforeunload");
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Unsaved Person");
  await page.getByRole("button", { name: "Save draft", exact: true }).first().click();
  dialogs.length = 0;
  await page.reload();
  expect(dialogs).toEqual([]);
});

const job = "We are hiring a customer support specialist. You will answer customer emails and calls, resolve billing questions, keep our CRM records accurate, and work closely with the product team. Experience with written customer communication is essential.";

test("the job match turns the editor CV into an improved CV that opens in the editor", async ({ page }) => {
  await startCV(page, "Alex Morgan");
  await page.getByLabel("Email address", { exact: true }).fill("alex@example.com");
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill("Customer support assistant who handles 40 to 60 customer emails and calls a day and writes weekly summaries for the product team.");
  await addExperience(page, "Customer support assistant", "Retail Co", "Handled 40 to 60 customer emails and calls a day.\nLogged every case in the ticket system.\nWrote weekly summaries for the product team.");
  await page.getByRole("button", { name: "Skills", exact: true }).click();
  await page.getByLabel("Your skills").fill("Written communication, patience, time management");
  await page.getByRole("button", { name: "Review CV", exact: true }).click();
  await page.getByRole("link", { name: "Match this CV to a job advert with AI", exact: true }).click();
  await page.getByRole("button", { name: "Use the CV in my editor", exact: true }).click();
  await page.getByRole("textbox", { name: "Job description", exact: true }).fill(job);

  await page.route("**/api/tailor-cv", async route => {
    const body = route.request().postDataJSON();
    expect(body.job).toBe(job);
    expect(JSON.stringify(body)).not.toContain("alex@example.com");
    expect(JSON.stringify(body)).not.toContain("Alex Morgan");
    expect(body.cv.experience).toEqual([{ id: "e1", title: "Customer support assistant", organization: "Retail Co", dates: "", description: "Handled 40 to 60 customer emails and calls a day.\nLogged every case in the ticket system.\nWrote weekly summaries for the product team." }]);
    await route.fulfill({ json: {
      summary: "Customer support assistant answering 40 to 60 customer emails and calls a day, resolving billing questions and sharing weekly summaries with the product team.",
      skills: "Written communication, time management, patience",
      experience: [{ id: "e1", description: "Answered 40 to 60 customer emails and calls a day.\nKept a record of every case in the ticket system.\nShared weekly summaries with the product team." }],
      projects: [],
      changes: [{ section: "summary", note: "Leads with the daily email and call volume the advert asks about." }],
      missing: [{ requirement: "CRM experience", advice: "Name a CRM only if you used one." }],
      removedSkills: ["Salesforce"],
      kept: [],
    } });
  });
  await page.getByRole("button", { name: "Improve my CV for this job", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Your improved CV" })).toBeVisible();
  await expect(page.getByText("Leads with the daily email and call volume", { exact: false })).toBeVisible();
  await expect(page.getByText("CRM experience", { exact: true })).toBeVisible();
  await expect(page.getByText("Salesforce.", { exact: false })).toBeVisible();
  await expect(page.locator(".tailored-cv").getByAltText("CV preview, page 1")).toBeVisible();
  await page.getByText("Compare before and after (3)").click();
  await expect(page.locator(".tailor-edit")).toHaveCount(3);

  const pdf = page.waitForEvent("download");
  await page.locator(".tailored-cv").getByRole("button", { name: "Download PDF", exact: true }).click();
  expect((await pdf).suggestedFilename()).toBe("Alex Morgan CV.pdf");

  await page.getByRole("button", { name: "Open in editor", exact: true }).click();
  await page.getByRole("button", { name: "Save it, then open", exact: true }).click();
  await expect(page).toHaveURL(/\/editor\/$/);
  await expect(page.getByText("Your improved CV is open as a new CV", { exact: false })).toBeVisible();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Alex Morgan");
  await expect(page.getByLabel("Email address", { exact: true })).toHaveValue("alex@example.com");
  await page.getByRole("button", { name: "Work experience", exact: true }).click();
  await expect(page.getByLabel("Job title", { exact: true })).toHaveValue("Customer support assistant");
  await expect(page.getByRole("textbox", { name: "Description", exact: true })).toHaveValue(/Kept a record of every case/);
  // The original stays saved; the improved CV is new until it is saved.
  expect((await store(page))[0].cv.experience[0].description).toContain("Logged every case");
  await expect(page.getByRole("status").filter({ hasText: "Unsaved changes" })).toBeVisible();
});

test("pasted text without CV headings explains how to get an improved CV", async ({ page }) => {
  await page.goto("/ai-cv-job-match/");
  await page.getByRole("textbox", { name: "Job description", exact: true }).fill(job);
  await page.getByRole("textbox", { name: "Your CV text", exact: true }).fill("Alex Morgan. Customer support assistant at Retail Co, 2022 to 2025. Handled 40 to 60 customer emails and calls a day, resolving billing and delivery questions. Logged every case in the ticket system and wrote weekly summaries for the product team.");
  await page.route("**/api/tailor-cv", () => { throw new Error("The request should not be sent"); });
  await page.getByRole("button", { name: "Improve my CV for this job", exact: true }).click();
  await expect(page.locator(".tool-form").getByRole("alert")).toContainText("Use the CV in my editor");
});
