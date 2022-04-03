export const dayDifference = (previousDate: Date, futureDate: Date): number => {
  // @ts-expect-error
  return parseInt((futureDate - previousDate) / (1000 * 60 * 60 * 24), 10); // 1000 * 60 * 60 * 24 - milliseconds in a single day
};
