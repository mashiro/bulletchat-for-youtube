import { BulletChatMessage } from '../../types'

export interface BulletChatRenderer {
  init(): void
  pushMessage(msg: BulletChatMessage): void
  finalize(): void
}
