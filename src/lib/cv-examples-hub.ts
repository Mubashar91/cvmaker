import { entry, type SampleCVData } from "./sample-cv";

// Content for the /cv-examples/ hub only: three career-stage CVs that are not on any job page.
// Every person, employer, and college is fictional; phone numbers use Ofcom's drama range.

export interface HubExample {
  id: string; heading: string; intro: string; cv: SampleCVData;
  why: string[];
  /** The job page closest to this example. */
  next: { href: string; label: string };
}

export const ukFormat = {
  heading: "UK CV format example: how a British CV is laid out",
  paragraphs: [
    "Every example on this page follows the same British CV order, because UK recruiters expect to find things in the same places. Read from the top: who you are and how to reach you, a short profile, then evidence, with the most recent first.",
    "Two A4 pages is normal once you have a few years of work behind you; one page is fine for a first job. Nobody expects a line saying references are available on request, so use the space for something an employer can check.",
  ],
  order: [
    "Name, phone number, email, and the town you live in. A full postal address isn't needed.",
    "A personal profile of three or four lines that says what you do and what you want next.",
    "Work experience in reverse date order, with achievements rather than duties.",
    "Education and qualifications, most recent first; school grades shrink to one line once you have a degree or a trade.",
    "Skills, grouped so a recruiter can match them to the advert in seconds.",
    "Optional extras that earn their place: certifications, languages, volunteering, or interests.",
  ],
  leaveOut: "Leave out your date of birth, a photo, marital status, nationality, and your National Insurance number. If your right to work could be a question, one plain line such as \"Full right to work in the UK\" answers it.",
};

