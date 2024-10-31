export const formatToCustomDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const extractTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}


export const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('tr-TR', options);
}


export const formatToDayMonthWeekDate = (date: string | null) => {
    if (date) {
        const dateItem = new Date(date);
        const day = new Intl.DateTimeFormat("tr-TR", { day: "numeric" }).format(dateItem);
        const month = new Intl.DateTimeFormat("tr-TR", { month: "long" }).format(dateItem);
        const weekday = new Intl.DateTimeFormat("tr-TR", { weekday: "long" }).format(dateItem);

        return `${day} ${month} ${weekday}`;
    }
    return null
};