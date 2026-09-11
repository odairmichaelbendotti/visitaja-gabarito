import type { InputHTMLAttributes, ReactNode } from "react";

interface CampoDeFormularioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Obrigatório: liga o `<label>` ao `<input>`. */
  id: string;
  label?: ReactNode;
  apoio?: ReactNode;
  erro?: ReactNode;
}

const entradaBase =
  "w-full rounded-md px-4 py-3 text-corpo-m text-content outline-none transition placeholder:text-content-subtle disabled:cursor-not-allowed";

const entradaPorEstado = {
  padrao:
    "border border-border bg-surface hover:border-content-subtle focus:border-2 focus:border-border-focus focus:shadow-brand",
  erro: "border-2 border-content-danger bg-surface",
  desabilitado:
    "border border-border-subtle bg-muted text-content-subtle placeholder:text-content-subtle",
} as const;

export default function CampoDeFormulario({
  id,
  label = "E-mail do cliente",
  apoio = "Enviaremos a confirmação da visita para este e-mail.",
  erro,
  disabled = false,
  className = "",
  ...props
}: CampoDeFormularioProps) {
  const temErro = Boolean(erro);
  const mensagem = erro ?? apoio;
  const mensagemId = `${id}-mensagem`;
  const estado = disabled ? "desabilitado" : temErro ? "erro" : "padrao";

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className={`text-rotulo-m ${disabled ? "text-content-subtle" : "text-content"}`}
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        aria-invalid={temErro || undefined}
        aria-describedby={mensagem ? mensagemId : undefined}
        className={`${entradaBase} ${entradaPorEstado[estado]}`}
        {...props}
      />
      {mensagem ? (
        <p
          id={mensagemId}
          className={`text-corpo-s ${
            temErro
              ? "text-content-danger"
              : disabled
                ? "text-content-subtle"
                : "text-content-muted"
          }`}
        >
          {mensagem}
        </p>
      ) : null}
    </div>
  );
}
