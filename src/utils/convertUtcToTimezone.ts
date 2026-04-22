export default function convertUtcToTimezone(
    data: string,
    targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
):string {
    const date = new Date(data);
    if (isNaN(date.getTime())) return data;

    return new Intl.DateTimeFormat('pl-PL', {
        timeZone: targetTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}