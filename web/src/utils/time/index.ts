export const formatMilliseconds = (
  ms: number,
  showSeconds: boolean = true
): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  if (showSeconds) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};
