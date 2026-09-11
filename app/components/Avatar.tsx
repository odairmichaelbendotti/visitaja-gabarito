import Image from "next/image";

type Tamanho = "p" | "m" | "g";

const tamanhos: Record<Tamanho, { caixa: string; texto: string; px: number }> = {
  p: { caixa: "size-8", texto: "text-rotulo-s", px: 32 },
  m: { caixa: "size-10", texto: "text-rotulo-m", px: 40 },
  g: { caixa: "size-14", texto: "font-display text-titulo-s", px: 56 },
};

interface AvatarProps {
  nome?: string;
  /** URL da foto. Sem foto, mostra as iniciais de `nome`. */
  src?: string;
  tamanho?: Tamanho;
  className?: string;
}

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

export default function Avatar({
  nome = "Marina Rocha",
  src,
  tamanho = "p",
  className = "",
}: AvatarProps) {
  const { caixa, texto, px } = tamanhos[tamanho];

  return (
    <span
      className={`relative inline-flex ${caixa} shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-subtle ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={nome}
          fill
          sizes={`${px}px`}
          className="object-cover"
        />
      ) : (
        <span className={`${texto} text-content-brand`}>{iniciais(nome)}</span>
      )}
    </span>
  );
}
