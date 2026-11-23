import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CreditCard, Globe2, QrCode, Save, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { FormField, fieldClass } from "@/components/shared/FormField";
import { PendingButton } from "@/components/shared/PendingButton";
import { DevBadge } from "@/components/shared/DevBadge";
import { SelectField } from "@/components/forms/SelectField";
import { WEEKLY_MODEL } from "@/lib/domain/sales-cycle";
import { APP_CURRENCY, APP_LOCALE, APP_TIMEZONE } from "@/lib/format";
import { APP_STAGE, APP_VERSION } from "@/lib/app-info";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("configuracoes");

export const Route = createFileRoute("/configuracoes")({
  head: () => pageHead(mod.title, mod.description),
  component: SettingsPage,
});

const dayOptions = WEEKLY_MODEL.map((d) => ({ value: d.short.toLowerCase(), label: d.day }));

const PAYMENTS = [
  { label: "Pix", icon: QrCode },
  { label: "Dinheiro", icon: Banknote },
  { label: "Cartão", icon: CreditCard },
];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function SettingsPage() {
  return (
    <PageStack>
      <PageHeader title={mod.title} description={mod.description} icon={mod.icon} />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Dados do negócio"
          description="Nome e contato exibidos para os clientes."
          actions={<DevBadge />}
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <FormField id="biz-name" label="Nome do negócio">
              <Input id="biz-name" className={fieldClass} disabled />
            </FormField>
            <FormField id="biz-phone" label="Telefone de contato">
              <Input id="biz-phone" type="tel" placeholder="(00) 00000-0000" className={fieldClass} disabled />
            </FormField>
            <PendingButton type="submit" className="h-11 w-full sm:w-auto md:h-9">
              <Save aria-hidden />
              Salvar
            </PendingButton>
          </form>
        </SectionCard>

        <SectionCard
          title="Ciclo de vendas"
          description="Dias e horário padrão de cada semana."
          actions={<DevBadge />}
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="cycle-open" label="Abertura das vendas">
                <SelectField id="cycle-open" placeholder="Não definido" options={dayOptions} disabled />
              </FormField>
              <FormField id="cycle-open-time" label="Horário de abertura">
                <Input id="cycle-open-time" type="time" className={fieldClass} disabled />
              </FormField>
              <FormField id="cycle-close" label="Encerramento das vendas">
                <SelectField id="cycle-close" placeholder="Não definido" options={dayOptions} disabled />
              </FormField>
              <FormField id="cycle-close-time" label="Horário de encerramento">
                <Input id="cycle-close-time" type="time" className={fieldClass} disabled />
              </FormField>
              <FormField id="cycle-delivery" label="Dia de entrega" className="sm:col-span-2">
                <SelectField id="cycle-delivery" placeholder="Não definido" options={dayOptions} disabled />
              </FormField>
            </div>
            <PendingButton type="submit" className="h-11 w-full sm:w-auto md:h-9">
              <Save aria-hidden />
              Salvar ciclo
            </PendingButton>
          </form>
        </SectionCard>

        <SectionCard title="Formas de pagamento" description="Aceitas pelo negócio.">
          <ul className="flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <li key={p.label}>
                <Badge variant="primary" className="px-3 py-1 text-sm">
                  <p.icon aria-hidden />
                  {p.label}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Região e sistema" description="Padrões fixos desta instalação.">
          <dl className="divide-y divide-border">
            <InfoRow label="Idioma" value={`Português do Brasil (${APP_LOCALE})`} />
            <InfoRow label="Moeda" value={`Real brasileiro (${APP_CURRENCY})`} />
            <InfoRow label="Fuso horário" value={APP_TIMEZONE} />
            <InfoRow label="Versão" value={`v${APP_VERSION} · ${APP_STAGE}`} />
          </dl>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Globe2 className="size-4" aria-hidden />
            Datas e valores são sempre exibidos no horário de Brasília e em reais.
          </p>
        </SectionCard>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Store className="size-4" aria-hidden />
        As configurações serão salvas quando o banco de dados for conectado.
      </p>
    </PageStack>
  );
}
