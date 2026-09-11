import Link from "next/link";
import Avatar from "./Avatar";

/* Ícones (20×20) exportados do Figma — `stroke` trocado por currentColor para herdar a cor do item. */
const ICONES: Record<string, string[]> = {
  "visao-geral": [
    "M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V7.5C2.5 7.96024 2.8731 8.33333 3.33333 8.33333H7.5C7.96024 8.33333 8.33333 7.96024 8.33333 7.5V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z",
    "M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V7.5C11.6667 7.96024 12.0398 8.33333 12.5 8.33333H16.6667C17.1269 8.33333 17.5 7.96024 17.5 7.5V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z",
    "M7.5 11.6667H3.33333C2.8731 11.6667 2.5 12.0398 2.5 12.5V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V12.5C8.33333 12.0398 7.96024 11.6667 7.5 11.6667Z",
    "M16.6667 11.6667H12.5C12.0398 11.6667 11.6667 12.0398 11.6667 12.5V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V12.5C17.5 12.0398 17.1269 11.6667 16.6667 11.6667Z",
  ],
  corretores: [
    "M7.5 9.58333C9.11083 9.58333 10.4167 8.2775 10.4167 6.66667C10.4167 5.05584 9.11083 3.75 7.5 3.75C5.88917 3.75 4.58333 5.05584 4.58333 6.66667C4.58333 8.2775 5.88917 9.58333 7.5 9.58333Z",
    "M2.08333 16.6667C2.08333 15.2301 2.65402 13.8523 3.66984 12.8365C4.68566 11.8207 6.06341 11.25 7.5 11.25C8.93659 11.25 10.3143 11.8207 11.3302 12.8365C12.346 13.8523 12.9167 15.2301 12.9167 16.6667",
    "M13.3333 4.16667C14.1069 4.16667 14.8487 4.47396 15.3957 5.02094C15.9427 5.56792 16.25 6.30979 16.25 7.08333C16.25 7.85688 15.9427 8.59875 15.3957 9.14573C14.8487 9.69271 14.1069 10 13.3333 10M17.9167 16.6667C17.9167 15.5973 17.6001 14.5518 17.0069 13.662C16.4138 12.7723 15.5705 12.078 14.5833 11.6667",
  ],
  imoveis: [
    "M3.33333 9.16667L10 4.16667L16.6667 9.16667",
    "M5 8.33333V15.8333H15V8.33333",
    "M8.33333 15.8333V11.6667H11.6667V15.8333",
  ],
  agenda: [
    "M15 4.16667H5C4.07953 4.16667 3.33333 4.91286 3.33333 5.83333V15.8333C3.33333 16.7538 4.07953 17.5 5 17.5H15C15.9205 17.5 16.6667 16.7538 16.6667 15.8333V5.83333C16.6667 4.91286 15.9205 4.16667 15 4.16667Z",
    "M3.33333 8.33333H16.6667M6.66667 2.5V5.83333M13.3333 2.5V5.83333",
  ],
  configuracoes: [
    "M3.33333 5.83333H10.8333M14.1667 5.83333H16.6667M3.33333 14.1667H5.83333M9.16667 14.1667H16.6667",
    "M12.5 7.66667C13.5125 7.66667 14.3333 6.84586 14.3333 5.83333C14.3333 4.82081 13.5125 4 12.5 4C11.4875 4 10.6667 4.82081 10.6667 5.83333C10.6667 6.84586 11.4875 7.66667 12.5 7.66667Z",
    "M7.5 16C8.51252 16 9.33333 15.1792 9.33333 14.1667C9.33333 13.1541 8.51252 12.3333 7.5 12.3333C6.48748 12.3333 5.66667 13.1541 5.66667 14.1667C5.66667 15.1792 6.48748 16 7.5 16Z",
  ],
};

const ITENS = [
  { chave: "visao-geral", rotulo: "Visão geral", href: "/" },
  { chave: "corretores", rotulo: "Corretores", href: "/corretores" },
  { chave: "imoveis", rotulo: "Imóveis", href: "/imoveis" },
  { chave: "agenda", rotulo: "Agenda", href: "/agenda" },
  { chave: "configuracoes", rotulo: "Configurações", href: "/configuracoes" },
] as const;

type PaginaAtiva = (typeof ITENS)[number]["chave"];

function Icone({ nome }: { nome: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-5 shrink-0">
      {ICONES[nome].map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1.6667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

interface SidebarProps {
  paginaAtiva?: PaginaAtiva;
  usuario?: { nome: string; plano: string };
  className?: string;
}

export default function Sidebar({
  paginaAtiva = "visao-geral",
  usuario = { nome: "Âncora Imóveis", plano: "Plano Profissional" },
  className = "",
}: SidebarProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={`flex h-full w-64 shrink-0 flex-col gap-6 bg-surface px-4 py-6 ${className}`}
    >
      <span className="px-2 font-display text-titulo-m">
        <span className="text-content">Visita</span>
        <span className="text-content-brand">Já</span>
      </span>

      <ul className="flex flex-col gap-0.5">
        {ITENS.map((item) => {
          const ativo = item.chave === paginaAtiva;
          return (
            <li key={item.chave}>
              <Link
                href={item.href}
                aria-current={ativo ? "page" : undefined}
                className={`flex items-center gap-2 rounded-md p-2 text-rotulo-m transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus focus-visible:outline-none ${
                  ativo
                    ? "bg-brand-subtle text-content-brand hover:bg-violeta-100"
                    : "text-content-muted hover:bg-muted hover:text-content"
                }`}
              >
                <Icone nome={item.chave} />
                {item.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex-1" />

      <div className="flex items-center gap-2 rounded-md bg-muted p-2">
        <Avatar nome={usuario.nome} tamanho="p" />
        <div className="min-w-0">
          <p className="truncate text-rotulo-s text-content">{usuario.nome}</p>
          <p className="truncate text-corpo-s text-content-subtle">
            {usuario.plano}
          </p>
        </div>
      </div>
    </nav>
  );
}
