export interface ResearchArea {
  id: string;
  icon: "eye" | "network" | "cpu" | "brain";
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  relatedPublications?: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: "cv",
    icon: "eye",
    title: "Computer Vision",
    shortDescription: "Vision-based systems for image understanding, object detection, and visual reasoning.",
    description:
      "My computer vision research focuses on building systems that can interpret and understand visual data at a deep level. I work on medical imaging, particularly 3D MRI analysis for neurological disease detection, as well as real-world applications like autonomous number plate recognition and surveillance. I apply modern architectures including YOLO-family detectors, 3D CNNs, and attention-based models to these problems.",
    tags: ["Object Detection", "Medical Imaging", "YOLOv8", "3D CNN", "ResNet"],
    relatedPublications: ["p1", "p4"],
  },
  {
    id: "ml",
    icon: "network",
    title: "Machine Learning",
    shortDescription: "Supervised, unsupervised, and ensemble approaches for classification and regression.",
    description:
      "I design and analyze machine learning pipelines with a focus on real-world effectiveness. This includes feature engineering, model selection, and the development of novel ensemble methods. My KDRF Classifier integrates KNN and Decision Trees into the Random Forest meta-learning framework to outperform baselines on multi-class tasks. I prioritize interpretability and efficiency alongside raw accuracy.",
    tags: ["Ensemble Methods", "KNN", "Random Forest", "Transfer Learning", "Feature Engineering"],
    relatedPublications: ["p3"],
  },
  {
    id: "dl",
    icon: "cpu",
    title: "Deep Learning",
    shortDescription: "Neural architectures (CNNs, attention mechanisms, 3D ResNets) for complex AI tasks.",
    description:
      "At the core of my research is deep learning architecture design and optimization. I work with Convolutional Block Attention Modules (CBAM), 3D ResNets for volumetric data, and IoT-integrated deep learning pipelines. My work on SafeTrax demonstrates how edge-deployed deep learning can deliver real-time collision prediction on embedded hardware like Raspberry Pi via AWS Greengrass.",
    tags: ["CNN", "CBAM", "Attention Mechanisms", "PyTorch", "Edge AI"],
    relatedPublications: ["p1", "p2"],
  },
  {
    id: "interdisciplinary",
    icon: "brain",
    title: "Interdisciplinary AI",
    shortDescription: "AI applied to healthcare, traffic safety, data security, and other real-world domains.",
    description:
      "I believe the most impactful AI research crosses disciplinary boundaries. My interdisciplinary projects apply computational intelligence to healthcare (Alzheimer's early detection), transportation safety (IoT + deep learning collision prediction), and data security (chaotic map encryption for privacy-preserving detection). I collaborate across departments to ensure solutions are technically rigorous and practically deployable.",
    tags: ["Healthcare AI", "IoT", "Data Security", "Applied AI", "Cross-domain"],
    relatedPublications: ["p1", "p2", "p4"],
  },
];
