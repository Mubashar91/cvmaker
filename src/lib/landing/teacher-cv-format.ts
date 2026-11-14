import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Fatima, Cedar Hills School, Riverview Public School, Potohar University of Education, and Indus
// Plateau University are fictional. Exam boards are real names used only to show the format.
export const teacherCvFormat: LandingPage = {
  slug: "teacher-cv-format",
  kicker: "CV format · Teaching · Pakistan",
  h1: "Teacher CV format, with a full example",
  intro: "A teacher CV for schools in Pakistan has to show three things quickly: your teaching qualifications, the classes and subjects you've taught, and how your students performed. This page sets out the teacher CV format principals expect, with a complete example and a free Word download.",
  points: ["Section-by-section format", "Full science teacher example", "Word download included", "Free, no sign-up"],
  sections: [
    {
      id: "what-principals-look-for", heading: "What school principals look for first",
      paragraphs: [
        "A principal or coordinator reading a stack of teacher CVs is matching each one against a gap in the timetable: Grade 9 Chemistry, O Level English, Montessori, or a class teacher for Grade 3. The most useful thing your CV can do is make that match obvious in the first few lines.",
        "So the headline and profile should name your subject, the grade levels you teach, and the curriculum you know, whether that's a provincial board, the Federal Board, or Cambridge O and A Levels. After that, the reader looks for your teaching qualification and for evidence that your students did well.",
      ],
    },
    {
      id: "format", heading: "The teacher CV format, section by section",
      paragraphs: ["Keep the CV to two A4 pages, newest experience first. These are the sections schools expect, in the order they usually read them."],
      table: {
        caption: "Teacher CV format for schools in Pakistan",
        head: ["Section", "What to include"],
        rows: [
          ["Profile", "Subject, grade levels, curriculum, years of experience, and one result"],
          ["Teaching experience", "School, city, dates, classes and subjects, and roles such as class teacher or coordinator"],
          ["Qualifications", "B.Ed, M.Ed, or ADE, then your subject degree, with institution and year"],
          ["Professional development", "Workshops and courses, such as subject training or classroom technology"],
          ["Co-curricular activities", "Clubs, science fairs, debates, sports, or events you led"],
          ["Skills and languages", "Classroom tools, IT skills, and English, Urdu, and regional languages"],
        ],
      },
    },
    {
      id: "classes-and-results", heading: "Describing classes taught and student results",
      paragraphs: [
        "Be exact about what you taught. \"Taught science\" could mean anything; \"Taught General Science to Grades 6 to 8 and Chemistry to Grades 9 and 10, Federal Board, about 160 students a year\" tells a principal precisely where you fit. If you were a class teacher, say which grade.",
        "Results are your strongest evidence. Board pass rates, the number of students with A grades in O Levels, or a rise in a class average all count, as long as they're accurate and you can explain your part in them. If your school doesn't publish results, use internal measures, such as average test scores before and after a term.",
      ],
      example: { label: "Weak and strong lines (fictional)", text: "Weak: Responsible for teaching chemistry to senior classes.\n\nStrong: Taught Chemistry to two Grade 10 sections (68 students); 94% passed the Federal Board exam, up from 81% the year before." },
    },
    {
      id: "qualifications", heading: "Listing B.Ed, M.Ed, and subject degrees",
      paragraphs: [
        "Put your teaching qualification first if the post requires one, then your subject degree, because most schools look for both. Write the full name and year, such as Bachelor of Education (B.Ed Hons), M.Ed, or Associate Degree in Education, with the university. If you're studying for one now, give the expected completion date.",
        "Matric and Intermediate results can take one line each at the end of the education section. For a first teaching job they still matter, especially when you'll be teaching subjects you studied at Intermediate level.",
      ],
    },
  ],
  example: {
    heading: "Worked example: a science teacher CV in the Pakistani format",
    paragraphs: ["Fatima has six years of experience in private schools in Rawalpindi and Islamabad and is applying for a senior science teacher post. Her CV puts subject, grades, and board in the first line and backs the profile with results."],
    cv: {
      id: "teacher-pk", template: "heritage",
      person: { name: "Fatima Noor", headline: "Science and Chemistry Teacher, Grades 6–10", location: "Islamabad, Pakistan", phone: "+92 300 0000000", email: "fatima.noor@example.com" },
      summary: "Science teacher with six years' experience teaching General Science to Grades 6 to 8 and Chemistry to Grades 9 and 10 under the Federal Board. Raised my Grade 10 Chemistry pass rate from 81% to 94% in two years through weekly practical sessions and past-paper practice. Hold a B.Ed (Hons) and an MSc in Chemistry, and looking for a senior science teacher or coordinator role.",
      experience: [
        entry("Science Teacher, Grades 6–10", "Cedar Hills School, Islamabad", "Aug 2022 – Present", [
          "Teach Chemistry to two Grade 10 sections and General Science to Grade 8, about 160 students a year",
          "94% of my Grade 10 students passed the Federal Board Chemistry exam in 2025, up from 81% in 2023",
          "Class teacher for Grade 8, leading parent-teacher meetings and termly progress reports",
          "Organised the school science fair for three years, with 40 to 60 student projects each time",
        ]),
        entry("Junior Science Teacher", "Riverview Public School, Rawalpindi", "Aug 2019 – Jun 2022", ["Taught General Science to Grades 6 and 7 and ran the after-school science club"]),
      ],
      education: [
        entry("Bachelor of Education (B.Ed Hons)", "Potohar University of Education, Islamabad", "2020 – 2022 (part-time)"),
        entry("MSc Chemistry", "Indus Plateau University, Rawalpindi", "2016 – 2018"),
        entry("FSc Pre-Medical, 921/1100", "FBISE, Islamabad", "2014"),
      ],
      certifications: [
        entry("Teaching Practical Science, online professional development course", "Completed", "2024"),
        entry("Google Classroom for teachers, school workshop", "Cedar Hills School", "2023"),
      ],
      skills: "Teaching: practical science, lesson planning, past-paper practice, mixed-ability classes\nClassroom tools: Google Classroom, PowerPoint, laboratory safety procedures\nLanguages: English, Urdu, Punjabi",
      additional: { title: "Co-curricular activities", text: "School science fair organiser, 2022–2025\nInter-school science quiz coach; team reached the regional final in 2024" },
    },
    notes: [
      { heading: "The match is clear in line one", text: "Subject, grades, and board are in the headline and the first sentence, so a principal with a Grade 9 Chemistry vacancy sees the fit straight away." },
      { heading: "Results with a before and after", text: "81% to 94% shows improvement rather than one good year, and the profile says how it happened." },
      { heading: "Co-curricular work gets its own section", text: "Science fairs and quiz coaching matter to schools in Pakistan, so they have a short section instead of being buried in a bullet." },
    ],
  },
  after: [
    {
      id: "teaching-abroad", heading: "Teaching abroad? How UK teacher CVs differ",
      paragraphs: ["Schools in the UK, and many international schools in the Gulf, expect a different format: no photo or personal details, safeguarding training near the top, and a focus on curricula such as the National Curriculum or IGCSE. For a UK-style example, see the [teacher CV example](/cv-examples/teacher/), and for the opening paragraph of a UK application, the guide to a [teacher CV personal statement](/tips/teacher-cv-personal-statement/)."],
    },
    {
      id: "word-download", heading: "Download the teacher CV format in Word",
      paragraphs: [
        "The download is the example above as an editable Word file on A4. Replace the details, keep the order, and add your photo if the school's advert asks for one, using Insert, then Pictures. Many private schools accept CVs by email, so save a PDF copy too and send that unless they ask for Word.",
        "Prefer to design it online? Open the example in the free CV maker and try a template with a photo space. The [Pakistani CV format](/cv-format-pakistan/) guide covers personal information and school results for other kinds of jobs.",
      ],
    },
  ],
  download: { label: "Download the teacher CV (.docx)", note: "A4, editable in Microsoft Word, Word for the web, and Google Docs. Add a photo only if the school asks for one." },
  faqs: [
    { question: "What is the best CV format for a teacher in Pakistan?", answer: "Reverse-chronological: a short profile, teaching experience newest first with classes and results, then qualifications, professional development, and co-curricular activities, on two pages at most." },
    { question: "Should a teacher CV include a photo?", answer: "Many private schools in Pakistan expect one, so add a recent, professional photo if the advert or school asks. Leave it off for international schools and jobs abroad that don't request one." },
    { question: "Do I need a B.Ed to apply for teaching jobs?", answer: "Many private schools prefer a B.Ed or ADE, and government posts set their own requirements in each advert. If you're studying for one, list it with the expected completion date." },
    { question: "How do I write a teacher CV with no experience?", answer: "Lead with your qualifications and teaching practice, then tutoring, coaching, or volunteering with children. Say clearly which subjects and grades you can teach." },
    { question: "Should I list every class I've taught?", answer: "Group them instead: subjects and grade ranges at each school, plus the board or curriculum. A principal needs to see your range, not your whole timetable." },
  ],
  related: [
    { href: "/cv-examples/teacher/", label: "Teacher CV example (UK)" },
    { href: "/tips/teacher-cv-personal-statement/", label: "Teacher CV personal statement" },
    { href: "/cv-format-pakistan/", label: "Pakistani CV format" },
    { href: "/uae-cv-format/", label: "UAE CV format" },
  ],
};
