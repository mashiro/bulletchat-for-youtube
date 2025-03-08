import { RGBColor } from 'react-color'
import { BulletChatMessage } from '../../types'
import { toRGBColor } from '../../utils'
import { isTopFrame } from '../utils'
import { BulletChatMessageHandler, BulletChatObserver } from './BulletChatObserver'

const ORIGIN = `${window.location.protocol}//${window.location.hostname}`

export type YouTubeBulletChatMessage = BulletChatMessage & {
  name: string
  text: string
  textHtml: string
  iconUrl: string
  paid: boolean
  paidColor?: RGBColor
  member: boolean
  moderator: boolean
  owner: boolean
}

export type YouTubeLiveChatMessage = {
  type: 'YouTubeLiveChatMessage'
  message: YouTubeBulletChatMessage
}

const isChatFrame = (): boolean => {
  return !!window.location.pathname.match(/\/live_chat/)
}

const isChatMessage = (node: Node): boolean => {
  const nodeName = node.nodeName.toLowerCase()
  return nodeName === 'yt-live-chat-text-message-renderer' || nodeName === 'yt-live-chat-paid-message-renderer'
}

const toChatMessage = (node: Node): YouTubeBulletChatMessage => {
  const el = node as HTMLElement

  const name = el.querySelector('#author-name')!!.textContent!!
  const text = el.querySelector('#message')!!.textContent!!
  const textHtml = el.querySelector('#message')!!.innerHTML
  const iconUrl = el.querySelector('#img')!!.attributes.getNamedItem('src')!!.value
  const paid = node.nodeName.toLowerCase().includes('paid')
  const paidColorString = el.style.getPropertyValue('--yt-live-chat-paid-message-primary-color')
  const paidColor = paidColorString != null ? toRGBColor(paidColorString) : paidColorString
  const member = el.querySelector('#author-name.member') != null
  const moderator = el.querySelector('#author-name.moderator') != null
  const owner = el.querySelector('#author-name.owner') != null

  return {
    name,
    text,
    textHtml,
    iconUrl,
    paid,
    paidColor,
    member,
    moderator,
    owner,
  }
}

export class YouTubeLiveChatObserver implements BulletChatObserver<YouTubeBulletChatMessage> {
  private observer: MutationObserver | null = null

  async observe(listener: () => Promise<BulletChatMessageHandler<YouTubeBulletChatMessage>>): Promise<void> {
    if (isChatFrame()) {
      const chatApp = document.querySelector('#items')
      if (chatApp == null) {
        throw Error('Can not find chat app')
      }

      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            try {
              if (isChatMessage(node)) {
                const event: YouTubeLiveChatMessage = {
                  type: 'YouTubeLiveChatMessage',
                  message: toChatMessage(node),
                }
                window.parent.postMessage(event, ORIGIN)
              }
            } catch (e) {}
          })
        })
      })
      this.observer.observe(chatApp, { childList: true })
    }

    if (isTopFrame()) {
      const handler = await listener()
      window.addEventListener('message', (event) => {
        if (event.origin === ORIGIN) {
          const data = event.data as YouTubeLiveChatMessage
          if (data.type === 'YouTubeLiveChatMessage') {
            handler(data.message)
          }
        }
      })
    }
  }

  disconnect() {
    if (this.observer != null) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}
