export function formatTemp(temp: number): string {
    return `${Math.round(temp)}°C`;
}

export function formatTempRange(min: number, max: number): string {
    return `${Math.round(min)}° / ${Math.round(max)}°`;
    // تبدیل ب نزدیک ترین عدد صحیح
}