import type { ReactNode } from "react";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Botao from "@/app/components/Botao";
import Card from "@/app/components/Card";

/* ---------- dados de exemplo ---------- */

const NAV_LINKS = [
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Planos", href: "#planos" },
  { rotulo: "Depoimentos", href: "#depoimentos" },
  { rotulo: "Perguntas frequentes", href: "#perguntas-frequentes" },
];

const AGENDA_HOJE = [
  {
    hora: "09:00",
    endereco: "Rua Oscar Freire, 980 — Jardins",
    corretor: "Marina Rocha",
    status: { tom: "sucesso" as const, texto: "Confirmada" },
  },
  {
    hora: "11:30",
    endereco: "Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi",
    corretor: "Tiago Lemes",
    status: { tom: "alerta" as const, texto: "Pendente" },
  },
  {
    hora: "15:00",
    endereco: "Rua Fradique Coutinho, 1200 — Pinheiros",
    corretor: "Carla Simões",
    status: { tom: "marca" as const, texto: "Nova" },
  },
];

const PASSOS = [
  {
    titulo: "Cadastre os imóveis",
    texto:
      "Adicione fotos, endereço, valor, metragem e o corretor responsável por cada imóvel do portfólio.",
  },
  {
    titulo: "Compartilhe o link",
    texto:
      "Cada imóvel ganha um link público. Envie no WhatsApp, cole no anúncio do portal ou no material impresso.",
  },
  {
    titulo: "Receba as visitas na agenda",
    texto:
      "O cliente escolhe um horário livre e informa o contato. A visita entra na agenda do corretor, já com nome e telefone.",
  },
];

const ICONES: Record<string, string[]> = {
  agenda: [
    "M18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5Z",
    "M4 10H20M8 3V7M16 3V7",
  ],
  link: [
    "M10 13C10.9346 13.9161 12.1912 14.4293 13.5 14.4293C14.8088 14.4293 16.0654 13.9161 17 13L19 11C19.7221 10.0371 20.0727 8.8461 19.9874 7.64556C19.9021 6.44501 19.3866 5.31552 18.5355 4.46447C17.6845 3.61341 16.555 3.0979 15.3544 3.01258C14.1539 2.92726 12.9629 3.27785 12 4L11 5",
    "M14 11C13.0654 10.0839 11.8088 9.57071 10.5 9.57071C9.19124 9.57071 7.93464 10.0839 7 11L5 13C4.27785 13.9629 3.92726 15.1539 4.01258 16.3544C4.0979 17.555 4.61341 18.6845 5.46447 19.5355C6.31552 20.3866 7.44501 20.9021 8.64555 20.9874C9.8461 21.0727 11.0371 20.7221 12 20L13 19",
  ],
  confirmacao: [
    "M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z",
    "M8.5 12.5L11 15L15.5 9.5",
  ],
  contato: [
    "M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z",
    "M4.5 20C4.5 18.0109 5.29018 16.1032 6.6967 14.6967C8.10322 13.2902 10.0109 12.5 12 12.5C13.9891 12.5 15.8968 13.2902 17.3033 14.6967C18.7098 16.1032 19.5 18.0109 19.5 20",
  ],
  limite: ["M6 20V11M12 20V4M18 20V14"],
  navegador: [
    "M19 4H5C3.89543 4 3 4.89543 3 6V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15V6C21 4.89543 20.1046 4 19 4Z",
    "M8 21H16M12 17V21",
  ],
};

const BENEFICIOS = [
  {
    icone: "agenda",
    titulo: "Agenda sem conflito",
    texto:
      "Cada visita entra no horário certo, no calendário do corretor certo. Sem dupla marcação.",
  },
  {
    icone: "link",
    titulo: "Um link por imóvel",
    texto:
      "Compartilhe no WhatsApp, nos portais e nos anúncios. O cliente agenda sem falar com ninguém.",
  },
  {
    icone: "confirmacao",
    titulo: "Menos visita furada",
    texto:
      "O cliente escolhe o horário e recebe a confirmação na hora. Lembrete automático por e-mail.",
  },
  {
    icone: "contato",
    titulo: "Contato dos interessados",
    texto:
      "Nome, e-mail e telefone de todo mundo que agenda. A imobiliária acompanha a demanda de cada imóvel.",
  },
  {
    icone: "limite",
    titulo: "Limite do plano na tela",
    texto:
      "Veja quantos corretores ainda cabem antes de precisar subir de faixa. Sem surpresa na fatura.",
  },
  {
    icone: "navegador",
    titulo: "Funciona no navegador",
    texto:
      "Nada para instalar. Abre no computador da imobiliária e no celular do corretor.",
  },
];

