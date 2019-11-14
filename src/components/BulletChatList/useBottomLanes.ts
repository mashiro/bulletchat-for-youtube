import { useCallback, useState } from 'react'

export function useBottomLanes() {
  const [lanes, setLanes] = useState<number[]>([])

  const assignToBottomLane = useCallback(
    (duration: number): number => {
      const now = Date.now()
      let i = 0
      while (true) {
        const t = lanes[i]
        if (t == null) break
        if (now >= t) break
        i++
      }
      setLanes((lanes) => {
        lanes[i] = now + duration
        return lanes
      })
      return i
    },
    [lanes]
  )

  return { assignToBottomLane }
}
