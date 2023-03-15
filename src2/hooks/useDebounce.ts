import { debounce } from 'lodash'
import { DependencyList, useEffect, useRef } from 'react'

export function useDebounce(fn: () => void, wait: number = 0, deps: DependencyList = []) {
  const isMountPhase = useRef(true)
  const debounceRef = useRef<typeof fn | null>(null)
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  useEffect(() => {
    debounceRef.current = debounce(() => {
      fnRef.current()
    }, wait)
  }, [wait])

  useEffect(() => {
    if (isMountPhase.current) {
      isMountPhase.current = false
    } else {
      if (!debounceRef.current) return
      debounceRef.current()
    }
  }, deps)
}
