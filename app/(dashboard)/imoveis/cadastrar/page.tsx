import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import FormField from "@/app/components/FormField";
import SelectField from "@/app/components/SelectField";
import Sidebar from "@/app/components/Sidebar";
import RequireAuth from "@/lib/auth/RequireAuth";

export const metadata: Metadata = {
  title: "Cadastrar imóvel · VisitaJá",
};

function UploadIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden className={className}>
      <path
        d="M14 18.6667V4.66667M19.8333 10.5L14 4.66667L8.16667 10.5"
        stroke="currentColor"
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66667 18.6667V22.1667C4.66667 22.4761 4.78958 22.7728 5.00838 22.9916C5.22717 23.2104 5.52391 23.3333 5.83333 23.3333H22.1667C22.4761 23.3333 22.7728 23.2104 22.9916 22.9916C23.2104 22.7728 23.3333 22.4761 23.3333 22.1667V18.6667"
        stroke="currentColor"
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PROPERTY_TYPES = ["Apartamento", "Casa", "Cobertura", "Studio", "Terreno"];
const OPERATIONS = ["Venda", "Aluguel", "Temporada"];

const PHOTOS = [
  { gradient: "from-purple-400 to-purple-600", cover: true },
  { gradient: "from-coral-400 to-pink-600", cover: false },
  { gradient: "from-green-500 to-purple-500", cover: false },
  { gradient: "from-purple-500 to-pink-600", cover: false },
];

const AGENTS = [
  { name: "Marina Rocha", properties: 12 },
  { name: "Rafael Nunes", properties: 9 },
  { name: "Juliana Prado", properties: 7 },
  { name: "Camila Duarte", properties: 6 },
  { name: "Diego Ramos", properties: 5 },
  { name: "Fernanda Alves", properties: 4 },
  { name: "Bruno Machado", properties: 3 },
];

const AGENT_OPTIONS = AGENTS.map(
  (agent) => `${agent.name} — ${agent.properties} imóveis ativos`,
);

export default function NewPropertyPage() {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="properties" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-body-s text-content-subtle">
                <Link
                  href="/imoveis"
                  className="transition-colors hover:text-content"
                >
                  Imóveis
                </Link>{" "}
                › Novo imóvel
              </p>
              <h1 className="font-display text-title-l text-content">
                Cadastrar imóvel
              </h1>
            </div>
            <Button variant="ghost" href="/imoveis">
              Cancelar
            </Button>
            <Button variant="primary">Salvar imóvel</Button>
          </header>

          <main className="flex flex-1 flex-col items-center gap-6 p-8">
            <div className="flex w-full max-w-215 flex-col gap-6">
              <Card className="w-full">
                <span className="font-display text-title-s text-content">
                  Fotos do imóvel
                </span>

                <label className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border-[1.5px] border-dashed border-border-brand bg-brand-subtle p-8 text-center transition-colors hover:bg-purple-100">
                  <input type="file" accept="image/png,image/jpeg" multiple className="sr-only" />
                  <span className="text-content-brand">
                    <UploadIcon />
                  </span>
                  <span className="text-label-m text-content">
                    Arraste as fotos aqui ou clique para enviar
                  </span>
                  <span className="text-body-s text-content-subtle">
                    JPG ou PNG até 5 MB cada · a primeira foto vira a capa
                  </span>
                </label>

                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
                  {PHOTOS.map((photo, index) => (
                    <div
                      key={index}
                      className={`h-27.5 w-full rounded-sm bg-gradient-to-br ${photo.gradient} ${
                        photo.cover ? "flex items-start p-1" : ""
                      }`}
                    >
                      {photo.cover ? <Badge tone="brand">Capa</Badge> : null}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="w-full">
                <span className="font-display text-title-s text-content">
                  Corretor responsável
                </span>

                <SelectField
                  id="property-agent"
                  label="Quem cuida das visitas deste imóvel"
                  options={AGENT_OPTIONS}
                  defaultValue={AGENT_OPTIONS[1]}
                />

                <p className="text-body-s text-content-subtle">
                  O link público do imóvel envia as visitas direto para a
                  agenda deste corretor.
                </p>
              </Card>

              <Card className="w-full">
                <span className="font-display text-title-s text-content">
                  Detalhes e valor
                </span>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                  <SelectField
                    id="property-type"
                    label="Tipo"
                    options={PROPERTY_TYPES}
                    defaultValue="Apartamento"
                  />
                  <SelectField
                    id="property-operation"
                    label="Operação"
                    options={OPERATIONS}
                    defaultValue="Venda"
                  />
                  <FormField
                    id="property-price"
                    label="Valor"
                    helperText=""
                    defaultValue="R$ 1.150.000"
                  />
                </div>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                  <FormField
                    id="property-area"
                    label="Metragem (m²)"
                    helperText=""
                    defaultValue="98"
                  />
                  <FormField
                    id="property-bedrooms"
                    label="Dormitórios"
                    helperText=""
                    defaultValue="3"
                  />
                  <FormField
                    id="property-spots"
                    label="Vagas"
                    helperText=""
                    defaultValue="2"
                  />
                </div>
              </Card>

              <Card className="w-full">
                <span className="font-display text-title-s text-content">
                  Endereço
                </span>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    id="property-zip"
                    label="CEP"
                    helperText=""
                    defaultValue="01426-001"
                  />
                  <FormField
                    id="property-street"
                    label="Rua / Avenida"
                    helperText=""
                    defaultValue="Rua Oscar Freire"
                  />
                </div>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                  <FormField
                    id="property-number"
                    label="Número"
                    helperText=""
                    defaultValue="980"
                  />
                  <FormField
                    id="property-complement"
                    label="Complemento"
                    helperText=""
                    defaultValue="Apto 121"
                  />
                  <FormField
                    id="property-neighborhood"
                    label="Bairro"
                    helperText=""
                    defaultValue="Jardins"
                  />
                </div>

                <FormField
                  id="property-city"
                  label="Cidade / UF"
                  helperText=""
                  defaultValue="São Paulo / SP"
                />
              </Card>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
