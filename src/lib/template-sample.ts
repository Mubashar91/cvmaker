import { emptyCV, type CV } from "./model";

// Fictional demonstration content only. Never replace this with an uploaded CV.
// These details generate public thumbnails; the editor always starts blank.
export function templateSample(): CV {
  const cv = emptyCV();
  cv.personal = {
    name: "Alex Morgan", headline: "Frontend Developer",
    email: "alex@example.com", phone: "+44 7700 900123",
    location: "London, United Kingdom", website: "alexmorgan.example",
  };
  cv.summary = "Frontend developer creating thoughtful, accessible web experiences. Combines a strong foundation in modern JavaScript with an eye for typography, clear interactions, and useful details. Comfortable working with designers and engineers to take an idea from the first conversation to a reliable product.";
  cv.experience = [
    { id: "sample-work-1", title: "Frontend Developer", organization: "Studio North", dates: "2023 – Present", description: "Build responsive product interfaces with React and TypeScript.\nTranslate design concepts into accessible, reusable components.\nCollaborate with product teams to refine features and improve usability." },
    { id: "sample-work-2", title: "Junior Web Developer", organization: "Forma Digital", dates: "2021 – 2023", description: "Developed websites and internal tools for small product teams.\nImproved keyboard navigation and cross-device compatibility." },
  ];
  cv.education = [{ id: "sample-education", title: "BSc Computer Science", organization: "Example University", dates: "2018 – 2021", description: "" }];
  cv.skills = "Frontend: React, TypeScript, JavaScript, HTML, CSS\nDesign: Accessibility, responsive interfaces, Figma\nTools: Git, testing, REST APIs";
  cv.projects = [
    { id: "sample-project-1", title: "Community Directory", organization: "Independent project", dates: "2024", description: "Built an accessible directory connecting residents with local volunteer groups.\nCreated a responsive search experience and clear organization profiles." },
  ];
  cv.certifications = [{ id: "sample-certificate", title: "Web Accessibility Foundations", organization: "Example Training", dates: "2024", description: "" }];
  return cv;
}
