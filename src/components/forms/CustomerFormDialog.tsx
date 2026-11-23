import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, fieldClass } from "@/components/shared/FormField";
import { PreviewFormDialog } from "@/components/shared/PreviewFormDialog";

export function CustomerFormDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <PreviewFormDialog
      trigger={trigger}
      title="Cadastrar cliente"
      description="Dados de contato e endereço de entrega."
      submitLabel="Salvar cliente"
    >
      <FormField id="customer-name" label="Nome completo" required>
        <Input id="customer-name" className={fieldClass} autoComplete="name" />
      </FormField>
      <FormField
        id="customer-phone"
        label="Telefone (WhatsApp)"
        required
        hint="Será usado para o acesso do cliente com código de confirmação."
      >
        <Input
          id="customer-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          className={fieldClass}
          aria-describedby="customer-phone-hint"
        />
      </FormField>
      <FormField id="customer-address" label="Endereço" required>
        <Input
          id="customer-address"
          className={fieldClass}
          autoComplete="street-address"
          placeholder="Rua, número"
        />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="customer-neighborhood" label="Bairro" required>
          <Input id="customer-neighborhood" className={fieldClass} />
        </FormField>
        <FormField id="customer-complement" label="Complemento">
          <Input id="customer-complement" className={fieldClass} />
        </FormField>
      </div>
      <FormField id="customer-reference" label="Ponto de referência">
        <Input id="customer-reference" className={fieldClass} />
      </FormField>
      <FormField id="customer-notes" label="Observações">
        <Textarea id="customer-notes" rows={3} />
      </FormField>
    </PreviewFormDialog>
  );
}
