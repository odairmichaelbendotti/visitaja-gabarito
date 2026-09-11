import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-on-brand hover:bg-brand-hover disabled:bg-muted disabled:text-content-subtle",
  secondary:
    "bg-surface text-content border border-border hover:bg-muted disabled:bg-surface disabled:text-content-subtle disabled:border-border-subtle",
  ghost:
    "bg-transparent text-content-brand hover:bg-brand-subtle disabled:bg-transparent disabled:text-content-subtle",
};

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 text-label-m transition-colors disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children?: ReactNode;
  /** When set, navigates instead of acting: renders a `<Link>`, not a `<button>`. */
  href?: string;
}

export default function Button({
  variant = "primary",
  type = "button",
  className = "",
  children = "Agendar visita",
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
