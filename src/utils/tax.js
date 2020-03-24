export function fixedRate(presentValue, tax, time) {
  return presentValue * (1 + tax) ** time;
}
export function postFixed(presentValue, tax, time) {
  return 1;
}
