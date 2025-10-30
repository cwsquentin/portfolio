import type { StaticImageData } from "next/image";
import MusicStory from "/public/projects/musicstory.webp";
import Paris92 from "/public/projects/paris92.webp";
import MedChemStructureGeniusCard from "/public/projects/medchemstructuregenius/project.webp";
import MedChemStructureGeniusMain from "/public/projects/medchemstructuregenius/main.webp";
import MedChemStructureGeniusQuiz from "/public/projects/medchemstructuregenius/quiz.webp";
import MedChemStructureGeniusBackoffice from "/public/projects/medchemstructuregenius/backoffice.webp";

export type ProjectItem = {
  id: "musicStory" | "paris92" | "taskFlow" | "medchemStructureGenius";
  slug: string;
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
  gallery?: Array<string | StaticImageData>;
};

export const projectsData: ProjectItem[] = [
  {
    id: "medchemStructureGenius",
    slug: "medchemstructuregenius",
    image: MedChemStructureGeniusCard,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Expo"],
    confidential: true,
    demo: "https://www.medchemstructuregenius.eu/",
    gallery: [
      MedChemStructureGeniusMain,
      MedChemStructureGeniusQuiz,
      MedChemStructureGeniusBackoffice,
    ],
  },
  {
    id: "musicStory",
    slug: "musicstory",
    image: MusicStory,
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "next-intl", "Framer Motion"],
    confidential: true,
    demo: "https://www.music-story.com",
  },
  {
    id: "paris92",
    slug: "paris92",
    image: Paris92,
    technologies: ["Python", "Next.js", "TailwindCSS", "TypeScript", "PostgreSQL"],
    confidential: true,
  },
];
