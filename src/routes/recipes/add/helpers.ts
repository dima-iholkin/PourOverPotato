export function formatTimeForInput(date: Date) {
  const timezoneOffsetMs = date.getTimezoneOffset() * 60000; // Timezone offset in milliseconds.

  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, -8);
}

export function parseDateFromInputString(dateStr: string) {
  const dateMs = Date.parse(dateStr); // date in milliseconds
  return new Date(dateMs);
}