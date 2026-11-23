/** Padrões regionais fixos do produto: português do Brasil, Real e horário de Brasília. */
export const APP_LOCALE = "pt-BR";
export const APP_CURRENCY = "BRL";
export const APP_TIMEZONE = "America/Sao_Paulo";

const currencyFormatter = new Intl.NumberFormat(APP_LOCALE, {
  style: "currency",
  currency: APP_CURRENCY,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
): string {
  return new Intl.DateTimeFormat(APP_LOCALE, { timeZone: APP_TIMEZONE, ...options }).format(date);
}
