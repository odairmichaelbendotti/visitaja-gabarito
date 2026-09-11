"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

interface SelectFieldProps {
  /** Required: links the `<label>` to the trigger button. */
  id: string;
  label?: ReactNode;
  placeholder?: string;
  options?: string[];
  /** Uncontrolled initial value. Ignored once `value` is passed. */
  defaultValue?: string;
  /** Controlled value — pass together with `onChange`. */
  value?: string;
  onChange?: (value: string) => void;
  /** Name of a hidden input, so a native `<form>` submit still reads this value via `FormData`. */
  name?: string;
  helperText?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const DEFAULT_OPTIONS = ["Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"];

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 6"
      fill="none"
      aria-hidden
      className={`h-1.5 w-3 shrink-0 transition-transform ${className}`}
    >
      <path
        d="M3 2.25L6 3.75L9 2.25"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SelectField({
  id,
  label = "Selecione",
  placeholder = "Escolha uma opção",
  options = DEFAULT_OPTIONS,
  defaultValue,
  value: controlledValue,
  onChange,
  name,
  helperText,
  error,
  disabled = false,
  className = "",
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const hasError = Boolean(error);
  const message = error ?? helperText;
  const messageId = `${id}-message`;
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  function selectOption(option: string) {
    if (!isControlled) setInternalValue(option);
    onChange?.(option);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function openMenu() {
    if (disabled) return;
    const currentIndex = options.indexOf(value);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
    setOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const triggerStateClasses = disabled
    ? "border-border-subtle bg-muted cursor-not-allowed"
    : open
      ? "border-2 border-border-focus bg-surface cursor-pointer"
      : hasError
        ? "border-content-danger bg-surface cursor-pointer"
        : "border-border bg-surface cursor-pointer hover:border-content-subtle";

  const valueClasses = disabled
    ? "text-content-subtle"
    : value
      ? "text-content"
      : "text-content-subtle";

  const chevronClasses = disabled
    ? "text-content-subtle"
    : open
      ? "rotate-180 text-content-brand"
      : hasError
        ? "text-content-danger"
        : "text-content-muted";

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className={`text-label-m ${disabled ? "text-content-subtle" : "text-content"}`}
      >
        {label}
      </label>

      <div ref={containerRef} className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          role="combobox"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={handleKeyDown}
          className={`flex w-full items-center justify-between gap-2 rounded-md border px-4 py-3 text-body-m outline-none transition disabled:cursor-not-allowed ${triggerStateClasses}`}
        >
          <span className={`truncate ${valueClasses}`}>
            {value || placeholder}
          </span>
          <ChevronIcon className={chevronClasses} />
        </button>

        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            className="absolute left-0 top-full z-20 mt-2 flex w-full flex-col gap-1 rounded-md border border-border-subtle bg-surface p-2 shadow-md"
          >
            {options.map((option, index) => {
              const selected = option === value;
              return (
                <li key={option} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full cursor-pointer rounded-sm px-4 py-2 text-left transition-colors ${
                      selected
                        ? "bg-brand-subtle text-label-m text-content-brand"
                        : `text-body-m text-content ${
                            activeIndex === index ? "bg-muted" : "hover:bg-muted"
                          }`
                    }`}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
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

      {name ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  );
}
