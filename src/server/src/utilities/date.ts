export const subtractDays = (daysToSubtract: number): number => {
  // Current UTC date since the beginning of the day
  const date = new Date(new Date().setUTCHours(0, 0, 0, 0));
  // Get resulting time in milliseconds
  return date.setDate(date.getDate() - daysToSubtract);
};
