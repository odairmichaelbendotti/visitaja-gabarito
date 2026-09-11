import type { HTMLAttributes, ReactNode } from "react";

type Tom = "neutro" | "marca" | "sucesso" | "alerta" | "erro" | "accent";

const tons: Record<Tom, string> = {
  neutro: "bg-muted text-content-muted",
  marca: "bg-brand-subtle text-content-brand",
  sucesso: "bg-success-subtle text-content-success",
  alerta: "bg-warning-subtle text-content-warning",
  erro: "bg-danger-subtle text-content-danger",
  accent: "bg-accent text-on-accent",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tom?: Tom;
  children?: ReactNode;
}

export default function Badge({
  tom = "neutro",
  className = "",
  children = "Rascunho",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-rotulo-s ${tons[tom]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
