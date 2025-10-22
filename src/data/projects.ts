import type { StaticImageData } from "next/image";
import MusicStory from "/public/projects/musicstory.webp";
import Paris92 from "/public/projects/paris92.webp";

export type ProjectItem = {
  id: "musicStory" | "paris92" | "taskFlow";
  slug: string;
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
};

export const projectsData: ProjectItem[] = [
  {
    id: "musicStory",
    slug: "MusicStory",
    image: MusicStory,
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "next-intl", "Framer Motion"],
    demo: "https://www.music-story.com",
  },
  {
    id: "paris92",
    slug: "Paris92",
    image: Paris92,
    technologies: ["Python", "Next.js", "TailwindCSS", "TypeScript", "PostgreSQL"],
    confidential: true,
  },
];
