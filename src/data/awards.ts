export interface Award {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  year: string;
  description: string;
  icon: "trophy" | "medal" | "star" | "grant";
}

export const awards: Award[] = [
  {
    id: "aw1",
    title: "Summa Cum Laude",
    subtitle: "Highest undergraduate honor",
    organization: "United International University",
    year: "2025",
    description:
      "Graduated with exceptional academic performance, achieving a CGPA of 3.97 out of 4.00, the highest honor awarded to undergraduate graduates.",
    icon: "trophy",
  },
  {
    id: "aw2",
    title: "Scholarship for Outstanding Result (11x)",
    subtitle: "Merit-based scholarship",
    organization: "United International University",
    year: "2020 - 2024",
    description:
      "Awarded eleven consecutive times for consistently outstanding academic performance throughout undergraduate studies, covering each semester from 2020 to 2024.",
    icon: "medal",
  },
  {
    id: "aw3",
    title: "BDT 200,000 Research Grant",
    subtitle: "Competitive research funding",
    organization: "IAR - United International University",
    year: "2024",
    description:
      "Competitive funding awarded for innovative research integrating machine learning and AI into green computing to solve real-world problems. Selected among competitive applicants for the IAR grant programme.",
    icon: "grant",
  },
];
