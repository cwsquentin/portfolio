import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

type DisplaySize = "hero" | "section" | "block";
type AsTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";
type DisplayWeight = 600 | 700 | 800;

interface DisplayProps extends HTMLAttributes<HTMLElement> {
  size?: DisplaySize;
  as?: AsTag;
  weight?: DisplayWeight;
}

const sizeClasses: Record<DisplaySize, string> = {
  hero: "text-[clamp(72px,12vw,160px)] leading-[0.85] tracking-[-0.05em]",
  section: "text-[clamp(40px,7vw,72px)] leading-[0.9] tracking-[-0.03em]",
  block: "text-[clamp(24px,3vw,32px)] leading-none tracking-[-0.02em]",
};

const weightClasses: Record<DisplayWeight, string> = {
  600: "font-semibold",
  700: "font-bold",
  800: "font-extrabold",
};

const defaultAsBySize: Record<DisplaySize, AsTag> = {
  hero: "h1",
  section: "h2",
  block: "h3",
};

const defaultWeightBySize: Record<DisplaySize, DisplayWeight> = {
  hero: 800,
  section: 700,
  block: 600,
};

export function Display({ size = "section", as, weight, className, ...props }: DisplayProps) {
  const Tag = as ?? defaultAsBySize[size];
  const resolvedWeight = weight ?? defaultWeightBySize[size];
  return (
    <Tag
      className={cn("font-display", sizeClasses[size], weightClasses[resolvedWeight], className)}
      {...props}
    />
  );
}
