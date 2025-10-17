import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonSize = "xs" | "compact" | "sm" | "md" | "mdTall" | "lg";
type ButtonBackground =
  | "none"
  | "teal"
  | "tealStrong"
  | "glass"
  | "transparentSoft"
  | "transparentStrong"
  | "indigo"
  | "slate";
type ButtonBorder =
  | "none"
  | "whiteSoft"
  | "whiteStrong"
  | "whiteBase"
  | "slate"
  | "slateMuted";
type ButtonRadius = "full" | "xl" | "md";
type ButtonWeight = "medium" | "semibold";

const baseClass =
  "inline-flex items-center gap-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60";

const sizeClassMap: Record<ButtonSize, string> = {
  xs: "px-3 py-1.5",
  compact: "px-3 py-2",
  sm: "px-4 py-2",
  md: "px-5 py-2.5",
  mdTall: "px-5 py-3",
  lg: "px-6 py-3"
};

const backgroundClassMap: Record<ButtonBackground, string> = {
  none: "",
  teal: "bg-teal-500 text-white hover:bg-teal-400",
  tealStrong: "bg-teal-500 text-white hover:bg-teal-600",
  glass: "bg-white/5 text-slate-100 hover:bg-white/10",
  transparentSoft: "text-slate-100 hover:bg-white/5",
  transparentStrong: "text-slate-100 hover:bg-white/10",
  indigo: "bg-indigo-600 text-white hover:bg-indigo-500",
  slate: "bg-slate-700/60 text-slate-300"
};

const borderClassMap: Record<ButtonBorder, string> = {
  none: "",
  whiteSoft: "border border-white/15 hover:border-white/30",
  whiteStrong: "border border-white/20 hover:border-white/40",
  whiteBase: "border border-white/10",
  slate: "border border-slate-600 hover:border-indigo-500",
  slateMuted: "border border-slate-600"
};

const radiusClassMap: Record<ButtonRadius, string> = {
  full: "rounded-full",
  xl: "rounded-xl",
  md: "rounded-md"
};

const weightClassMap: Record<ButtonWeight, string> = {
  medium: "font-medium",
  semibold: "font-semibold"
};

type ButtonOwnProps<C extends ElementType> = {
  as?: C;
  external?: boolean;
  size?: ButtonSize;
  background: ButtonBackground;
  border?: ButtonBorder;
  radius?: ButtonRadius;
  weight?: ButtonWeight;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
};

export type ButtonProps<C extends ElementType> = ButtonOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C> | "className">;

export function Button<C extends ElementType = typeof Link>({
  as,
  external,
  size = "md",
  background,
  border = "none",
  radius = "full",
  weight = "semibold",
  className,
  children,
  disabled,
  ...props
}: ButtonProps<C>) {
  const href = (props as { href?: unknown }).href;
  const shouldUseAnchor =
    external ?? (typeof href === "string" && /^https?:\/\//i.test(href));

  const Component = (as ?? (shouldUseAnchor ? "a" : Link)) as ElementType;

  const buttonClassName = clsx(
    baseClass,
    sizeClassMap[size],
    backgroundClassMap[background],
    borderClassMap[border],
    radiusClassMap[radius],
    weightClassMap[weight],
    disabled && "pointer-events-none cursor-not-allowed opacity-70",
    className
  );

  const mergedProps: Record<string, unknown> = {
    className: buttonClassName,
    ...props
  };

  if (shouldUseAnchor && mergedProps["target"] === "_blank" && !mergedProps["rel"]) {
    mergedProps["rel"] = "noopener noreferrer";
  }

  if (disabled) {
    mergedProps["aria-disabled"] = true;

    if (Component === "button") {
      mergedProps["disabled"] = true;
    }
  }

  return <Component {...(mergedProps as ComponentPropsWithoutRef<C>)}>{children}</Component>;
}
