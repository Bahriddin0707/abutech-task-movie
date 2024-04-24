export function movieRunTime(minutes) {
  // Calculate hours
  let hours = Math.floor(minutes / 60);

  // Calculate remaining minutes
  let remainingMinutes = minutes % 60;

  // Return the result as an object
  return {
    hours: hours,
    minutes: remainingMinutes,
  };
}
