import { EffectCallback, useEffect } from 'react'

export function useMount(fn: EffectCallback) {
  useEffect(fn, [])
}