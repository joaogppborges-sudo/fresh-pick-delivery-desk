import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileNav } from "@/components/layout/MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-background">
        <AppHeader />
        <main className="pb-mobile-nav mx-auto w-full max-w-7xl flex-1 px-4 pt-5 md:px-8 md:pt-8">
          {children}
        </main>
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}

/** Espaçamento vertical padrão do conteúdo de cada tela. */
export function PageStack({ children }: { children: ReactNode }) {
  return <div className="space-y-6 md:space-y-8">{children}</div>;
}
