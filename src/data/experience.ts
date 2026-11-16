const CDN = import.meta.env.VITE_CDN_BASE_URL;

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logo: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  type: "academic" | "research" | "teaching";
}

export const experiences: Experience[] = [
  {
    id: "exp6",
    role: "Research Intern",
    company: "ELITE Research Lab LLC",
    companyUrl: "https://elitelab.ai",
    logo: `${CDN}/images/logos/elite-research-lab-llc-logo.png`,
    location: "Queens, NY, USA",
    period: "Nov 2026 - Present",
    description:
      "Promoted from Student Researcher to Research Intern. Continuing research projects involving data analysis, model development, and experimentation with the ELITE Research Lab team.",
    highlights: ["Promoted from Student Researcher", "Model development", "Experimentation"],
    type: "research",
  },
  {
    id: "exp5",
    role: "Student Researcher",
    company: "ELITE Research Lab LLC",
    companyUrl: "https://elitelab.ai",
    logo: `${CDN}/images/logos/elite-research-lab-llc-logo.png`,
    location: "Queens, NY, USA",
    period: "Aug 2026 - Nov 2026",
    description:
      "Contributing to research projects involving data analysis, model development, and experimentation. Collaborating with the research team to explore innovative approaches and solve real-world problems using data-driven methods.",
    highlights: ["Data analysis", "Model development", "Experimentation"],
    type: "research",
  },
  {
    id: "exp1",
    role: "Lecturer",
    company: "United International University",
    companyUrl: "https://www.uiu.ac.bd",
    logo: `${CDN}/images/logos/united-international-university-logo.png`,
    location: "Dhaka, Bangladesh",
    period: "Spring & Summer 2025",
    description:
      "Teaching undergraduate courses on Data Structures and Algorithms, Digital Logic Design, System Analysis and Design, and Database Management System. Developed course materials and assessments.",
    highlights: ["Course material development", "Project guidance", "Served as project judge"],
    type: "teaching",
  },
  {
    id: "exp2",
    role: "Research Assistant",
    company: "United International University",
    companyUrl: "https://www.uiu.ac.bd",
    logo: `${CDN}/images/logos/united-international-university-logo.png`,
    location: "Dhaka, Bangladesh",
    period: "Nov 2024 - Feb 2025",
    description:
      "Worked on a Civil Engineering-based interdisciplinary research project. Reduced training costs while maintaining high accuracy. Led core contributions to the codebase and research paper.",
    highlights: ["Reduced training costs", "Main contributor to codebase", "Co-authored paper"],
    type: "research",
  },
  {
    id: "exp3",
    role: "Research Intern",
    company: "CCDS - Center for Computational & Data Sciences, IUB",
    companyUrl: "https://ccds.ai",
    logo: `${CDN}/images/logos/ccds-logo.png`,
    location: "Dhaka, Bangladesh",
    period: "Nov 2024 - Jan 2025",
    description:
      "Worked on machine learning, data analysis, and Natural Language Processing (NLP). Developed ML models and collaborated with a team of researchers on applied data science problems.",
    highlights: ["ML model development", "NLP research", "Team collaboration"],
    type: "research",
  },
  {
    id: "exp4",
    role: "Undergraduate Teaching Assistant",
    company: "United International University",
    companyUrl: "https://www.uiu.ac.bd",
    logo: `${CDN}/images/logos/united-international-university-logo.png`,
    location: "Dhaka, Bangladesh",
    period: "Oct 2023 - Jan 2024",
    description:
      "Assisted in teaching Data Structures and Algorithms. Conducted lab sessions, graded assignments, and provided academic support to students.",
    highlights: ["Lab instruction", "Assignment grading", "Student mentoring"],
    type: "teaching",
  },
];
