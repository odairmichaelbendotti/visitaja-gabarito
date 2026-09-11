import type { ReactNode } from "react";
import type { Metadata } from "next";
import Botao from "@/app/components/Botao";
import CampoDeFormulario from "@/app/components/CampoDeFormulario";
import Card from "@/app/components/Card";
import Badge from "@/app/components/Badge";
import Avatar from "@/app/components/Avatar";
import CabecalhoDeTabela from "@/app/components/CabecalhoDeTabela";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "Preview de componentes · VisitaJá",
};

function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-titulo-l text-content">{titulo}</h2>
      {children}
    </section>
  );
}

function Amostra({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-rotulo-s text-content-subtle">{rotulo}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-content">
          VisitaJá · Componentes base
        </h1>
        <p className="text-corpo-l text-content-muted">
          Uma instância de cada variante dos componentes de{" "}
          <code className="text-corpo-m text-content-brand">app/components</code>.
        </p>
      </header>

      <Secao titulo="Botão">
        <p className="text-corpo-s text-content-subtle">
          Hover e foco são estados de CSS — passe o mouse ou navegue por Tab.
        </p>
        <Amostra rotulo="Primário — default / desabilitado">
          <Botao variante="primario" />
          <Botao variante="primario" disabled />
        </Amostra>
        <Amostra rotulo="Secundário — default / desabilitado">
          <Botao variante="secundario" />
          <Botao variante="secundario" disabled />
        </Amostra>
        <Amostra rotulo="Fantasma — default / desabilitado">
          <Botao variante="fantasma" />
          <Botao variante="fantasma" disabled />
        </Amostra>
      </Secao>

      <Secao titulo="Campo de formulário">
        <div className="grid gap-6 sm:grid-cols-2">
          <CampoDeFormulario
            id="campo-default"
            placeholder="voce@imobiliaria.com.br"
          />
          <CampoDeFormulario
            id="campo-erro"
            defaultValue="contato@"
            erro="Digite um e-mail válido."
          />
          <CampoDeFormulario
            id="campo-desabilitado"
            placeholder="voce@imobiliaria.com.br"
            apoio="Campo indisponível neste plano."
            disabled
          />
          <CampoDeFormulario
            id="campo-foco"
            placeholder="voce@imobiliaria.com.br"
            apoio="Clique no campo para ver o estado de foco."
          />
        </div>
      </Secao>

      <Secao titulo="Card">
        <div className="flex flex-wrap gap-6">
          {(["padrao", "destaque"] as const).map((enfase) => (
            <Card key={enfase} enfase={enfase} className="w-75">
              <span className="text-rotulo-s text-content-brand">
                APARTAMENTO
              </span>
              <span className="font-display text-titulo-m text-content">
                Rua Fradique Coutinho, 1200 — Pinheiros
              </span>
              <span className="text-corpo-s text-content-muted">
                72 m² · 2 dormitórios · 1 vaga · R$ 4.900/mês
              </span>
            </Card>
          ))}
        </div>
      </Secao>

      <Secao titulo="Badge">
        <div className="flex flex-wrap gap-3">
          <Badge tom="neutro">Rascunho</Badge>
          <Badge tom="marca">Novo</Badge>
          <Badge tom="sucesso">Confirmada</Badge>
          <Badge tom="alerta">Pendente</Badge>
          <Badge tom="erro">Cancelada</Badge>
          <Badge tom="accent">Limite atingido</Badge>
        </div>
      </Secao>

      <Secao titulo="Avatar">
        <Amostra rotulo="Iniciais — P / M / G">
          <Avatar nome="Marina Rocha" tamanho="p" />
          <Avatar nome="Marina Rocha" tamanho="m" />
          <Avatar nome="Marina Rocha" tamanho="g" />
        </Amostra>
        <Amostra rotulo="Foto — P / M / G">
          <Avatar nome="Marina Rocha" src="/demo/corretora.png" tamanho="p" />
          <Avatar nome="Marina Rocha" src="/demo/corretora.png" tamanho="m" />
          <Avatar nome="Marina Rocha" src="/demo/corretora.png" tamanho="g" />
        </Amostra>
      </Secao>

      <Secao titulo="Cabeçalho de tabela">
        <table className="w-full max-w-xl border-collapse overflow-hidden rounded-md">
          <thead>
            <tr>
              <CabecalhoDeTabela alinhamento="esquerda" ordenacao="nenhuma">
                Corretor responsável
              </CabecalhoDeTabela>
              <CabecalhoDeTabela alinhamento="esquerda" ordenacao="asc">
                Cliente
              </CabecalhoDeTabela>
              <CabecalhoDeTabela alinhamento="direita" ordenacao="desc">
                Valor
              </CabecalhoDeTabela>
            </tr>
          </thead>
          <tbody>
            <tr className="text-corpo-s text-content-muted">
              <td className="px-4 py-3">Marina Rocha</td>
              <td className="px-4 py-3">João Prado</td>
              <td className="px-4 py-3 text-right">R$ 4.900</td>
            </tr>
          </tbody>
        </table>
      </Secao>

      <Secao titulo="Sidebar">
        <div className="flex flex-wrap gap-6">
          {(
            [
              "visao-geral",
              "corretores",
              "imoveis",
              "agenda",
              "configuracoes",
            ] as const
          ).map((pagina) => (
            <div
              key={pagina}
              className="h-112 overflow-hidden rounded-lg border border-border-subtle shadow-sm"
            >
              <Sidebar paginaAtiva={pagina} />
            </div>
          ))}
        </div>
      </Secao>
    </main>
  );
}
