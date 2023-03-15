import Emittery from 'emittery'
import React, { useCallback, useEffect, useState } from 'react'
import { MeasureRect } from '../../hooks'
import { BulletChatOptions } from '../BulletChat'
import { BulletChatList } from '../BulletChatList'

type BulletChatEvent = {
  chat: BulletChatOptions
}

type BulletChatToggleEvent = {
  disabled: boolean
}

export interface BulletChatAppEmitterEvents {
  chat: BulletChatEvent
  toggle: BulletChatToggleEvent
}

export type BulletChatAppEmitter = Emittery.Typed<BulletChatAppEmitterEvents>

export type BulletChatAppProps = {
  emitter: BulletChatAppEmitter
  onChangeRect: (rect: MeasureRect) => void
}

export const BulletChatApp: React.FC<BulletChatAppProps> = ({ emitter, onChangeRect }) => {
  const [chats, setChats] = useState<BulletChatOptions[]>([])
  const [disabled, setDisabled] = useState(false)

  // subscribe emitter event
  useEffect(() => {
    const subscription = emitter.on('chat', (e: BulletChatEvent) => {
      setChats((chats) => [...chats, e.chat])
    })
    return () => {
      emitter.off('chat', subscription)
    }
  }, [emitter])

  // handle on change erect
  const onChangeRectWrapper = useCallback(
    (rect: MeasureRect) => {
      setChats([])
      onChangeRect(rect)
    },
    [onChangeRect]
  )

  // toggle disable
  useEffect(() => {
    const subscription = emitter.on('toggle', (e: BulletChatToggleEvent) => {
      setDisabled(e.disabled)
    })
    return () => {
      emitter.off('toggle', subscription)
    }
  }, [emitter])
  useEffect(() => {
    if (disabled) {
      // clear all chats
      setChats([])
    }
  }, [disabled])

  const removeChat = useCallback((id: string) => {
    setChats((chats) => chats.filter((chat) => chat.id !== id))
  }, [])

  if (disabled) {
    return <></>
  }

  return <BulletChatList chats={chats} onDone={removeChat} onChangeRect={onChangeRectWrapper} />
}
