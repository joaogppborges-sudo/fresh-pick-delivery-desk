import { describe, expect, it } from "vitest";
import { APP_TIMEZONE, formatCurrency, formatDate } from "@/lib/format";

const normalize = (s: string) => s.replace(/\s/g, " ");

describe("regional formatting", () => {
  it("formats money in Brazilian reais", () => {
    expect(normalize(formatCurrency(1234.5))).toBe("R$ 1.234,50");
  });

  it("uses the São Paulo timezone", () => {
    expect(APP_TIMEZONE).toBe("America/Sao_Paulo");
    // 02:00 UTC on Nov 23 is still Nov 22 in São Paulo (UTC-3).
    expect(formatDate(new Date("2026-11-23T02:00:00Z"), { dateStyle: "short" })).toBe("22/11/2026");
  });
});
