import type { HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "brand" | "success" | "warning" | "error" | "accent";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-content-muted",
  brand: "bg-brand-subtle text-content-brand",
  success: "bg-success-subtle text-content-success",
  warning: "bg-warning-subtle text-content-warning",
  error: "bg-danger-subtle text-content-danger",
  accent: "bg-accent text-on-accent",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  children?: ReactNode;
}

export default function Badge({
  tone = "neutral",
  className = "",
  children = "Rascunho",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-label-s ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
