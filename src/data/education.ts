const CDN = import.meta.env.VITE_CDN_BASE_URL;

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  logo?: string;
  location: string;
  period: string;
  description: string;
  current: boolean;
  gpa?: string;
  honor?: string;
  thesis?: string;
}

export const education: Education[] = [
  {
    id: "edu1",
    degree: "M.Sc.",
    field: "Computer Science and Engineering",
    institution: "BRAC University",
    institutionUrl: "https://www.bracu.ac.bd/",
    logo: `${CDN}/images/logos/bracu-logo.png`,
    location: "Dhaka, Bangladesh",
    period: "2025 - Present",
    description:
      "Majoring in Data Science. Continuing research in machine learning, computer vision, and applied AI. Pursuing graduate-level coursework in advanced algorithms, deep learning, and research methods.",
    current: true,
    gpa: "4.0 / 4.0 (21 of 36 credits completed)",
  },
  {
    id: "edu2",
    degree: "B.Sc.",
    field: "Computer Science and Engineering",
    institution: "United International University",
    institutionUrl: "https://www.uiu.ac.bd",
    logo: `${CDN}/images/logos/united-international-university-logo.png`,
    location: "Dhaka, Bangladesh",
    period: "2020 - 2024",
    description:
      "Graduated Summa Cum Laude with a CGPA of 3.97 out of 4.00. Majored in Data Science. Active research assistant throughout undergraduate studies; led and contributed to multiple published works in ML and computer vision.",
    current: false,
    gpa: "3.97 / 4.00",
    honor: "Summa Cum Laude",
  },
];

export const skills = {
  languages: ["Python", "C++", "JavaScript", "TypeScript", "Java", "R", "MATLAB"],
  mlFrameworks: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face"],
  tools: ["Git", "Docker", "Jupyter", "LaTeX", "Linux", "AWS", "Vite"],
  databases: ["MySQL", "PostgreSQL", "Supabase", "MongoDB"],
  domains: ["Computer Vision", "NLP", "Medical Imaging", "IoT Systems", "Embedded AI"],
};
