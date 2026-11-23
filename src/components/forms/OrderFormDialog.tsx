import type { ReactNode } from "react";
import { Carrot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/shared/FormField";
import { EmptyState } from "@/components/shared/EmptyState";
import { PreviewFormDialog } from "@/components/shared/PreviewFormDialog";
import { SelectField } from "@/components/forms/SelectField";
import { PAYMENT_METHODS, toOptions } from "@/lib/domain/status";

export function OrderFormDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <PreviewFormDialog
      trigger={trigger}
      title="Novo pedido"
      description="Registrar um pedido para a próxima entrega."
      submitLabel="Salvar pedido"
    >
      <FormField
        id="order-customer"
        label="Cliente"
        required
        hint="Nenhum cliente cadastrado ainda."
      >
        <SelectField id="order-customer" placeholder="Selecione o cliente" options={[]} disabled />
      </FormField>
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">Itens do pedido</p>
        <EmptyState
          compact
          icon={Carrot}
          title="Nenhum produto cadastrado"
          description="Os itens poderão ser adicionados após o cadastro de produtos."
        />
      </div>
      <FormField id="order-payment" label="Forma de pagamento" required>
        <SelectField
          id="order-payment"
          placeholder="Selecione"
          options={toOptions(PAYMENT_METHODS)}
        />
      </FormField>
      <FormField id="order-notes" label="Observações">
        <Textarea id="order-notes" rows={3} placeholder="Ex.: deixar na portaria" />
      </FormField>
    </PreviewFormDialog>
  );
}
