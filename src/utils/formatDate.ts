export function formatDay(dateTime: number, lang: string = 'fa'): string {
    const date = new Date(dateTime * 1000);
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
        weekday: 'long'
    }).format(date);
}