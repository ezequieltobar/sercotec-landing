import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ to, prefix = '', suffix = '', duration = 2000 }) {
  const [count,   setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, to, duration])

  return (
    <span ref={ref} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}{count}{suffix}
    </span>
  )
}