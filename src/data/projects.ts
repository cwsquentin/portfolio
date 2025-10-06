import type { StaticImageData } from "next/image";
import MusicStory from "/public/projects/musicstory.webp";
import Paris92 from "/public/projects/paris92.webp";

export type ProjectItem = {
  id: "musicStory" | "paris92" | "taskFlow";
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
};

export const projectsData: ProjectItem[] = [
  {
    id: "musicStory",
    image: MusicStory,
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "next-intl", "Framer Motion"],
    confidential: true,
  },
  {
    id: "paris92",
    image: Paris92,
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "next-intl", "Framer Motion"],
    confidential: true,
  },
  {
    id: "taskFlow",
    image: Paris92,
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://taskflow-demo.com",
  },
];
