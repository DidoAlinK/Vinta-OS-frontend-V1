export function formatDZD(amount: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' DA';
}

export function formatDZDShort(amount: number): string {
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1) + 'M DA';
  if (amount >= 1_000) return (amount / 1_000).toFixed(1) + 'K DA';
  return amount + ' DA';
}
