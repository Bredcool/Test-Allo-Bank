export function formatCurrency(n?: number) {
    if (!n) return '—'
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}