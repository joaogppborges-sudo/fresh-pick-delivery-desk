import { createFileRoute } from "@tanstack/react-router";
import { Carrot, PackageOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { ProductFormDialog } from "@/components/forms/ProductFormDialog";
import { PRODUCT_CATEGORIES, toOptions } from "@/lib/domain/status";
import type { ProductRow } from "@/lib/domain/types";
import { formatCurrency } from "@/lib/format";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("produtos");

export const Route = createFileRoute("/produtos")({
  head: () => pageHead(mod.title, mod.description),
  component: ProductsPage,
});

const productColumns: Column<ProductRow>[] = [
  { id: "name", header: "Produto", cell: (r) => r.name, primary: true },
  { id: "category", header: "Categoria", cell: (r) => PRODUCT_CATEGORIES[r.category] },
  { id: "unit", header: "Unidade", cell: (r) => r.unit },
  { id: "price", header: "Preço", cell: (r) => formatCurrency(r.price), align: "right" },
  {
    id: "active",
    header: "Venda",
    cell: (r) => (
      <Badge variant={r.active ? "success" : "neutral"}>{r.active ? "Disponível" : "Pausado"}</Badge>
    ),
  },
];

const stockColumns: Column<ProductRow>[] = [
  { id: "name", header: "Produto", cell: (r) => r.name, primary: true },
  { id: "unit", header: "Unidade", cell: (r) => r.unit },
  { id: "stock", header: "Em estoque", cell: (r) => r.stock, align: "right" },
];

function ProductsPage() {
  const rows: ProductRow[] = [];
  const newProduct = (
    <ProductFormDialog
      trigger={
        <Button className="h-11 md:h-9">
          <Plus aria-hidden />
          Cadastrar produto
        </Button>
      }
    />
  );

  return (
    <PageStack>
      <PageHeader title={mod.title} description={mod.description} icon={mod.icon} actions={newProduct} />

      <Tabs defaultValue="produtos" className="space-y-4">
        <TabsList className="h-11 w-full sm:w-auto">
          <TabsTrigger value="produtos" className="h-9 flex-1 px-4">
            Produtos
          </TabsTrigger>
          <TabsTrigger value="estoque" className="h-9 flex-1 px-4">
            Estoque
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produtos" className="space-y-4">
          <FilterBar
            searchPlaceholder="Buscar produto"
            filters={[{ id: "category", label: "Categoria", options: toOptions(PRODUCT_CATEGORIES) }]}
            disabled={rows.length === 0}
          />
          <DataTable
            caption="Lista de produtos"
            columns={productColumns}
            rows={rows}
            getRowId={(r) => r.id}
            empty={
              <EmptyState
                icon={Carrot}
                title="Nenhum produto cadastrado"
                description="Cadastre verduras, legumes e hortaliças com preço e unidade de venda."
                action={newProduct}
              />
            }
          />
        </TabsContent>

        <TabsContent value="estoque">
          <DataTable
            caption="Estoque de produtos"
            columns={stockColumns}
            rows={rows}
            getRowId={(r) => r.id}
            empty={
              <EmptyState
                icon={PackageOpen}
                title="Sem estoque para exibir"
                description="O estoque é controlado a partir dos produtos cadastrados."
              />
            }
          />
        </TabsContent>
      </Tabs>

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
