import type { ReactNode } from "react";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import BrandLogoLink from "@/lib/auth/BrandLogoLink";

/* ---------- example data ---------- */

const NAV_LINKS = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Perguntas frequentes", href: "#perguntas-frequentes" },
];

const TODAY_SCHEDULE = [
  {
    time: "09:00",
    address: "Rua Oscar Freire, 980 — Jardins",
    agent: "Marina Rocha",
    status: { tone: "success" as const, text: "Confirmada" },
  },
  {
    time: "11:30",
    address: "Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi",
    agent: "Tiago Lemes",
    status: { tone: "warning" as const, text: "Pendente" },
  },
  {
    time: "15:00",
    address: "Rua Fradique Coutinho, 1200 — Pinheiros",
    agent: "Carla Simões",
    status: { tone: "brand" as const, text: "Nova" },
  },
];

const STEPS = [
  {
    title: "Cadastre os imóveis",
    text: "Adicione fotos, endereço, valor, metragem e o corretor responsável por cada imóvel do portfólio.",
  },
  {
    title: "Compartilhe o link",
    text: "Cada imóvel ganha um link público. Envie no WhatsApp, cole no anúncio do portal ou no material impresso.",
  },
  {
    title: "Receba as visitas na agenda",
    text: "O cliente escolhe um horário livre e informa o contato. A visita entra na agenda do corretor, já com nome e telefone.",
  },
];

const ICONS: Record<string, string[]> = {
  schedule: [
    "M18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5Z",
    "M4 10H20M8 3V7M16 3V7",
  ],
  link: [
    "M10 13C10.9346 13.9161 12.1912 14.4293 13.5 14.4293C14.8088 14.4293 16.0654 13.9161 17 13L19 11C19.7221 10.0371 20.0727 8.8461 19.9874 7.64556C19.9021 6.44501 19.3866 5.31552 18.5355 4.46447C17.6845 3.61341 16.555 3.0979 15.3544 3.01258C14.1539 2.92726 12.9629 3.27785 12 4L11 5",
    "M14 11C13.0654 10.0839 11.8088 9.57071 10.5 9.57071C9.19124 9.57071 7.93464 10.0839 7 11L5 13C4.27785 13.9629 3.92726 15.1539 4.01258 16.3544C4.0979 17.555 4.61341 18.6845 5.46447 19.5355C6.31552 20.3866 7.44501 20.9021 8.64555 20.9874C9.8461 21.0727 11.0371 20.7221 12 20L13 19",
  ],
  confirmation: [
    "M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z",
    "M8.5 12.5L11 15L15.5 9.5",
  ],
  contact: [
    "M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z",
    "M4.5 20C4.5 18.0109 5.29018 16.1032 6.6967 14.6967C8.10322 13.2902 10.0109 12.5 12 12.5C13.9891 12.5 15.8968 13.2902 17.3033 14.6967C18.7098 16.1032 19.5 18.0109 19.5 20",
  ],
  limit: ["M6 20V11M12 20V4M18 20V14"],
  browser: [
    "M19 4H5C3.89543 4 3 4.89543 3 6V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15V6C21 4.89543 20.1046 4 19 4Z",
    "M8 21H16M12 17V21",
  ],
};

const BENEFITS = [
  {
    icon: "schedule",
    title: "Agenda sem conflito",
    text: "Cada visita entra no horário certo, no calendário do corretor certo. Sem dupla marcação.",
  },
  {
    icon: "link",
    title: "Um link por imóvel",
    text: "Compartilhe no WhatsApp, nos portais e nos anúncios. O cliente agenda sem falar com ninguém.",
  },
  {
    icon: "confirmation",
    title: "Menos visita furada",
    text: "O cliente escolhe o horário e recebe a confirmação na hora. Lembrete automático por e-mail.",
  },
  {
    icon: "contact",
    title: "Contato dos interessados",
    text: "Nome, e-mail e telefone de todo mundo que agenda. A imobiliária acompanha a demanda de cada imóvel.",
  },
  {
    icon: "limit",
    title: "Limite do plano na tela",
    text: "Veja quantos corretores ainda cabem antes de precisar subir de faixa. Sem surpresa na fatura.",
  },
  {
    icon: "browser",
    title: "Funciona no navegador",
    text: "Nada para instalar. Abre no computador da imobiliária e no celular do corretor.",
  },
];

