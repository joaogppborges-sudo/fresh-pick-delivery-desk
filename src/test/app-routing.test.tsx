import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { MODULES } from "@/lib/modules";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("has the 12 admin modules", () => {
    expect(MODULES).toHaveLength(12);
  });

  it.each(MODULES.map((m) => m.path))("has a page for %s", (path) => {
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).toBe(path);
  });
});
