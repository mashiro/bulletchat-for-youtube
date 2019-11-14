import React, { ComponentType, CSSProperties, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTimeout } from '../../hooks'
import { BulletChatListContext } from '../BulletChatList'

type BulletChatBottomProps = {
  id: string
  duration: number
  Component: ComponentType
  onDone: (id: string) => void
}

export const BulletChatBottom: React.FC<BulletChatBottomProps> = ({ id, duration, onDone, Component }) => {
  const { listRect, assignToBottomLane } = useContext(BulletChatListContext)
  const ref = useRef<HTMLDivElement | null>(null)
  const [top, setTop] = useState(`${listRect.height.toString()}px`)
  const [bottom, setBottom] = useState('')

  useEffect(() => {
    if (!ref.current) return

    const chatSize = ref.current.getBoundingClientRect()
    const laneIndex = assignToBottomLane(duration)
    const laneSize = Math.floor(listRect.height / chatSize.height)
    const lanePage = Math.floor(laneIndex / laneSize)
    const laneNumber = laneIndex % laneSize
    const offsetBottom = laneNumber * chatSize.height + (lanePage === 0 ? 0 : chatSize.height / (lanePage + 1))
    setTop('')
    setBottom(`${offsetBottom}px`)
  }, [ref, listRect, assignToBottomLane, duration])

  // cleanup timer
  const doneCallback = useCallback(() => onDone(id), [id, onDone])
  useTimeout(doneCallback, duration)

  const style: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: top,
    bottom: bottom,
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <div ref={ref} style={style}>
      <Component />
    </div>
  )
}
