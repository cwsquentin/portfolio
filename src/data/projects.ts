import type { StaticImageData } from "next/image";

export type ProjectItem = {
  id:
    | "worldline"
    | "medchemStructureGenius"
    | "dochub"
    | "musicStory"
    | "paris92";
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
    id: "worldline",
    slug: "worldline",
    image: "/projects/worldline.webp",
    technologies: ["Python", "Pandas", "Scikit-learn", "BigQuery"],
    confidential: true,
    gallery: ["/projects/worldline.webp"],
  },
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
    id: "dochub",
    slug: "dochub",
    image: "/projects/dochub/project.webp",
    technologies: ["Vue.js", "PostgreSQL", "Docker", "GitHub Actions"],
    confidential: true,
    gallery: [
      "/projects/dochub/DocHub-1.webp",
      "/projects/dochub/DocHub-2.webp",
      "/projects/dochub/DocHub-3.webp",
    ],
  },
  {
    id: "musicStory",
    slug: "musicstory",
    image: "/projects/musicstory/home.webp",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "next-intl", "Framer Motion"],
    confidential: true,
    demo: "https://www.music-story.com",
    gallery: [
      "/projects/musicstory/home.webp",
      "/projects/musicstory/metadata.webp",
      "/projects/musicstory/map.webp",
      "/projects/musicstory/customers.webp",
    ],
  },
  {
    id: "paris92",
    slug: "paris92",
    image: "/projects/paris92.webp",
    technologies: ["Python", "Next.js", "TailwindCSS", "TypeScript", "PostgreSQL"],
    confidential: true,
  },
];
