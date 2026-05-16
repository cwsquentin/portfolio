"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { createElement } from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";
import { ColorFlood } from "@/app/components/motion/color-flood";
import { MechanicalPress } from "@/app/components/motion/mechanical-press";

export type ButtonVariant = "block" | "flood" | "ghost";
export type ButtonColor = "paper" | "cyan" | "magenta" | "yellow" | "ink";
export type ButtonFloodColor = "cyan" | "magenta" | "yellow" | "ink";
export type ButtonSize = "compact" | "sm" | "default" | "lg";

const sizeClassMap: Record<ButtonSize, string> = {
  compact: "px-3 py-2 text-xs",
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const blockColorClassMap: Record<ButtonColor, string> = {
  paper: "bg-paper text-ink",
  cyan: "bg-cyan text-ink",
  magenta: "bg-magenta text-paper",
  yellow: "bg-yellow text-ink",
  ink: "bg-ink text-paper",
};

const baseClass =
  "inline-flex items-center gap-2 font-mono font-medium uppercase tracking-[0.1em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

type ButtonOwnProps<C extends ElementType> = {
  as?: C;
  external?: boolean;
  size?: ButtonSize;
  variant: ButtonVariant;
  color?: ButtonColor;
  floodColor?: ButtonFloodColor;
  pill?: boolean;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
};

export type ButtonProps<C extends ElementType> = ButtonOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C> | "className">;

export function Button<C extends ElementType = typeof Link>({
  as,
  external,
  size = "default",
  variant,
  color = "paper",
  floodColor = "cyan",
  pill = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps<C>) {
  const href = (props as { href?: unknown }).href;
  const shouldUseAnchor =
    external ?? (typeof href === "string" && /^https?:\/\//i.test(href));

  const Component = (as ?? (shouldUseAnchor ? "a" : Link)) as ElementType;

  const radiusClass = pill ? "rounded-full" : "rounded-none";

  const variantClass = (() => {
    switch (variant) {
      case "block":
        return cn(
          blockColorClassMap[color],
          "border-2 border-ink shadow-block-md",
        );
      case "flood":
        return "border-2 border-ink";
      case "ghost":
        return "text-ink hover:underline underline-offset-4 decoration-2";
      default:
        return "";
    }
  })();

  const buttonClassName = cn(
    baseClass,
    sizeClassMap[size],
    radiusClass,
    variantClass,
    disabled && "pointer-events-none cursor-not-allowed opacity-50",
    className,
  );

  const mergedProps: Record<string, unknown> = {
    className: buttonClassName,
    ...props,
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

  if (variant === "block") {
    return (
      <MechanicalPress as={Component} {...(mergedProps as ComponentPropsWithoutRef<typeof Component>)}>
        {children}
      </MechanicalPress>
    );
  }

  if (variant === "flood") {
    return (
      <ColorFlood
        as={Component}
        floodColor={floodColor}
        {...(mergedProps as ComponentPropsWithoutRef<typeof Component>)}
      >
        {children}
      </ColorFlood>
    );
  }

  return createElement(
    Component as ElementType,
    mergedProps as ComponentPropsWithoutRef<C>,
    children,
  );
}
