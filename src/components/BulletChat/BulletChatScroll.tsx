import React, { ComponentType, CSSProperties, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useEventListener } from '../../hooks'
import { useTimeout } from '../../hooks'
import { BulletChatListContext } from '../BulletChatList'

type BulletChatScrollProps = {
  id: string
  duration: number
  Component: ComponentType
  onDone: (id: string) => void
}

export const BulletChatScroll: React.FC<BulletChatScrollProps> = ({ id, duration, onDone, Component }) => {
  const { listRect, assignToScrollLane } = useContext(BulletChatListContext)
  const ref = useRef<HTMLDivElement | null>(null)
  const [x, setX] = useState('0')
  const [top, setTop] = useState('0')

  // layout
  useEffect(() => {
    if (!ref.current) return

    const chatSize = ref.current.getBoundingClientRect()
    const laneIndex = assignToScrollLane(duration, chatSize.width)
    const laneSize = Math.floor(listRect.height / chatSize.height)
    const lanePage = Math.floor(laneIndex / laneSize)
    const laneNumber = laneIndex % laneSize

    const toX = -(chatSize.width + listRect.width)
    const offsetTop = laneNumber * chatSize.height + (lanePage === 0 ? 0 : chatSize.height / (lanePage + 1))

    setX(`${toX}px`)
    setTop(`${offsetTop}px`)
  }, [ref, listRect, assignToScrollLane, duration])

  // cleanup timer
  const doneCallback = useCallback(() => onDone(id), [id, onDone])
  useTimeout(doneCallback, duration * 1.1)
  useEventListener('transitionend', doneCallback, ref.current)

  const style: CSSProperties = {
    position: 'absolute',
    willChange: 'transform',
    transition: `transform ${duration}ms linear`,
    transform: `translateX(${x})`,
    left: '100%',
    top: top,
  }

  return (
    <div ref={ref} style={style}>
      <Component />
    </div>
  )
}
