interface TimestampItem {
    timestamp: string;
    value: number;
}

export default function convertUtcToTimezone(
    data: TimestampItem[],
    targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
):TimestampItem[] {
    return data.map(item => {
        const date = new Date(item.timestamp);

        if (isNaN(date.getTime())) return item;

        const convertedDate = new Intl.DateTimeFormat('pl-PL', {
            timeZone: targetTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);

        return {
            ...item,
            timestamp: convertedDate
        };
    });
}