export function createRendererElement() {
  const el = document.createElement('div')
  el.id = 'bulletchat-renderer'
  el.style.zIndex = '1000'
  el.style.position = 'absolute'
  el.style.left = '0'
  el.style.right = '0'
  el.style.top = '0'
  el.style.bottom = '0'
  el.style.pointerEvents = 'none'

  return el
}
