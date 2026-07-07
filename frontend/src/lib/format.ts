const ugx = new Intl.NumberFormat("en-UG", { maximumFractionDigits: 0 });

export function formatUGX(price: string | number): string {
  return `UGX ${ugx.format(Number(price))}`;
}
