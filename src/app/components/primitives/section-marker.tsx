import { cn } from "@/lib/cn";
import { HTMLAttributes, ReactNode } from "react";
import { Display } from "./display";

interface SectionMarkerProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  number?: string;
  title: ReactNode;
}

export function SectionMarker({ number: _number, title, className, ...props }: SectionMarkerProps) {
  return (
    <div className={cn("flex items-baseline gap-4", className)} {...props}>
      <Display size="section">{title}</Display>
    </div>
  );
}