export const hubExamples: HubExample[] = [
  {
    id: "career-change", heading: "Career change CV example: from retail to administration",
    intro: "Priya spent six years in a busy shop and now wants an office role. Her CV leads with the administrative half of her retail job, so a hiring manager sees rotas, records, and inbox work before they notice the job title.",
    cv: {
      id: "hub-career-change", template: "linear",
      person: { name: "Priya Lakhani", headline: "Administrator, moving from retail supervision", location: "Leicester", phone: "07700 900184", email: "priya.lakhani@example.com" },
      summary: "Retail supervisor with six years' experience running rotas, stock records, and cash reconciliation for a busy high-street store, now moving into office administration. Comfortable with Excel, shared inboxes, and booking systems, and used to keeping records accurate under time pressure. Completed a Level 2 Certificate in Business Administration in 2026 to formalise the office skills I already use every day.",
      experience: [
        entry("Store Supervisor", "Brightwell Home & Garden, Leicester", "Mar 2021 – Present", [
          "Build the weekly rota for a team of 14 in Excel, covering 70 opening hours with no unplanned gaps in the last 12 months",
          "Reconcile daily takings and refunds across three tills and resolve discrepancies before the end-of-day report",
          "Manage supplier emails and delivery bookings in the store's shared inbox, logging every order in the stock system",
          "Trained five new starters on till, stock, and safety procedures using a checklist I wrote",
        ]),
        entry("Sales Assistant", "Brightwell Home & Garden, Leicester", "Sep 2019 – Feb 2021", [
          "Answered phone and counter queries and arranged home deliveries through the booking system",
          "Ran the monthly stock count for the garden department",
        ]),
      ],
      education: [
        entry("Level 2 Certificate in Business Administration", "Leicester Adult Learning (evening course)", "2025 – 2026", ["Units in managing diaries, handling information, and customer service"]),
        entry("A levels: Business (B), English Literature (C)", "Fernbrook Sixth Form, Leicester", "2017 – 2019"),
      ],
      skills: "Office: Microsoft Excel (rotas, VLOOKUP, pivot tables), Outlook shared inboxes, Word\nRecords: stock systems, cash reconciliation, filing and data accuracy\nPeople: training new staff, handling complaints, supplier contact",
      additional: { title: "Volunteering", text: "Treasurer for a local running club since 2023, keeping accounts for 120 members." },
    },
    why: [
      "The headline names the job she wants, not the one she has, and the profile says why the move makes sense.",
      "Each bullet is an office task done in a shop: rotas, reconciliation, an inbox, a training checklist.",
      "A short evening course shows she has invested in the change, and it sits first under Education.",
    ],
    next: { href: "/cv-examples/administrator/", label: "See the full administrator CV example" },
  },
  {
    id: "career-break", heading: "Career break CV example: an accounts assistant returning to work",
    intro: "Daniel left a finance role to look after his children for just over two years. Instead of hiding the gap, his CV names it in one line and shows how he kept his skills in use, so the dates raise no questions.",
    cv: {
      id: "hub-career-break", template: "professional",
      person: { name: "Daniel Whitcombe", headline: "Accounts Assistant returning after a career break", location: "Bristol", phone: "07700 900352", email: "daniel.whitcombe@example.com" },
      summary: "Accounts assistant with four years' experience in purchase ledger and month-end support, returning to work after a career break as a full-time parent. Kept my skills current by completing AAT Level 3 and keeping the books for a community food bank. Looking for an accounts assistant or purchase ledger role in the Bristol area, full time or four days a week.",
      experience: [
        entry("Volunteer Bookkeeper (4 hours a week)", "Southmead Food Share, Bristol", "Jan 2025 – Present", [
          "Record donations and expenses in Xero and reconcile the bank account every month",
          "Prepare a one-page monthly summary for the trustees' meeting",
        ]),
        entry("Career break", "Full-time parent", "Sep 2022 – Dec 2024", ["Studied for AAT Level 3 alongside caring for two young children"]),
        entry("Accounts Assistant", "Harbourside Freight Services, Bristol", "Jun 2018 – Aug 2022", [
          "Processed 300 to 400 supplier invoices a month in Sage 200, matching each to purchase orders and delivery notes",
          "Ran the weekly supplier payment run and answered supplier statement queries",
          "Prepared accruals and prepayment schedules at month-end for the finance manager to review",
          "Cut the invoice approval backlog from three weeks to five days with a shared approval tracker",
        ]),
      ],
      education: [
        entry("AAT Level 3 Diploma in Accounting", "Studied online", "2023 – 2026"),
        entry("BA (Hons) Business Studies, 2:2", "University of Westhaven", "2014 – 2017"),
      ],
      skills: "Accounting: purchase ledger, bank reconciliation, accruals and prepayments, VAT coding\nSoftware: Sage 200, Xero, Excel (pivot tables, SUMIFS)\nWorking style: accurate under month-end deadlines, clear and polite with suppliers",
    },
    why: [
      "The break has its own dated entry, so the timeline is complete and no one has to guess.",
      "Recent volunteering comes first because it proves the skills are current, even though it's part-time.",
      "The pre-break job keeps its full bullets: it is still the strongest evidence of what he can do.",
    ],
    next: { href: "/cv-examples/accountant/", label: "See the full accountant CV example" },
  },
  {
    id: "experienced", heading: "Experienced CV example: an operations manager with 12 years' experience",
    intro: "Fiona's challenge is the opposite of a first CV: too much to say. She gives her current role room, keeps earlier jobs short, and opens with the size of what she runs so the scale is clear in one sentence.",
    cv: {
      id: "hub-experienced", template: "regent",
      person: { name: "Fiona MacLeod", headline: "Operations Manager, warehousing and distribution", location: "Glasgow", phone: "07700 900617", email: "fiona.macleod@example.com" },
      summary: "Operations manager with 12 years in warehousing and distribution, now responsible for a 180,000 sq ft site with 95 staff across three shifts. Led a site move with no lost trading days and cut picking errors by more than a third through slotting and coaching changes. Looking for a regional operations role where process improvement and developing managers matter.",
      experience: [
        entry("Operations Manager", "Northline Distribution, Glasgow", "Apr 2020 – Present", [
          "Run daily operations for a 180,000 sq ft site shipping 22,000 order lines a day for grocery and homeware clients",
          "Led the 2023 move to a new site, planned over six months with clients and IT, with no lost trading days",
          "Reduced picking errors from 0.8% to 0.5% of lines by re-slotting fast movers and introducing peer coaching",
          "Manage a £3.4m annual labour budget and report weekly performance to the regional director",
        ]),
        entry("Shift Manager", "Northline Distribution, Glasgow", "Jan 2016 – Mar 2020", [
          "Managed a night shift of 40 colleagues and four team leaders",
          "Introduced a cross-training matrix that cut agency hours by 15% in a year",
        ]),
        entry("Team Leader", "Clydeway Retail Logistics, Paisley", "Jun 2013 – Dec 2015", ["Led a goods-in team of 12 and trained colleagues on a new warehouse management system"]),
      ],
      education: [
        entry("CMI Level 5 Diploma in Management and Leadership", "Chartered Management Institute (part-time)", "2019 – 2020"),
        entry("HND Business Management", "Westburn College", "2010 – 2012"),
      ],
      skills: "Operations: warehouse management systems (SAP EWM), labour planning, KPI reporting, site moves\nPeople: managing managers, recruitment, absence and performance management\nSafety and compliance: IOSH Managing Safely, BRCGS storage and distribution audits",
    },
    why: [
      "The first line of the profile gives the size of the job: floor space, staff, shifts.",
      "Achievements carry numbers a recruiter can ask about: no lost days, 0.8% to 0.5%, a £3.4m budget.",
      "The oldest role gets a single line, which keeps the CV to two pages without losing the career story.",
    ],
    next: { href: "/cv-examples/project-manager/", label: "See the project manager CV example" },
  },
];
