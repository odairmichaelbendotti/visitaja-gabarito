import type { HTMLAttributes, ReactNode } from "react";

type Enfase = "padrao" | "destaque";

const enfases: Record<Enfase, string> = {
  padrao: "border border-border-subtle shadow-sm",
  destaque: "border-2 border-border-brand shadow-md",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  enfase?: Enfase;
  children?: ReactNode;
}

export default function Card({
  enfase = "padrao",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg bg-surface p-6 ${enfases[enfase]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
