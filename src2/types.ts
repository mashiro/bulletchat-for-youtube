export type BulletChatMessageType = 'BulletChatYouTubeMessage'

export type BulletChatMessage = {}

export type BulletChatMessageEvent = {
  type: BulletChatMessageType
  data: BulletChatMessage
}

export type BulletChatOptionCategory = 'normal' | 'superchat' | 'moderator'
