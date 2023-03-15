import { BulletChatMessage } from '../../types'

export type BulletChatMessageHandler<T extends BulletChatMessage> = (message: T) => void

export interface BulletChatObserver<T extends BulletChatMessage> {
  observe(listener: () => Promise<BulletChatMessageHandler<T>>): Promise<void>
  disconnect(): void
}
