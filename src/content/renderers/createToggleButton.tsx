export function createToggleButton() {
  const obj = document.createElement('object')
  obj.type = 'image/svg+xml'
  obj.data = chrome.runtime.getURL('icon-white.svg')
  obj.style.boxSizing = 'border-box'
  obj.style.padding = '6px'
  obj.style.width = '100%'
  obj.style.height = '100%'
  obj.style.pointerEvents = 'none'

  const button = document.createElement('button')
  button.id = 'bulletchat-toggle'
  button.className = 'ytp-button'
  button.title = 'Toggle BulletChat'
  button.setAttribute('aria-label', 'Toggle BulletChat')
  button.appendChild(obj)

  return button
}