const PLANOS = [
  {
    nome: "Essencial",
    preco: "R$ 149",
    periodo: "/mês",
    faixa: "até 10 corretores",
    itens: [
      "Imóveis ilimitados",
      "1 link público por imóvel",
      "Agenda por corretor",
      "Contatos de quem agenda",
      "Suporte por e-mail",
    ],
    cta: "Assinar Essencial",
    destaque: false,
  },
  {
    nome: "Profissional",
    selo: "Mais popular",
    preco: "R$ 279",
    periodo: "/mês",
    faixa: "até 20 corretores",
    itens: [
      "Tudo do Essencial",
      "Página do imóvel personalizada",
      "Lembrete automático de visita",
      "Relatório de visitas por imóvel",
      "Suporte prioritário",
    ],
    cta: "Assinar Profissional",
    destaque: true,
  },
  {
    nome: "Avançado",
    preco: "R$ 549",
    periodo: "/mês",
    faixa: "até 50 corretores",
    itens: [
      "Tudo do Profissional",
      "Vários administradores",
      "Exportação de dados (CSV)",
      "Marca da imobiliária na página",
      "Gerente de conta",
    ],
    cta: "Assinar Avançado",
    destaque: false,
  },
  {
    nome: "Sob consulta",
    preco: "Vamos conversar",
    periodo: "",
    faixa: "acima de 50 corretores",
    itens: [
      "Faixa de corretores personalizada",
      "Onboarding assistido",
      "Contrato e NF sob medida",
      "SLA de atendimento",
      "Integração com o CRM",
    ],
    cta: "Falar com vendas",
    destaque: false,
  },
];

const DEPOIMENTOS = [
  {
    texto:
      "Antes a gente perdia visita porque a mensagem sumia no meio de 200 conversas no WhatsApp. Agora o cliente agenda sozinho e o corretor só aparece no horário certo.",
    nome: "Marina Rocha",
    cargo: "Sócia · Âncora Imóveis — São Paulo, SP",
  },
  {
    texto:
      "Colocamos o link do VisitaJá em todo anúncio do portal. A visita já entra com nome e telefone, e a gente enxerga qual imóvel tem mais procura.",
    nome: "Tiago Lemes",
    cargo: "Gerente comercial · Imobiliária Portinari — Porto Alegre, RS",
  },
  {
    texto:
      "São 34 corretores e a agenda de todos numa tela só. O plano Avançado se pagou no primeiro mês.",
    nome: "Carla Simões",
    cargo: "Diretora · Vila Nova Imóveis — Campinas, SP",
  },
];

const PERGUNTAS = [
  {
    q: "Preciso instalar algum programa?",
    a: "Não. O VisitaJá funciona no navegador, tanto no computador da imobiliária quanto no celular do corretor.",
  },
  {
    q: "O cliente precisa criar conta para agendar?",
    a: "Não. Ele abre o link do imóvel, escolhe um horário livre e informa nome, e-mail e telefone. Sem cadastro e sem app.",
  },
  {
    q: "Como funciona o limite de corretores?",
    a: "Cada plano cobre uma faixa de corretores ativos. Ao se aproximar do limite, a tela avisa e você pode subir de plano quando quiser.",
  },
  {
    q: "Vocês cobram por visita agendada?",
    a: "Não. O valor é fixo por faixa de corretores — visitas ilimitadas em todos os planos.",
  },
  {
    q: "Posso trocar ou cancelar o plano depois?",
    a: "Sim. A troca vale na próxima fatura e o cancelamento pode ser feito a qualquer momento, sem multa.",
  },
  {
    q: "Dá para usar a marca da imobiliária na página do imóvel?",
    a: "Sim. A partir do plano Avançado a página do imóvel exibe o logo e as cores da imobiliária.",
  },
];

const RODAPE_COLUNAS = [
  {
    titulo: "PRODUTO",
    links: ["Como funciona", "Planos", "Página do imóvel", "Novidades"],
  },
  { titulo: "EMPRESA", links: ["Sobre", "Contato", "Trabalhe conosco"] },
  {
    titulo: "AJUDA",
    links: ["Central de ajuda", "Falar com vendas", "Status do sistema"],
  },
];

