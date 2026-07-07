import { useEffect, useRef, useState } from 'react'

// Révèle un bloc quand il entre dans le viewport. Une fois visible, on arrête
// d'observer : pas de clignotement au scroll retour.
export function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown, threshold])

  return [ref, shown]
}

// Compteur qui monte de 0 à la valeur quand il devient visible. Easing en
// sortie pour que le chiffre ralentisse à l'arrivée, comme une aiguille.
export function useCountUp(target, active, duration = 1400) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return n
}
