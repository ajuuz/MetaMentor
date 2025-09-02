export const toTimeString = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")} ${suffix}`;
};

export const getFormattedDayWithMonthAndYear = (isoString: string) =>
  new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const isoStringToLocalTime = (isoString: string) => {
  const date = new Date(isoString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return time
};

export const getDayFromISO = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "long" }); 
};
