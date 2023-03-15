import React, { ComponentType } from 'react'
import { BulletChatBottom } from './BulletChatBottom'
import { BulletChatScroll } from './BulletChatScroll'

export type BulletChatMode = 'scroll' | 'top' | 'bottom'

export type BulletChatOptions = {
  id: string
  mode: BulletChatMode
  duration: number
  Component: ComponentType
}

export type BulletChatProps = {
  onDone: (id: string) => void
} & BulletChatOptions

export const BulletChat: React.FC<BulletChatProps> = (props) => {
  switch (props.mode) {
    case 'scroll':
      return <BulletChatScroll {...props} />
    case 'bottom':
      return <BulletChatBottom {...props} />
    default:
      return <div />
  }
}
