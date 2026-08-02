export function getNextCycle(
  month: number,
  year: number,
) {
  if (month === 12) {
    return {
      month: 1,
      year: year + 1,
    };
  }

  return {
    month: month + 1,
    year,
  };
}