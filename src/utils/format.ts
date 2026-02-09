export function formatPrice(value: number): string {
  return value?.toLocaleString?.() ?? String(value)
}
