import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import FormField from "@/app/components/FormField";
import OrderSummary from "../../OrderSummary";

export const metadata: Metadata = {
  title: "Dados da imobiliária · VisitaJá",
};

export default function CompanyDetailsPage() {
  return (
    <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
      <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-display text-title-l text-content">
            Dados da imobiliária
          </h1>
          <p className="text-body-m text-content-muted">
            Usamos essas informações para emitir a nota fiscal e liberar o
            painel.
          </p>
        </div>

        <Card className="w-full">
          <FormField
            id="company-name"
            label="Nome da imobiliária"
            defaultValue="Âncora Imóveis Ltda"
            helperText="Como aparece no contrato social"
          />
          <FormField
            id="company-cnpj"
            label="CNPJ"
            defaultValue="51.482.377/0001-09"
            helperText="Somente a matriz"
          />
          <FormField
            id="account-owner"
            label="Responsável pela conta"
            defaultValue="Marina Rocha"
            helperText="Quem administra corretores e imóveis"
          />
          <FormField
            id="account-email"
            type="email"
            label="E-mail de acesso"
            defaultValue="marina@ancoraimoveis.com.br"
            helperText="Enviamos o primeiro acesso e os avisos de visita aqui"
          />
        </Card>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" href="/assinatura/pagamento">
            Ir para o pagamento
          </Button>
          <Link
            href="/assinatura/escolher-plano"
            className="text-label-m text-content-muted transition-colors hover:text-content"
          >
            Voltar para os planos
          </Link>
        </div>
      </div>

      <OrderSummary />
    </div>
  );
}
