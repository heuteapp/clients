export default function parseYYMMDD(date: string): Date | null {
    if (!/^\d{6}$/.test(date)) return null

    const year = 2000 + Number(date.slice(0, 2))
    const month = Number(date.slice(2, 4))
    const day = Number(date.slice(4, 6))

    if (month < 1 || month > 12) return null
    if (day < 1 || day > 31) return null

    return new Date(Date.UTC(year, month - 1, day))
}