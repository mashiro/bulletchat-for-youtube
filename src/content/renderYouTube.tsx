import { YouTubeBulletChatMessage, YouTubeLiveChatObserver } from './observers/YouTubeLiveChatObserver'
import { YouTubeRenderer } from './renderers/YouTubeRenderer'

export const renderYouTube = async () => {
  const observer = new YouTubeLiveChatObserver()
  await observer.observe(async () => {
    const renderer = new YouTubeRenderer()
    await renderer.init()

    return (message: YouTubeBulletChatMessage) => {
      renderer.pushMessage(message)
    }
  })
}
