import { useEffect } from 'react'

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any
): void

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  target: EventTarget | null
): void

export function useEventListener(type: string, listener: EventListener, target: EventTarget | null = window): void {
  useEffect(() => {
    if (!target) return
    target.addEventListener(type, listener)
    return () => {
      target.removeEventListener(type, listener)
    }
  }, [type, listener, target])
}
