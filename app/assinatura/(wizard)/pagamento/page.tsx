import type { Metadata } from "next";
import Card from "@/app/components/Card";
import FormField from "@/app/components/FormField";
import OrderSummary from "../../OrderSummary";
import PayButton from "./PayButton";

export const metadata: Metadata = {
  title: "Pagamento · VisitaJá",
};

export default function PaymentPage() {
  return (
    <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
      <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-display text-title-l text-content">
            Pagamento
          </h1>
          <p className="text-body-m text-content-muted">
            Cartão de crédito. A cobrança se repete todo dia 9.
          </p>
        </div>

        <Card className="w-full">
          <FormField
            id="card-number"
            label="Número do cartão"
            defaultValue="4539 8842 1057 3391"
            helperText="Bandeira identificada: Visa"
          />
          <FormField
            id="card-name"
            label="Nome impresso no cartão"
            defaultValue="MARINA ROCHA"
            helperText=""
          />
          <div className="flex w-full gap-3">
            <FormField
              id="card-expiry"
              label="Validade"
              defaultValue="09/29"
              helperText=""
              className="flex-1"
            />
            <FormField
              id="card-cvv"
              label="CVV"
              type="password"
              defaultValue="123"
              helperText=""
              className="flex-1"
            />
          </div>
          <FormField
            id="card-document"
            label="CNPJ do titular"
            defaultValue="51.482.377/0001-09"
            helperText=""
          />

          <div className="flex items-center gap-2">
            <input
              id="accept-terms"
              type="checkbox"
              defaultChecked
              className="size-4.5 cursor-pointer rounded-xs accent-brand"
            />
            <label
              htmlFor="accept-terms"
              className="cursor-pointer text-body-s text-content-muted"
            >
              Li e aceito os Termos de uso e a Política de privacidade
            </label>
          </div>
        </Card>

        <div className="flex flex-col items-start gap-2">
          <PayButton />
          <p className="text-body-s text-content-subtle">
            Pagamento processado com criptografia. Não guardamos o número do
            cartão.
          </p>
        </div>
      </div>

      <OrderSummary note="Impostos inclusos. Recibo enviado por e-mail." />
    </div>
  );
}