const PLANS = [
  {
    name: "Essencial",
    price: "R$ 149",
    period: "/mês",
    tier: "até 10 corretores",
    items: [
      "Imóveis ilimitados",
      "1 link público por imóvel",
      "Agenda por corretor",
      "Contatos de quem agenda",
      "Suporte por e-mail",
    ],
    cta: "Assinar Essencial",
    highlight: false,
  },
  {
    name: "Profissional",
    badge: "Mais popular",
    price: "R$ 279",
    period: "/mês",
    tier: "até 20 corretores",
    items: [
      "Tudo do Essencial",
      "Página do imóvel personalizada",
      "Lembrete automático de visita",
      "Relatório de visitas por imóvel",
      "Suporte prioritário",
    ],
    cta: "Assinar Profissional",
    highlight: true,
  },
  {
    name: "Avançado",
    price: "R$ 549",
    period: "/mês",
    tier: "até 50 corretores",
    items: [
      "Tudo do Profissional",
      "Vários administradores",
      "Exportação de dados (CSV)",
      "Marca da imobiliária na página",
      "Gerente de conta",
    ],
    cta: "Assinar Avançado",
    highlight: false,
  },
  {
    name: "Sob consulta",
    price: "Vamos conversar",
    period: "",
    tier: "acima de 50 corretores",
    items: [
      "Faixa de corretores personalizada",
      "Onboarding assistido",
      "Contrato e NF sob medida",
      "SLA de atendimento",
      "Integração com o CRM",
    ],
    cta: "Falar com vendas",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Antes a gente perdia visita porque a mensagem sumia no meio de 200 conversas no WhatsApp. Agora o cliente agenda sozinho e o corretor só aparece no horário certo.",
    name: "Marina Rocha",
    role: "Sócia · Âncora Imóveis — São Paulo, SP",
  },
  {
    quote:
      "Colocamos o link do VisitaJá em todo anúncio do portal. A visita já entra com nome e telefone, e a gente enxerga qual imóvel tem mais procura.",
    name: "Tiago Lemes",
    role: "Gerente comercial · Imobiliária Portinari — Porto Alegre, RS",
  },
  {
    quote:
      "São 34 corretores e a agenda de todos numa tela só. O plano Avançado se pagou no primeiro mês.",
    name: "Carla Simões",
    role: "Diretora · Vila Nova Imóveis — Campinas, SP",
  },
];

const FAQ = [
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. O VisitaJá funciona no navegador, tanto no computador da imobiliária quanto no celular do corretor.",
  },
  {
    question: "O cliente precisa criar conta para agendar?",
    answer:
      "Não. Ele abre o link do imóvel, escolhe um horário livre e informa nome, e-mail e telefone. Sem cadastro e sem app.",
  },
  {
    question: "Como funciona o limite de corretores?",
    answer:
      "Cada plano cobre uma faixa de corretores ativos. Ao se aproximar do limite, a tela avisa e você pode subir de plano quando quiser.",
  },
  {
    question: "Vocês cobram por visita agendada?",
    answer:
      "Não. O valor é fixo por faixa de corretores — visitas ilimitadas em todos os planos.",
  },
  {
    question: "Posso trocar ou cancelar o plano depois?",
    answer:
      "Sim. A troca vale na próxima fatura e o cancelamento pode ser feito a qualquer momento, sem multa.",
  },
  {
    question: "Dá para usar a marca da imobiliária na página do imóvel?",
    answer:
      "Sim. A partir do plano Avançado a página do imóvel exibe o logo e as cores da imobiliária.",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "PRODUTO",
    links: ["Como funciona", "Planos", "Página do imóvel", "Novidades"],
  },
  { title: "EMPRESA", links: ["Sobre", "Contato", "Trabalhe conosco"] },
  {
    title: "AJUDA",
    links: ["Central de ajuda", "Falar com vendas", "Status do sistema"],
  },
];

