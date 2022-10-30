// convert number to COP currency

export default function convertToCopCurrency (value: number | null): string {
    if (value === null) return '$0';
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
}