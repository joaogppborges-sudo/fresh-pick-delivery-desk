import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type Column<T> = {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  /** Coluna usada como título do cartão no celular. */
  primary?: boolean;
  align?: "left" | "right";
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  empty: ReactNode;
  caption?: string;
};

/**
 * Tabela responsiva: tabela tradicional a partir do tablet e lista de cartões no celular.
 */
export function DataTable<T>({ columns, rows, getRowId, empty, caption }: DataTableProps<T>) {
  const primary = columns.find((c) => c.primary) ?? columns[0];
  const secondary = columns.filter((c) => c !== primary);

  return (
    <>
      <div className="surface hidden overflow-hidden md:block">
        <Table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader>
            <TableRow className="bg-muted/60 hover:bg-muted/60">
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    "h-11 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    col.align === "right" && "text-right",
                    col.className,
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-4">
                  {empty}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={getRowId(row)}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      className={cn(col.align === "right" && "text-right", col.className)}
                    >
                      {col.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        {rows.length === 0 ? (
          empty
        ) : (
          <ul className="space-y-3" aria-label={caption}>
            {rows.map((row) => (
              <li key={getRowId(row)} className="surface p-4">
                {primary ? (
                  <div className="font-semibold text-foreground">{primary.cell(row)}</div>
                ) : null}
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {secondary.map((col) => (
                    <div key={col.id} className="min-w-0">
                      <dt className="text-xs text-muted-foreground">{col.header}</dt>
                      <dd className="truncate text-foreground">{col.cell(row)}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
