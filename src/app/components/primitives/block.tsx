import { cn } from "@/lib/cn";
import type { HTMLAttributes, Ref } from "react";

type BlockColor = "paper" | "ink" | "cyan" | "magenta" | "yellow";
type BlockShadow = "none" | "sm" | "md" | "lg";

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  color?: BlockColor;
  shadow?: BlockShadow;
  border?: boolean;
  as?: "div" | "section" | "article" | "aside";
  ref?: Ref<HTMLDivElement>;
}

const colorClasses: Record<BlockColor, string> = {
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
  cyan: "bg-cyan text-ink",
  magenta: "bg-magenta text-paper",
  yellow: "bg-yellow text-ink",
};

const shadowClasses: Record<BlockShadow, string> = {
  none: "",
  sm: "shadow-block-sm",
  md: "shadow-block-md",
  lg: "shadow-block-lg",
};

export function Block({
  color = "paper",
  shadow = "none",
  border = true,
  as: Tag = "div",
  className,
  ref,
  ...props
}: BlockProps) {
  return (
    <Tag
      ref={ref}
      className={cn(
        colorClasses[color],
        shadowClasses[shadow],
        border && "border-2 border-ink",
        "rounded-none",
        className,
      )}
      {...props}
    />
  );
}
