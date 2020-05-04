export function createControlButton() {
  const el = document.createElement('span')
  el.textContent = 'BulletChat'
  el.style.cssFloat = 'left'
  el.style.width = 'auto'
  el.style.fontWeight = 'bold'

  const button = document.createElement('button')
  button.id = 'bulletchat-toggle'
  button.className = 'ytp-button'
  button.style.width = 'auto'
  button.appendChild(el)

  return button
}
