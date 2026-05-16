import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface MonoLabelProps extends HTMLAttributes<HTMLSpanElement> {
  marker?: string;
  as?: "span" | "p";
}

export function MonoLabel({ marker, as: Tag = "span", className, children, ...props }: MonoLabelProps) {
  return (
    <Tag className={cn("text-mono-label", className)} {...props}>
      {marker && <span aria-hidden="true" className="mr-2">{marker}</span>}
      {children}
    </Tag>
  );
}
