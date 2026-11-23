import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string | undefined;
  icon?: LucideIcon | undefined;
  actions?: ReactNode;
};

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="mt-0.5 hidden size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary sm:flex">
            <Icon className="size-5" aria-hidden />
          </div>
        ) : null}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? (
        <div className="flex flex-wrap gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">{actions}</div>
      ) : null}
    </div>
  );
}