/* ---------- helpers locais ---------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-titulo-m ${className}`}>
      <span className="text-content">Visita</span>
      <span className="text-content-brand">Já</span>
    </span>
  );
}

function IconeTraco({
  paths,
  viewBox = "0 0 24 24",
  className = "size-6",
}: {
  paths: string[];
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg viewBox={viewBox} fill="none" aria-hidden className={className}>
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function Secao({
  id,
  fundo,
  children,
}: {
  id?: string;
  fundo: "surface" | "canvas";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${fundo === "surface" ? "bg-surface" : "bg-canvas"} px-6 py-16 lg:px-16 lg:py-24`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">{children}</div>
    </section>
  );
}

function CabecalhoSecao({
  eyebrow,
  titulo,
  texto,
  centralizado = false,
}: {
  eyebrow: string;
  titulo: string;
  texto?: string;
  centralizado?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${centralizado ? "items-center text-center" : "items-start"}`}
    >
      <span className="text-rotulo-s text-content-brand">{eyebrow}</span>
      <h2 className="font-display text-titulo-l text-content lg:text-titulo-xl">
        {titulo}
      </h2>
      {texto ? (
        <p className="max-w-2xl text-corpo-l text-content-muted">{texto}</p>
      ) : null}
    </div>
  );
}

function ItemPlano({ texto }: { texto: string }) {
  return (
    <li className="flex items-start gap-2 text-corpo-s text-content-muted">
      <svg
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden
        className="mt-0.5 size-4.5 shrink-0 text-content-success"
      >
        <path
          d="M15 4.5L6.75 12.75L3 9"
          stroke="currentColor"
          strokeWidth={1.875}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{texto}</span>
    </li>
  );
}

/* ---------- página ---------- */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-border-subtle bg-surface">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4 lg:px-16">
          <Logo />
          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-rotulo-m text-content-muted transition-colors hover:text-content"
              >
                {link.rotulo}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Botao variante="fantasma" className="hidden sm:inline-flex">
              Entrar
            </Botao>
            <Botao variante="primario">Assinar agora</Botao>
          </div>
        </nav>
      </header>

      <main className="flex flex-col">
        {/* Hero */}
        <section className="bg-canvas px-6 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col items-start gap-6">
              <Badge tom="marca">Agenda de visitas para imobiliárias</Badge>
              <h1 className="font-display text-display-l text-content lg:text-display-xl">
                Pare de marcar visita de imóvel pelo WhatsApp
              </h1>
              <p className="text-corpo-l text-content-muted">
                O VisitaJá gera um link de agendamento para cada imóvel. O
                cliente escolhe um horário livre, informa o contato, e a visita
                cai direto na agenda do corretor responsável.
              </p>
              <div className="flex flex-wrap gap-2">
                <Botao variante="primario">Assinar agora</Botao>
                <Botao variante="secundario">Ver como funciona</Botao>
              </div>
              <p className="text-corpo-s text-content-subtle">
                Sem cartão para testar · 14 dias grátis · Cancele quando quiser
              </p>
            </div>

            <Card className="w-full shrink-0 gap-4 lg:w-130">
              <div className="flex w-full items-center gap-2">
                <span className="flex-1 font-display text-titulo-s text-content">
                  Agenda de hoje
                </span>
                <span className="text-corpo-s text-content-subtle">
                  Terça, 9 set
                </span>
              </div>
              {AGENDA_HOJE.map((visita) => (
                <div
                  key={visita.hora}
                  className="flex w-full items-center gap-3 rounded-md bg-canvas p-3"
                >
                  <Avatar nome={visita.corretor} tamanho="m" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-corpo-s">
                    <span className="font-semibold text-content">
                      {visita.hora}
                    </span>
                    <span className="text-content-subtle">
                      {visita.endereco}
                    </span>
                  </div>
                  <Badge tom={visita.status.tom}>{visita.status.texto}</Badge>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* Como funciona */}
        <Secao id="como-funciona" fundo="surface">
          <CabecalhoSecao
            eyebrow="COMO FUNCIONA"
            titulo="Três passos para nunca mais perder uma visita"
            texto="A imobiliária configura uma vez. Depois é só compartilhar o link de cada imóvel."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PASSOS.map((passo, i) => (
              <Card key={passo.titulo} className="gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand font-display text-titulo-s text-on-brand">
                  {i + 1}
                </span>
                <h3 className="font-display text-titulo-m text-content">
                  {passo.titulo}
                </h3>
                <p className="text-corpo-m text-content-muted">{passo.texto}</p>
              </Card>
            ))}
          </div>
        </Secao>

        {/* Benefícios */}
        <Secao fundo="canvas">
          <CabecalhoSecao
            eyebrow="POR QUE VISITAJÁ"
            titulo="Tudo para organizar as visitas em um só lugar"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFICIOS.map((beneficio) => (
              <Card key={beneficio.titulo}>
                <span className="flex size-11 items-center justify-center rounded-md bg-brand-subtle text-content-brand">
                  <IconeTraco paths={ICONES[beneficio.icone]} />
                </span>
                <h3 className="font-display text-titulo-s text-content">
                  {beneficio.titulo}
                </h3>
                <p className="text-corpo-s text-content-muted">
                  {beneficio.texto}
                </p>
              </Card>
            ))}
          </div>
        </Secao>

        {/* Planos */}
        <Secao id="planos" fundo="surface">
          <CabecalhoSecao
            eyebrow="PLANOS"
            titulo="Preço por faixa de corretores"
            texto="Sem cobrança por visita. Escolha a faixa e troque de plano quando a equipe crescer."
            centralizado
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PLANOS.map((plano) => (
              <Card
                key={plano.nome}
                enfase={plano.destaque ? "destaque" : "padrao"}
                className="gap-4"
              >
                <div className="flex w-full items-center gap-2">
                  <span className="flex-1 font-display text-titulo-m text-content">
                    {plano.nome}
                  </span>
                  {plano.selo ? <Badge tom="marca">{plano.selo}</Badge> : null}
                </div>
                <div className="flex items-end gap-0.5">
                  <span
                    className={`font-display text-content ${plano.periodo ? "text-display-l" : "text-titulo-l"}`}
                  >
                    {plano.preco}
                  </span>
                  {plano.periodo ? (
                    <span className="text-corpo-s text-content-subtle">
                      {plano.periodo}
                    </span>
                  ) : null}
                </div>
                <span className="text-rotulo-m text-content-brand">
                  {plano.faixa}
                </span>
                <hr className="w-full border-border-subtle" />
                <ul className="flex w-full flex-col gap-2">
                  {plano.itens.map((item) => (
                    <ItemPlano key={item} texto={item} />
                  ))}
                </ul>
                <Botao
                  variante={plano.destaque ? "primario" : "secundario"}
                  className="mt-2 w-full"
                >
                  {plano.cta}
                </Botao>
              </Card>
            ))}
          </div>
        </Secao>

        {/* Depoimentos */}
        <Secao id="depoimentos" fundo="canvas">
          <CabecalhoSecao
            eyebrow="DEPOIMENTOS"
            titulo="Imobiliárias que pararam de marcar visita na mão"
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {DEPOIMENTOS.map((depo) => (
              <Card key={depo.nome} className="gap-4">
                <p className="text-corpo-m text-content">
                  &ldquo;{depo.texto}&rdquo;
                </p>
                <div className="flex w-full items-center gap-2">
                  <Avatar nome={depo.nome} tamanho="m" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-corpo-s">
                    <span className="font-semibold text-content">
                      {depo.nome}
                    </span>
                    <span className="text-content-subtle">{depo.cargo}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Secao>

        {/* Perguntas frequentes */}
        <Secao id="perguntas-frequentes" fundo="surface">
          <h2 className="font-display text-titulo-l text-content lg:text-titulo-xl">
            Perguntas frequentes
          </h2>
          <div className="flex flex-col">
            {PERGUNTAS.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="group border-b border-border-subtle py-4"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 font-display text-titulo-s text-content transition-colors hover:text-content-brand [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{item.q}</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className="size-5 shrink-0 text-content-subtle transition group-hover:text-content-brand group-open:-rotate-180"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth={1.6667}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="pt-2 text-corpo-m text-content-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Secao>

        {/* CTA final */}
        <section className="bg-brand px-6 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="font-display text-titulo-l text-on-brand lg:text-titulo-xl">
              Comece a receber visitas pela agenda ainda esta semana
            </h2>
            <p className="text-corpo-l text-on-brand/85">
              Configure os imóveis, compartilhe o link e deixe o WhatsApp para
              conversar — não para marcar horário.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Botao variante="secundario">Assinar agora</Botao>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-on-brand px-6 py-3 text-rotulo-m text-on-brand transition-colors hover:bg-on-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand focus-visible:outline-none"
              >
                Falar com vendas
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-cinza-900 px-6 py-16 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div className="flex flex-1 flex-col gap-2">
              <span className="font-display text-titulo-m">
                <span className="text-cinza-0">Visita</span>
                <span className="text-violeta-300">Já</span>
              </span>
              <p className="text-corpo-s text-cinza-400">
                Agendamento de visitas a imóveis para imobiliárias.
              </p>
            </div>
            {RODAPE_COLUNAS.map((coluna) => (
              <div key={coluna.titulo} className="flex flex-col gap-2">
                <span className="text-rotulo-s text-cinza-400">
                  {coluna.titulo}
                </span>
                {coluna.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-corpo-s text-cinza-300 transition-colors hover:text-cinza-0"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <hr className="border-cinza-800" />
          <div className="flex flex-col gap-2 text-corpo-s text-cinza-400 md:flex-row md:items-center">
            <p className="flex-1">
              © 2026 VisitaJá Tecnologia Ltda · CNPJ 51.482.377/0001-09 · São
              Paulo, SP
            </p>
            <p>Termos de uso · Privacidade</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
