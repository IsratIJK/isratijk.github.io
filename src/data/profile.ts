const CDN = import.meta.env.VITE_CDN_BASE_URL;

export const profile = {
  name: "Israt Jahan Khan",
  title: "M.Sc. Student & Researcher",
  role: "Prospective PhD Candidate · Computer Science",
  institution: "BRAC University",
  location: "Dhaka, Bangladesh",
  locationNote: "Open to PhD opportunities worldwide",
  email: "isratjahankhanijk@gmail.com",
  photo: `${CDN}/images/profile/israt-jahan-khan.webp`,
  avatar: "/avatar.webp",

  bio: [
    "I am Israt Jahan Khan, a M.Sc. student in Computer Science and Engineering at BRAC University, Dhaka, Bangladesh. My research sits at the intersection of deep learning, computer vision, and real-world AI applications.",
    "I completed my B.Sc. in CSE from United International University with a CGPA of 3.97/4.00, graduating Summa Cum Laude, the highest academic honor. During my undergraduate studies, I was an active research assistant and contributed to multiple peer-reviewed publications.",
    "My work spans Alzheimer's disease detection from 3D MRI images using attention-guided deep learning, IoT-integrated traffic safety systems, novel ensemble classifiers, and secure object detection pipelines. I have published in IEEE Access and Elsevier, with over 30 citations.",
    "I am actively seeking PhD positions in Computer Science, Machine Learning, and related fields at research-intensive universities worldwide. I am particularly interested in research groups working on computer vision, medical AI, and applied deep learning.",
  ],

  stats: [
    { value: "4", label: "Publications" },
    { value: "30+", label: "Citations" },
    { value: "13+", label: "Awards" },
    { value: "2", label: "Conferences" },
  ],

  social: {
    linkedin: { url: "https://www.linkedin.com/in/isratijk/", handle: "isratijk" },
    github: { url: "https://github.com/IsratIJK", handle: "IsratIJK" },
    scholar: { url: "https://scholar.google.com/citations?user=n4mCE9QAAAAJ&hl=en", handle: "Scholar Profile" },
    orcid: { url: "https://orcid.org/0000-0003-2757-3776", handle: "0000-0003-2757-3776" },
    researchgate: { url: "https://www.researchgate.net/profile/Israt-Khan-5", handle: "Israt-Khan-5" },
  },
} as const;
