"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Required: links the `<label>` to the `<input>`. */
  id: string;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
}

const baseInputClasses =
  "w-full rounded-md px-4 py-3 text-body-m text-content outline-none transition placeholder:text-content-subtle disabled:cursor-not-allowed";

const inputStateClasses = {
  default:
    "border border-border bg-surface hover:border-content-subtle focus:border-2 focus:border-border-focus focus:shadow-brand",
  error: "border-2 border-content-danger bg-surface",
  disabled:
    "border border-border-subtle bg-muted text-content-subtle placeholder:text-content-subtle",
} as const;

/* `type="password"` already turns on the show/hide button — no extra prop needed. */
function EyeIcon({ className = "h-3.5 w-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 14" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7C0 7 3 0 9 0C15 0 18 7 18 7C18 7 15 14 9 14C3 14 0 7 0 7ZM9 10.5C10.6569 10.5 12 8.93299 12 7C12 5.06701 10.6569 3.5 9 3.5C7.34315 3.5 6 5.06701 6 7C6 8.93299 7.34315 10.5 9 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeOffIcon({
  className = "h-3.5 w-4.5",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 18 14" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7C0 7 3 0 9 0C15 0 18 7 18 7C18 7 15 14 9 14C3 14 0 7 0 7ZM9 10.5C10.6569 10.5 12 8.93299 12 7C12 5.06701 10.6569 3.5 9 3.5C7.34315 3.5 6 5.06701 6 7C6 8.93299 7.34315 10.5 9 10.5Z"
        fill="currentColor"
      />
      <line
        x1="1.5"
        y1="1"
        x2="16.5"
        y2="13"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FormField({
  id,
  label = "E-mail do cliente",
  helperText = "Enviaremos a confirmação da visita para este e-mail.",
  error,
  disabled = false,
  className = "",
  type,
  ...props
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasError = Boolean(error);
  const message = error ?? helperText;
  const messageId = `${id}-message`;
  const state = disabled ? "disabled" : hasError ? "error" : "default";

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className={`text-label-m ${disabled ? "text-content-subtle" : "text-content"}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          className={`${baseInputClasses} ${inputStateClasses[state]} ${isPassword ? "pr-11" : ""}`}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            disabled={disabled}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-content-subtle transition-colors hover:text-content-muted disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-focus"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        ) : null}
      </div>
      {message ? (
        <p
          id={messageId}
          className={`text-body-s ${
            hasError
              ? "text-content-danger"
              : disabled
                ? "text-content-subtle"
                : "text-content-muted"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
