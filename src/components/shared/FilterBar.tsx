import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterDef = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

export type FilterValues = { search: string } & Record<string, string>;

type FilterBarProps = {
  searchPlaceholder: string;
  filters?: FilterDef[];
  onChange?: (values: FilterValues) => void;
  /** Desabilita os filtros quando ainda não há registros para filtrar. */
  disabled?: boolean;
  disabledHint?: string;
};

const ALL = "__all__";

export function FilterBar({
  searchPlaceholder,
  filters = [],
  onChange,
  disabled = false,
  disabledHint = "Os filtros ficam disponíveis quando houver registros.",
}: FilterBarProps) {
  const [values, setValues] = useState<FilterValues>({ search: "" });

  const update = (key: string, value: string) => {
    const next = { ...values, [key]: value } as FilterValues;
    setValues(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <div className="relative flex-1 sm:min-w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={values.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            disabled={disabled}
            className="h-11 bg-card pl-9 md:h-10"
          />
        </div>
        {filters.map((filter) => (
          <Select
            key={filter.id}
            value={values[filter.id] ?? ALL}
            onValueChange={(v) => update(filter.id, v === ALL ? "" : v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-11 bg-card sm:w-48 md:h-10" aria-label={filter.label}>
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>{filter.label}: todos</SelectItem>
              {filter.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
      {disabled ? <p className="text-xs text-muted-foreground">{disabledHint}</p> : null}
    </div>
  );
}
