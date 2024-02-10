export function formatTimeForInput(date: Date): string {
  const timezoneOffsetMs = date.getTimezoneOffset() * 60000; // Timezone offset in milliseconds.

  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, -8);
}

export function parseDateFromInputString(dateStr: string): Date {
  const dateMs = Date.parse(dateStr); // date in milliseconds
  return new Date(dateMs);
}

export function convertToTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return date.toLocaleString(undefined, { dateStyle: "short" });
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  return "just now";
};