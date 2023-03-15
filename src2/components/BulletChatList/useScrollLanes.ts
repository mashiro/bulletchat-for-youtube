import { useCallback, useState } from 'react'

export function useScrollLanes() {
  const [lanes, setLanes] = useState<number[]>([])

  const assignToScrollLane = useCallback(
    (duration: number, size: number): number => {
      const adjust = Math.min(-(duration / 4) + size * 5, duration / 4)
      const now = Date.now()
      let i = 0
      while (true) {
        const t = lanes[i]
        if (t == null) break
        if (now >= t + adjust) break
        i++
      }
      setLanes((lanes) => {
        lanes[i] = now + duration / 2 + adjust
        return lanes
      })
      return i
    },
    [lanes]
  )

  return { assignToScrollLane }
}
