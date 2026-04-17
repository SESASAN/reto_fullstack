export type Currency = 'USD' | 'COP' | 'EUR'

export function formatPrice(amount: number, currency: Currency = 'USD') {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
