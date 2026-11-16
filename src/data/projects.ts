const CDN = import.meta.env.VITE_CDN_BASE_URL;

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  longDescription?: string;
  tech: string[];
  github?: string;
  demo?: string;
  docs?: string;
  coverImage: string;
  screenshots?: string[];
  featured?: boolean;
  status: "active" | "archived" | "in-progress";
}

export const projects: Project[] = [
  {
    id: "proj5",
    slug: "upgraded-soupx",
    title: "Upgraded-SoupX",
    category: "Research",
    tags: ["Bioinformatics", "Open Source"],
    description:
      "Full Python port and extension of the original SoupX R package (Young & Behjati, 2020). Drops the R dependency entirely, adds probabilistic per-cell decontamination (DecontX), doublet-aware estimation, gene-heterogeneity correction, a complete downstream analysis pipeline, and eight quantitative benchmark metrics, all on top of the same core SoupChannel abstraction.",
    tech: ["Python", "scRNA-seq", "DecontX", "NumPy", "SciPy", "Scanpy"],
    github: "https://github.com/IsratIJK/Upgraded-soupX",
    docs: "https://isratijk.github.io/Upgraded-soupX/",
    coverImage: `${CDN}/images/projects/upgraded-soupx-pipeline-diagram.png`,
    status: "active",
  },
  {
    id: "proj6",
    slug: "vae-music",
    title: "VAE for Audio Representation & Clustering",
    category: "Research",
    tags: ["Deep Learning", "Audio AI"],
    description:
      "Comprehensive study on Variational Autoencoders (VAEs) for unsupervised representation learning and clustering of audio data. Investigates how different VAE architectures and latent space enhancement techniques affect clustering performance across datasets of varying scale and complexity.",
    longDescription:
      "Systematically explores multiple VAE variants and evaluates their ability to learn meaningful latent representations, which are then used for clustering and analysis. Covers architecture ablations, latent space visualisation, and quantitative clustering metrics across diverse audio corpora.",
    tech: ["Python", "PyTorch", "VAE", "Latent Space", "Clustering", "Audio Processing"],
    github: "https://github.com/IsratIJK/VAE-music",
    coverImage: `${CDN}/images/projects/vae-music-pipeline.png`,
    status: "active",
  },
  {
    id: "proj1",
    slug: "alz-predict",
    title: "Alz-Predict-ROIvsNonROI",
    category: "Research",
    tags: ["Open Source", "Medical AI"],
    description:
      "Deep learning pipeline for Alzheimer's Disease prediction from 3D MRI images using ROI-guided attention. Implements 3D ResNet + CBAM on ADNI and OASIS datasets.",
    longDescription:
      "A comprehensive deep learning framework comparing ROI-guided vs full-brain approaches to Alzheimer's detection. The project demonstrates how focusing on targeted regions of interest (hippocampus, entorhinal cortex) improves accuracy while reducing computational cost by ~40%. Benchmarked on the ADNI dataset achieving 92% accuracy with ROI guidance vs 88% without.",
    tech: ["Python", "PyTorch", "TensorFlow", "CUDA", "3D ResNet", "CBAM"],
    github: "https://github.com/FahimFBA/Alz-Predict-ROIvsNonROI",
    coverImage: `${CDN}/images/projects/alzheimers-disease-prediction.jpg`,
    featured: true,
    status: "archived",
  },
  {
    id: "proj2",
    slug: "smart-aid-rover",
    title: "Smart Aid & Relief Rover",
    category: "Robotics",
    tags: ["Electronics", "Embedded"],
    description:
      "Autonomous rover for disaster relief scenarios, equipped with AI for navigation and victim detection. Built with embedded C++ on Arduino platform.",
    longDescription:
      "An autonomous ground rover designed for first-responder support in disaster zones. Integrates ultrasonic sensors for obstacle avoidance, a camera module for victim detection, and wireless communication for remote control fallback. Capable of operating in GPS-denied environments using sensor fusion.",
    tech: ["C++", "Arduino", "Embedded Systems", "Sensors", "Wireless Comm"],
    github: "https://github.com/IsratIJK/smart-aid-and-relief-rover",
    coverImage: `${CDN}/images/projects/smart-aid-and-relief-rover.jpg`,
    featured: true,
    status: "archived",
  },
  {
    id: "proj3",
    slug: "studentbook",
    title: "StudentBook",
    category: "Web Application",
    tags: ["Social Platform", "EdTech"],
    description:
      "A revamped social media platform designed specifically for educational institutions, connecting students, faculty, and resources in one ecosystem.",
    longDescription:
      "StudentBook reimagines campus social networking with features tailored for academic life: course-based communities, resource sharing, faculty office hours scheduling, and academic event discovery. Built with a React frontend backed by Node.js REST API and MySQL database.",
    tech: ["React", "Node.js", "MySQL", "REST API"],
    github: "https://github.com/FahimFBA/StudentBook",
    demo: "https://fahimfba.github.io/StudentBook",
    coverImage: `${CDN}/images/projects/studentbook-login-screen.png`,
    status: "archived",
  },
];
