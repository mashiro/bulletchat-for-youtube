import React, { useRef } from 'react'
import { MeasureRect, useMeasure, usePrevious } from '../../hooks'
import { BulletChat, BulletChatOptions } from '../BulletChat'
import classes from './BulletChatList.module.css'
import { useBottomLanes } from './useBottomLanes'
import { useScrollLanes } from './useScrollLanes'

type BulletChatListContextProps = {
  listRect: MeasureRect
  assignToScrollLane: (duration: number, size: number) => number
  assignToBottomLane: (duration: number) => number
}

export const BulletChatListContext = React.createContext({} as BulletChatListContextProps)

type BulletChatListProps = {
  chats: BulletChatOptions[]
  onDone: (id: string) => void
  onChangeRect: (rect: MeasureRect) => void
}

export const BulletChatList: React.FC<BulletChatListProps> = (props) => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const listRect = useMeasure(listRef)
  const prevListRect = usePrevious(listRect)
  if (listRect !== prevListRect) {
    props.onChangeRect(listRect)
  }

  const { assignToScrollLane } = useScrollLanes()
  const { assignToBottomLane } = useBottomLanes()

  return (
    <BulletChatListContext.Provider
      value={{
        listRect,
        assignToScrollLane,
        assignToBottomLane,
      }}
    >
      <div ref={listRef} className={classes.list}>
        {props.chats.map((chat) => {
          return <BulletChat key={chat.id} {...chat} onDone={props.onDone} />
        })}
      </div>
    </BulletChatListContext.Provider>
  )
}