/* ---------- local helpers ---------- */

function StrokeIcon({
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

function Section({
  id,
  background,
  children,
}: {
  id?: string;
  background: "surface" | "canvas";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`appear ${background === "surface" ? "bg-surface" : "bg-canvas"} px-6 py-16 lg:px-16 lg:py-24`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${centered ? "items-center text-center" : "items-start"}`}
    >
      <span className="text-label-s text-content-brand">{eyebrow}</span>
      <h2 className="font-display text-title-l text-content lg:text-title-xl">
        {title}
      </h2>
      {text ? (
        <p className="max-w-2xl text-body-l text-content-muted">{text}</p>
      ) : null}
    </div>
  );
}

function PlanItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-body-s text-content-muted">
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
      <span>{text}</span>
    </li>
  );
}

/* ---------- page ---------- */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-border-subtle bg-surface">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4 lg:px-16">
          <BrandLogoLink className="font-display text-title-m" />
          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-label-m text-content-muted transition-colors hover:text-content"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="ghost"
              href="/login"
              className="hidden sm:inline-flex"
            >
              Entrar
            </Button>
            <Button variant="primary" href="/assinatura/escolher-plano">
              Assinar agora
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex flex-col">
        {/* Hero */}
        <section className="appear bg-canvas px-6 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col items-start gap-6">
              <Badge tone="brand">Agenda de visitas para imobiliárias</Badge>
              <h1 className="font-display text-display-l text-content lg:text-display-xl">
                Pare de marcar visita de imóvel pelo WhatsApp
              </h1>
              <p className="text-body-l text-content-muted">
                O VisitaJá gera um link de agendamento para cada imóvel. O
                cliente escolhe um horário livre, informa o contato, e a visita
                cai direto na agenda do corretor responsável.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" href="/assinatura/escolher-plano">
                  Assinar agora
                </Button>
                <Button variant="secondary" href="#como-funciona">
                  Ver como funciona
                </Button>
              </div>
              <p className="text-body-s text-content-subtle">
                Sem cartão para testar · 14 dias grátis · Cancele quando quiser
              </p>
            </div>

            <Card className="w-full shrink-0 gap-4 lg:w-130">
              <div className="flex w-full items-center gap-2">
                <span className="flex-1 font-display text-title-s text-content">
                  Agenda de hoje
                </span>
                <span className="text-body-s text-content-subtle">
                  Terça, 9 set
                </span>
              </div>
              {TODAY_SCHEDULE.map((visit) => (
                <div
                  key={visit.time}
                  className="flex w-full items-center gap-3 rounded-md bg-canvas p-3"
                >
                  <Avatar name={visit.agent} size="m" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-body-s">
                    <span className="font-semibold text-content">
                      {visit.time}
                    </span>
                    <span className="text-content-subtle">
                      {visit.address}
                    </span>
                  </div>
                  <Badge tone={visit.status.tone}>{visit.status.text}</Badge>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* How it works */}
        <Section id="como-funciona" background="surface">
          <SectionHeader
            eyebrow="COMO FUNCIONA"
            title="Três passos para nunca mais perder uma visita"
            text="A imobiliária configura uma vez. Depois é só compartilhar o link de cada imóvel."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand font-display text-title-s text-on-brand">
                  {i + 1}
                </span>
                <h3 className="font-display text-title-m text-content">
                  {step.title}
                </h3>
                <p className="text-body-m text-content-muted">{step.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Benefits */}
        <Section background="canvas">
          <SectionHeader
            eyebrow="POR QUE VISITAJÁ"
            title="Tudo para organizar as visitas em um só lugar"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <Card key={benefit.title}>
                <span className="flex size-11 items-center justify-center rounded-md bg-brand-subtle text-content-brand">
                  <StrokeIcon paths={ICONS[benefit.icon]} />
                </span>
                <h3 className="font-display text-title-s text-content">
                  {benefit.title}
                </h3>
                <p className="text-body-s text-content-muted">
                  {benefit.text}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Plans */}
        <Section id="planos" background="surface">
          <SectionHeader
            eyebrow="PLANOS"
            title="Preço por faixa de corretores"
            text="Sem cobrança por visita. Escolha a faixa e troque de plano quando a equipe crescer."
            centered
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                emphasis={plan.highlight ? "highlight" : "default"}
                className="gap-4"
              >
                <div className="flex w-full items-center gap-2">
                  <span className="flex-1 font-display text-title-m text-content">
                    {plan.name}
                  </span>
                  {plan.badge ? <Badge tone="brand">{plan.badge}</Badge> : null}
                </div>
                <div className="flex items-end gap-0.5">
                  <span
                    className={`font-display text-content ${plan.period ? "text-display-l" : "text-title-l"}`}
                  >
                    {plan.price}
                  </span>
                  {plan.period ? (
                    <span className="text-body-s text-content-subtle">
                      {plan.period}
                    </span>
                  ) : null}
                </div>
                <span className="text-label-m text-content-brand">
                  {plan.tier}
                </span>
                <hr className="w-full border-border-subtle" />
                <ul className="flex w-full flex-col gap-2">
                  {plan.items.map((item) => (
                    <PlanItem key={item} text={item} />
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="mt-2 w-full"
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section id="depoimentos" background="canvas">
          <SectionHeader
            eyebrow="DEPOIMENTOS"
            title="Imobiliárias que pararam de marcar visita na mão"
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} className="gap-4">
                <p className="text-body-m text-content">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex w-full items-center gap-2">
                  <Avatar name={testimonial.name} size="m" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-body-s">
                    <span className="font-semibold text-content">
                      {testimonial.name}
                    </span>
                    <span className="text-content-subtle">{testimonial.role}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="perguntas-frequentes" background="surface">
          <h2 className="font-display text-title-l text-content lg:text-title-xl">
            Perguntas frequentes
          </h2>
          <div className="flex flex-col">
            {FAQ.map((item, i) => (
              <details
                key={item.question}
                open={i === 0}
                className="group border-b border-border-subtle py-4"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 font-display text-title-s text-content transition-colors hover:text-content-brand [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{item.question}</span>
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
                <p className="pt-2 text-body-m text-content-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <section className="appear bg-brand px-6 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="font-display text-title-l text-on-brand lg:text-title-xl">
              Comece a receber visitas pela agenda ainda esta semana
            </h2>
            <p className="text-body-l text-on-brand/85">
              Configure os imóveis, compartilhe o link e deixe o WhatsApp para
              conversar — não para marcar horário.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button variant="secondary" href="/assinatura/escolher-plano">
                Assinar agora
              </Button>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-on-brand px-6 py-3 text-label-m text-on-brand transition-colors hover:bg-on-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand focus-visible:outline-none"
              >
                Falar com vendas
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-16 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div className="flex flex-1 flex-col gap-2">
              <span className="font-display text-title-m">
                <span className="text-gray-0">Visita</span>
                <span className="text-purple-300">Já</span>
              </span>
              <p className="text-body-s text-gray-400">
                Agendamento de visitas a imóveis para imobiliárias.
              </p>
            </div>
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-2">
                <span className="text-label-s text-gray-400">
                  {column.title}
                </span>
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-body-s text-gray-300 transition-colors hover:text-gray-0"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <hr className="border-gray-800" />
          <div className="flex flex-col gap-2 text-body-s text-gray-400 md:flex-row md:items-center">
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
