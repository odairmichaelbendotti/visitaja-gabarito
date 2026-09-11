import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "fantasma";

const variantes: Record<Variante, string> = {
  primario:
    "bg-brand text-on-brand hover:bg-brand-hover disabled:bg-muted disabled:text-content-subtle",
  secundario:
    "bg-surface text-content border border-border hover:bg-muted disabled:bg-surface disabled:text-content-subtle disabled:border-border-subtle",
  fantasma:
    "bg-transparent text-content-brand hover:bg-brand-subtle disabled:bg-transparent disabled:text-content-subtle",
};

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  children?: ReactNode;
}

export default function Botao({
  variante = "primario",
  type = "button",
  className = "",
  children = "Agendar visita",
  ...props
}: BotaoProps) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 text-rotulo-m transition-colors disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none ${variantes[variante]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
