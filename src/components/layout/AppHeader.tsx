import { useRouterState } from "@tanstack/react-router";
import { DatabaseZap } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { findModuleByPath } from "@/lib/modules";
import { APP_NAME } from "@/lib/app-info";

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = findModuleByPath(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur md:h-16 md:px-6">
      <SidebarTrigger className="size-10 md:size-9" />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground md:text-base">
        {current?.title ?? APP_NAME}
      </p>
      <Badge variant="neutral" className="hidden font-medium sm:inline-flex">
        <DatabaseZap aria-hidden />
        Dados não conectados
      </Badge>
    </header>
  );
}
