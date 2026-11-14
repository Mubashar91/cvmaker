import { entry, type SampleCVData } from "./sample-cv";

// The worked example on /cv-with-no-experience/ only: a CV with no paid work at all.
// Leah, her school, and the community run are fictional.
export const noExperienceExample: { cv: SampleCVData; why: string[] } = {
  cv: {
    id: "no-experience", template: "clarity",
    person: { name: "Leah Carter", headline: "Sixth-form student looking for weekend work", location: "Norwich", phone: "07700 900428", email: "leah.carter@example.com" },
    summary: "Year 12 student studying Biology, Chemistry, and Psychology, looking for a weekend or holiday job in retail or hospitality. Reliable and organised: I have volunteered at a community 5k run almost every Saturday for over a year and help run my school's science club. Available Saturdays, Sundays, and full time during school holidays.",
    sectionOrder: ["summary", "education", "experience", "projects", "skills", "additional", "languages", "certifications"],
    education: [
      entry("A levels (predicted): Biology A, Chemistry B, Psychology B", "Riverside Sixth Form, Norwich", "2025 – 2027"),
      entry("GCSEs: nine subjects at grades 9 to 5, including English Language 7 and Maths 6", "Thornfield Academy, Norwich", "2020 – 2025"),
    ],
    experience: [
      entry("Volunteer Marshal and Timekeeper", "Riverside Park 5k (weekly community run)", "Sep 2025 – Present", [
        "Marshal the course and record finish times for 150 to 250 runners most Saturdays",
        "Trained three newer volunteers to use the timing app and hand out finish tokens in order",
      ]),
      entry("Science Club Helper", "Riverside Sixth Form", "Oct 2025 – Present", [
        "Set up equipment and supervise Year 7 and 8 students during weekly experiments",
        "Made a sign-up sheet that keeps each session to the 20-place safety limit",
      ]),
    ],
    projects: [
      entry("Duke of Edinburgh's Award, Bronze", "Completed at Thornfield Academy", "2025", [
        "Planned the route and food for a two-day expedition with a team of five",
        "Learned basic first aid for the skills section and taught it back to my group",
      ]),
    ],
    skills: "People: confident talking to adults and younger students, calm when it gets busy\nPractical: handling cash at school fundraising stalls, following safety rules, timekeeping apps\nDigital: Microsoft Word, basic Excel, Google Docs",
    additional: { title: "Interests", text: "Running (5k personal best 23:40), baking for school fundraisers, and the community run on Saturdays." },
  },
  why: [
    "Volunteering sits under Work experience with dates and numbers, so it reads like the commitment it is.",
    "The profile names the kind of job and the exact hours, which is what a shop or café manager looks for first.",
    "Predicted grades are labelled as predicted, and nine GCSEs fit on a single line.",
  ],
};
