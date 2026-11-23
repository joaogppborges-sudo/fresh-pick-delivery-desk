import { Sprout } from "lucide-react";
import { APP_NAME } from "@/lib/app-info";

export function BrandMark({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <Sprout className="size-5" aria-hidden />
      </div>
      {showText ? (
        <div className="min-w-0 leading-tight">
          <p className="truncate font-display text-base font-semibold text-sidebar-foreground">
            {APP_NAME}
          </p>
          <p className="truncate text-xs text-sidebar-muted">Painel administrativo</p>
        </div>
      ) : null}
    </div>
  );
}
