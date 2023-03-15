export function isTopFrame(): boolean {
  return window === window.parent
}
