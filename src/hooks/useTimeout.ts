import { useEffect } from 'react'

export function useTimeout(handler: TimerHandler, timeout: number) {
  useEffect(() => {
    const timer = setTimeout(handler, timeout)
    return () => {
      clearTimeout(timer)
    }
  }, [handler, timeout])
}
