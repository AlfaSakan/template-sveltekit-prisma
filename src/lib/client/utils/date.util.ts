export function generateUnixSecond() {
  return Math.round(new Date().getTime() / 1000);
}
