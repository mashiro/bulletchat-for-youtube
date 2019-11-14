import Emittery from 'emittery'
import React, { useCallback, useEffect, useState } from 'react'
import { MeasureRect } from '../../hooks'
import { BulletChatOptions } from '../BulletChat'
import { BulletChatList } from '../BulletChatList'

export interface BulletChatAppEmitterEvents {
  chat: BulletChatOptions
}

export type BulletChatAppEmitter = Emittery.Typed<BulletChatAppEmitterEvents>

export type BulletChatAppProps = {
  emitter: BulletChatAppEmitter
  onChangeRect: (rect: MeasureRect) => void
}

export const BulletChatApp: React.FC<BulletChatAppProps> = ({ emitter, onChangeRect }) => {
  const [chats, setChats] = useState<BulletChatOptions[]>([])

  // subscribe emitter event
  useEffect(() => {
    const subscription = emitter.on('chat', (chat: BulletChatOptions) => {
      setChats((chats) => [...chats, chat])
    })
    return () => {
      emitter.off('chat', subscription)
    }
  }, [emitter])

  const removeChat = useCallback((id: string) => {
    setChats((chats) => chats.filter((chat) => chat.id !== id))
  }, [])

  return <BulletChatList chats={chats} onDone={removeChat} onChangeRect={onChangeRect} />
}
