import { APP_NAME } from "@/lib/app-info";

/** Metadados de página padronizados para cada rota do painel. */
export function pageHead(title: string, description: string) {
  const fullTitle = `${title} · ${APP_NAME}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
