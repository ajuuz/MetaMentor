export const toMinutes = (time: string): number => {
    const [hhmm, period] = time.split(" ");
    const [hh, mm] = hhmm.split(":").map(Number);
    let hours = hh % 12;
    if (period === "PM") hours += 12;
    return hours * 60 + mm;
  };