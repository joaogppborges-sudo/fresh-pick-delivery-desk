import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Link2, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("whatsapp");

export const Route = createFileRoute("/whatsapp")({
  head: () => pageHead(mod.title, mod.description),
  component: WhatsappPage,
});

const NOTIFICATIONS = [
  { id: "abertura", title: "Abertura das vendas", description: "Avisar os clientes quando o ciclo abrir." },
  { id: "encerramento", title: "Lembrete de encerramento", description: "Lembrar antes do horário de fechamento." },
  { id: "confirmacao", title: "Confirmação do pedido", description: "Enviar o resumo do pedido ao cliente." },
  { id: "saida", title: "Saída para entrega", description: "Avisar quando o pedido estiver a caminho." },
];

function WhatsappPage() {
  return (
    <PageStack>
      <PageHeader title={mod.title} description={mod.description} icon={mod.icon} />

      <SectionCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <MessageCircle className="size-6" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">WhatsApp do negócio</h2>
              <Badge variant="neutral">Não conectado</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma conta de WhatsApp está vinculada ao painel.
            </p>
          </div>
          <PendingButton className="h-11 md:h-9">
            <Link2 aria-hidden />
            Conectar
          </PendingButton>
        </div>
      </SectionCard>

      <SectionCard
        title="Notificações automáticas"
        description="Disponíveis após a conexão com o WhatsApp."
      >
        <ul className="divide-y divide-border">
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <BellRing className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <Label htmlFor={`notif-${n.id}`} className="font-medium text-foreground">
                    {n.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">{n.description}</p>
                </div>
              </div>
              <Switch id={`notif-${n.id}`} disabled aria-describedby="notif-hint" />
            </li>
          ))}
        </ul>
        <p id="notif-hint" className="sr-only">
          Em desenvolvimento
        </p>
      </SectionCard>

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
