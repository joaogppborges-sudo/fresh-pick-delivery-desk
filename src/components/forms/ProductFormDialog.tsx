import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormField, fieldClass } from "@/components/shared/FormField";
import { PreviewFormDialog } from "@/components/shared/PreviewFormDialog";
import { SelectField } from "@/components/forms/SelectField";
import { PRODUCT_CATEGORIES, toOptions } from "@/lib/domain/status";

/** Unidades de venda sugeridas; a lista definitiva será configurável. */
const UNIT_OPTIONS = [
  { value: "unidade", label: "Unidade" },
  { value: "maco", label: "Maço" },
  { value: "kg", label: "Quilo (kg)" },
  { value: "bandeja", label: "Bandeja" },
];

export function ProductFormDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <PreviewFormDialog
      trigger={trigger}
      title="Cadastrar produto"
      description="Verdura, legume ou hortaliça disponível para venda."
      submitLabel="Salvar produto"
    >
      <FormField id="product-name" label="Nome do produto" required>
        <Input id="product-name" className={fieldClass} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="product-category" label="Categoria" required>
          <SelectField
            id="product-category"
            placeholder="Selecione"
            options={toOptions(PRODUCT_CATEGORIES)}
          />
        </FormField>
        <FormField id="product-unit" label="Unidade de venda" required>
          <SelectField id="product-unit" placeholder="Selecione" options={UNIT_OPTIONS} />
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="product-price" label="Preço (R$)" required>
          <Input
            id="product-price"
            inputMode="decimal"
            placeholder="0,00"
            className={fieldClass}
          />
        </FormField>
        <FormField id="product-stock" label="Estoque disponível">
          <Input id="product-stock" inputMode="numeric" placeholder="0" className={fieldClass} />
        </FormField>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
        <div>
          <Label htmlFor="product-active" className="font-medium">
            Disponível para venda
          </Label>
          <p className="text-xs text-muted-foreground">Exibir no próximo ciclo de vendas.</p>
        </div>
        <Switch id="product-active" defaultChecked />
      </div>
    </PreviewFormDialog>
  );
}
