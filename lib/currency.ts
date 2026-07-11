export function formatPrice(price: number): string {
  return `S/. ${price.toLocaleString("es-PE", { minimumFractionDigits: 0 })}`;
}
