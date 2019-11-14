export function getFirstValue(value: number | number[]): number {
  return Array.isArray(value) ? value[0] : value
}
