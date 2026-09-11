"use client";

import type { ReactNode } from "react";

type Alinhamento = "esquerda" | "direita";
type Ordenacao = "nenhuma" | "asc" | "desc";

const ariaSortPorOrdenacao: Record<Ordenacao, "none" | "ascending" | "descending"> = {
  nenhuma: "none",
  asc: "ascending",
  desc: "descending",
};

const setaPorOrdenacao: Record<Ordenacao, string> = {
  nenhuma: "",
  asc: "↑",
  desc: "↓",
};

interface CabecalhoDeTabelaProps {
  children?: ReactNode;
  alinhamento?: Alinhamento;
  ordenacao?: Ordenacao;
  /** Passe para tornar a célula ordenável (vira um `<button>`). */
  onOrdenar?: () => void;
  className?: string;
}

export default function CabecalhoDeTabela({
  children = "Corretor responsável",
  alinhamento = "esquerda",
  ordenacao = "nenhuma",
  onOrdenar,
  className = "",
}: CabecalhoDeTabelaProps) {
  const ativo = ordenacao !== "nenhuma";
  const conteudoClasses = `flex w-full items-center gap-0.5 px-4 py-2 text-rotulo-s ${
    alinhamento === "direita" ? "justify-end" : ""
  }`;

  const conteudo = (
    <>
      <span className={ativo ? "text-content" : "text-content-muted"}>
        {children}
      </span>
      {ativo ? (
        <span aria-hidden className="text-content-brand">
          {setaPorOrdenacao[ordenacao]}
        </span>
      ) : null}
    </>
  );

  return (
    <th
      scope="col"
      aria-sort={ariaSortPorOrdenacao[ordenacao]}
      className={`border-b border-border bg-muted ${className}`}
    >
      {onOrdenar ? (
        <button
          type="button"
          onClick={onOrdenar}
          className={`${conteudoClasses} cursor-pointer transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus focus-visible:outline-none`}
        >
          {conteudo}
        </button>
      ) : (
        <div className={conteudoClasses}>{conteudo}</div>
      )}
    </th>
  );
}
