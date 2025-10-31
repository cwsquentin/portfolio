import type { StaticImageData } from "next/image";

export type ProjectItem = {
  id: "musicStory" | "paris92" | "taskFlow" | "medchemStructureGenius";
  slug: string;
  image: string | StaticImageData;       // keep the union, strings work fine
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
    image: "/projects/medchemstructuregenius/project.webp",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "React Native (Expo)", "Supabase"],
    confidential: true,
    demo: "https://www.medchemstructuregenius.eu/",
    gallery: [
      "/projects/medchemstructuregenius/main.webp",
      "/projects/medchemstructuregenius/quiz.webp",
      "/projects/medchemstructuregenius/backoffice.webp",
    ],
  },
  {
    id: "musicStory",
    slug: "musicstory",
    image: "/projects/musicstory.webp",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "next-intl", "Framer Motion"],
    confidential: true,
    demo: "https://www.music-story.com",
  },
  {
    id: "paris92",
    slug: "paris92",
    image: "/projects/paris92.webp",
    technologies: ["Python", "Next.js", "TailwindCSS", "TypeScript", "PostgreSQL"],
    confidential: true,
  },
];