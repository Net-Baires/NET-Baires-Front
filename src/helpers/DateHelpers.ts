export const parseDate = (date: string) => new Date(date);

export const formatDate = (date: Date) => date.toLocaleDateString();

export const formatStringDate = (date: string) => formatDate(parseDate(date));
