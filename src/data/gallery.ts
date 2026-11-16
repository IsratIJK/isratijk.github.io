const CDN = import.meta.env.VITE_CDN_BASE_URL;

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  description?: string;
  category: string;
  date: string; // ISO format: "YYYY-MM-DD"
}

export const galleryCategories = ["All", "Conference", "Lab", "Personal", "Moment"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export const gallery: GalleryItem[] = [
  {
    id: "g9",
    type: "image",
    src: `${CDN}/images/gallery/team-iphim-cse-projectshow.jpg`,
    title: "CSE Project Show",
    description: "Team photo at the CSE Project Show.",
    category: "Lab",
    date: "2023-06-01",
  },
  {
    id: "g10",
    type: "image",
    src: `${CDN}/images/gallery/studentbook-dbms-lab-uiu.jpg`,
    title: "DBMS Lab - UIU",
    description: "Database Management Systems lab session at United International University.",
    category: "Lab",
    date: "2022-09-01",
  },
  {
    id: "g11",
    type: "image",
    src: `${CDN}/images/gallery/6th-iceeict-mist.jpg`,
    title: "6th ICEEICT - MIST",
    description: "Presenting at the 6th International Conference on Electrical Engineering and Information & Communication Technology at MIST.",
    category: "Conference",
    date: "2023-09-20",
  },
  {
    id: "g12",
    type: "image",
    src: `${CDN}/images/gallery/6th-iceeict-isratjahankhan.jpg`,
    title: "6th ICEEICT - Presentation",
    description: "Israt Jahan Khan presenting research at the 6th ICEEICT.",
    category: "Conference",
    date: "2023-09-20",
  },
  {
    id: "g13",
    type: "image",
    src: `${CDN}/images/gallery/bsc-convocation-uiu-isratjahankhan.jpg`,
    title: "BSc Convocation - UIU",
    description: "BSc graduation convocation ceremony at United International University.",
    category: "Personal",
    date: "2023-11-15",
  },
  {
    id: "g14",
    type: "image",
    src: `${CDN}/images/gallery/being-judge-at-cse-projectshow-2.jpg`,
    title: "Judging CSE Project Show",
    description: "Serving as a judge at the CSE Project Show.",
    category: "Personal",
    date: "2024-03-10",
  },
  {
    id: "g15",
    type: "image",
    src: `${CDN}/images/gallery/being-judge-at-cse-projectshow.jpg`,
    title: "Judging CSE Project Show",
    description: "Serving as a judge at the CSE Project Show.",
    category: "Personal",
    date: "2024-03-10",
  },
  {
    id: "g17",
    type: "image",
    src: `${CDN}/images/gallery/8th-convocation-uiu-with-friends.jpg`,
    title: "8th Convocation · UIU",
    description: "8th convocation ceremony at United International University with friends.",
    category: "Personal",
    date: "2025-12-01",
  },
  {
    id: "g18",
    type: "image",
    src: `${CDN}/images/gallery/during-rehearsal-of-bsc-convocation-with-my-dearest-one.jpg`,
    title: "Convocation Rehearsal · UIU",
    description: "During rehearsal of BSc convocation with my dearest one.",
    category: "Moment",
    date: "2025-12-01",
  },
  {
    id: "g19",
    type: "image",
    src: `${CDN}/images/gallery/fydp-defense-team-infront-of-uiu-building.jpg`,
    title: "FYDP Defense · UIU",
    description: "Final Year Design Project defense team in front of UIU building.",
    category: "Moment",
    date: "2024-06-01",
  },
  {
    id: "g20",
    type: "image",
    src: `${CDN}/images/gallery/in-micro-lab-projectshow-with-teammates.jpg`,
    title: "Micro Lab Project Show · UIU",
    description: "In the micro lab project show with teammates at UIU.",
    category: "Lab",
    date: "2023-01-01",
  },
  {
    id: "g21",
    type: "image",
    src: `${CDN}/images/gallery/team-iphim-received-prize.jpg`,
    title: "Team Iphim Received Prize · UIU",
    description: "Team Iphim receiving prize at United International University.",
    category: "Moment",
    date: "2023-12-18",
  },
];
