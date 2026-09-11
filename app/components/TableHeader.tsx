"use client";

import type { ReactNode } from "react";

type Align = "left" | "center" | "right";
type SortDirection = "none" | "asc" | "desc";

const ariaSortByDirection: Record<SortDirection, "none" | "ascending" | "descending"> = {
  none: "none",
  asc: "ascending",
  desc: "descending",
};

const arrowByDirection: Record<SortDirection, string> = {
  none: "",
  asc: "↑",
  desc: "↓",
};

interface TableHeaderProps {
  children?: ReactNode;
  align?: Align;
  sortDirection?: SortDirection;
  /** Pass to make the cell sortable (renders a `<button>`). */
  onSort?: () => void;
  className?: string;
}

export default function TableHeader({
  children = "Corretor responsável",
  align = "left",
  sortDirection = "none",
  onSort,
  className = "",
}: TableHeaderProps) {
  const active = sortDirection !== "none";
  const contentClasses = `flex w-full items-center gap-0.5 px-4 py-2 text-label-s ${
    align === "right" ? "justify-end" : align === "center" ? "justify-center" : ""
  }`;

  const content = (
    <>
      <span className={active ? "text-content" : "text-content-muted"}>
        {children}
      </span>
      {active ? (
        <span aria-hidden className="text-content-brand">
          {arrowByDirection[sortDirection]}
        </span>
      ) : null}
    </>
  );

  return (
    <th
      scope="col"
      aria-sort={ariaSortByDirection[sortDirection]}
      className={`border-b border-border bg-muted ${className}`}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className={`${contentClasses} cursor-pointer transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus focus-visible:outline-none`}
        >
          {content}
        </button>
      ) : (
        <div className={contentClasses}>{content}</div>
      )}
    </th>
  );
}
