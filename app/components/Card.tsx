import type { HTMLAttributes, ReactNode } from "react";

type Emphasis = "default" | "highlight";

const emphases: Record<Emphasis, string> = {
  default: "border border-border-subtle shadow-sm",
  highlight: "border-2 border-border-brand shadow-md",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  emphasis?: Emphasis;
  children?: ReactNode;
}

export default function Card({
  emphasis = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg bg-surface p-6 ${emphases[emphasis]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
