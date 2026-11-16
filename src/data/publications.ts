const CDN = import.meta.env.VITE_CDN_BASE_URL;

export interface Publication {
  id: string;
  slug: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  type: "Journal" | "Conference";
  paperLink?: string;
  publisherLink: string;
  abstract: string;
  keywords: string[];
  doi?: string;
  citations?: number;
  quartile?: "Q1" | "Q2" | "Q3" | "Q4";
  coverImage: string;
  pdfUrl?: string;
  featured?: boolean;
}

export const RESEARCHER_NAME = "Israt Jahan Khan";

export const publications: Publication[] = [
  {
    id: "p1",
    slug: "alzheimer-roi-detection",
    year: "2025",
    title:
      "Enhanced ROI guided deep learning model for Alzheimer's detection using 3D MRI images",
    authors:
      "Israt Jahan Khan, Md Fahim Bin Amin, Md Delwar Shahadat Deepu, Hazera Khatun Hira, Asif Mahmud, Anas Mashad Chowdhury, Salekul Islam, Md Saddam Hossain Mukta, Swakkhar Shatabda, Alzheimer's Disease Neuroimaging Initiative",
    venue: "Informatics in Medicine Unlocked",
    venueShort: "IMU · Elsevier",
    type: "Journal",
    paperLink:
      "https://www.researchgate.net/publication/392007551_Enhanced_ROI_guided_deep_learning_model_for_Alzheimer's_detection_using_3D_MRI_images",
    publisherLink:
      "https://www.sciencedirect.com/science/article/pii/S2352914825000383",
    abstract:
      "Alzheimer's disease is an incurable condition that predominantly affects the human brain, leading to the shrinkage of various brain regions and the disruption of neuronal connections. Current state-of-the-art methods for detecting Alzheimer's disease using 3D MRI images are resource-intensive and time-consuming. In this paper, we propose a Regions of Interest (ROI)-guided detection paradigm to address these challenges. We employ a 3D ResNet integrated with a Convolutional Block Attention Module (CBAM), demonstrating that emphasising ROIs in brain imaging can substantially reduce both computational expenditure and training time. Our model exhibits robust performance in discriminating Alzheimer's disease from mild cognitive impairment, achieving an accuracy of 88% across the entire brain and 92% within targeted ROIs on the ADNI dataset.",
    keywords: [
      "Alzheimer's disease",
      "Regions of Interest",
      "3D MRI",
      "Transfer learning",
      "ResNet 3D",
      "CBAM",
    ],
    doi: "10.1016/j.imu.2025.101650",
    citations: 12,
    quartile: "Q2",
    coverImage: `${CDN}/images/publications/enhanced-roi-guided-pipeline.jpg`,
    pdfUrl: `${CDN}/pdfs/publications/elsevier-imu-2025-101650.pdf`,
    featured: true,
  },
  {
    id: "p2",
    slug: "safetrax-collision-prediction",
    year: "2024",
    title:
      "SafeTrax: Smart Collision Prediction and Alert System Using IoT for Sustainable Traffic Safety",
    authors:
      "Md Fahim Bin Amin, Israt Jahan Khan, Faria Akter, Adib Ahmed, Md Motaharul Islam",
    venue: "IEEE Access",
    venueShort: "IEEE Access",
    type: "Journal",
    publisherLink: "https://ieeexplore.ieee.org/abstract/document/10819396/",
    abstract:
      "SafeTrax uses deep learning to predict traffic accidents and car crashes. It has been implemented with the Internet of Things (IoT) to gather real-time data from sensors, and AWS Greengrass to process that data quickly and give drivers timely warnings. Unlike old safety systems, SafeTrax can predict if an accident might happen. It warns drivers beforehand to make roads safer for cars, people, and other animals. One important part of SafeTrax is the integration of AWS IoT Greengrass, which helps the system work faster by using cloud services on devices like the Raspberry Pi.",
    keywords: [
      "Traffic Safety",
      "IoT",
      "Collision Prediction",
      "Deep Learning",
      "AWS Greengrass",
    ],
    doi: "10.1109/ACCESS.2024.3524676",
    citations: 6,
    quartile: "Q1",
    coverImage: `${CDN}/images/publications/safetrax-integrated-car.jpg`,
    pdfUrl: `${CDN}/pdfs/publications/ieee-access-2024-3524676.pdf`,
    featured: true,
  },
  {
    id: "p3",
    slug: "kdrf-classifier",
    year: "2024",
    title:
      "Synergetic KDRF Classifier: A Random Forest-Based Hybrid Approach for Multi-Class Classification Task",
    authors:
      "Israt Jahan Khan, Md Fahim Bin Amin, Kamrul Islam Shahin, Huu-Hoa Nguyen, Dewan Md Farid",
    venue:
      "2024 27th International Conference on Computer and Information Technology (ICCIT)",
    venueShort: "IEEE ICCIT 2024",
    type: "Conference",
    publisherLink:
      "https://ieeexplore.ieee.org/abstract/document/11021799",
    abstract:
      "Multi-class classification presents a significant challenge in supervised machine learning. We introduce a novel methodology that integrates the K-Nearest Neighbor (KNN) classifier and Decision Trees into the Random Forest framework to enhance performance. The proposed method trains KNN and Decision Tree classifiers on extracted features; output probabilities form meta-features fed into a Random Forest as the meta-learner. Through extensive experimentation on 5 datasets, the proposed approach demonstrates superior performance in accuracy and efficiency compared to traditional methods.",
    keywords: [
      "Random Forest",
      "KNN",
      "Decision Tree",
      "Multi-class Classification",
      "Ensemble Learning",
    ],
    doi: "10.1109/ICCIT64611.2024.11021799",
    coverImage: `${CDN}/images/publications/synergetic-kdrf.png`,
    pdfUrl: `${CDN}/pdfs/publications/ieee-iccit-2024-11021799.pdf`,
  },
  {
    id: "p4",
    slug: "vehicle-plate-detection",
    year: "2024",
    title:
      "Vehicle Number Plate Detection and Encryption in Digital Images Using YOLOv8 and Chaotic-Based Encryption Scheme",
    authors:
      "Israt Jahan Khan, Md Fahim Bin Amin, Mahady Hasan Sabbir, Durba Morshaline Nejhum, Abu Hasib Muhammad Nanzil, Raiyan Rahman",
    venue:
      "2024 6th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT)",
    venueShort: "IEEE ICEEICT 2024",
    type: "Conference",
    paperLink:
      "https://www.researchgate.net/publication/380839075_Vehicle_Number_Plate_Detection_and_Encryption_in_Digital_Images_Using_YOLOv8_and_Chaotic-Based_Encryption_Scheme",
    publisherLink:
      "https://ieeexplore.ieee.org/abstract/document/10534375",
    abstract:
      "This research introduces an innovative security system for vehicle number plate privacy, featuring a combination of a deep learning model and robust encryption. The system integrates YOLOv8 for precise car number plate detection and utilizes the robust security features of the Chaotic-based Logistic Map encryption process. This combination not only enhances detection accuracy but also establishes a robust framework for efficiently safeguarding sensitive data through chaotic encryption methods.",
    keywords: [
      "YOLOv8",
      "Number Plate Detection",
      "Chaotic Encryption",
      "Data Privacy",
      "Object Detection",
    ],
    doi: "10.1109/ICEEICT62016.2024.10534375",
    citations: 12,
    coverImage: `${CDN}/images/publications/safelicensing.png`,
    pdfUrl: `${CDN}/pdfs/publications/ieee-iceeict-2024-10534375.pdf`,
  },
];
