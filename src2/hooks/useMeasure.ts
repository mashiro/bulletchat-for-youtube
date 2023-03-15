import { RefObject, useLayoutEffect, useState } from 'react'

export type MeasureRect = Omit<DOMRectReadOnly, 'toJSON'>

export function useMeasure(ref: RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState<MeasureRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const resizeCallback: ResizeObserverCallback = ([entry]) => {
    setRect(entry.contentRect)
  }

  useLayoutEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(resizeCallback)
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return rect
}
