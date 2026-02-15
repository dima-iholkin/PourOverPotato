export function convertToTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const daysAgo = Math.floor(seconds / 86400);
  if (daysAgo >= 1) {
    // Check if the date is yesterday:
    const _now = new Date();
    _now.setDate(_now.getDate() - 1);
    const yesterday = _now;
    if (yesterday.toDateString() === date.toDateString()) {
      return "yesterday";
    }
    return date.toLocaleString(undefined, { dateStyle: "long" });
  }
  const hoursAgo = Math.floor(seconds / 3600);
  if (hoursAgo > 1) {
    return hoursAgo + " hours ago";
  }
  if (hoursAgo === 1) {
    return "1 hour ago";
  }
  const minutesAgo = Math.floor(seconds / 60);
  if (minutesAgo > 1) {
    return minutesAgo + " minutes ago";
  }
  return "just now";
};

export function formatTimeForInput(date: Date): string {
  const timezoneOffsetMs = date.getTimezoneOffset() * 60000; // Timezone offset in milliseconds.
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, -8);
}

export function parseDateFromInputString(dateStr: string): Date {
  let dateMs: number; // date in milliseconds
  if (dateStr === "") {
    dateMs = 0;
  } else {
    dateMs = Date.parse(dateStr);
  }
  return new Date(dateMs);
}