"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
const M: any = motion

function useCountWhenInView(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const from = 0
    const to = target

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const current = Math.round(from + (to - from) * t)
      setValue(current)
      if (t < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [inView, target, duration])

  return value
}

export default function Metrics() {
  const ref = useRef<Element | null>(null)
  const inView = useInView(ref as any, { once: true, margin: "-120px" })

  const years = useCountWhenInView(12, inView)
  const projects = useCountWhenInView(340, inView)
  const clients = useCountWhenInView(320, inView)

  const row = [
    { label: "Years in Business", value: years, suffix: "" },
    { label: "Projects Completed", value: projects, suffix: "" },
    { label: "Happy Clients", value: clients, suffix: "+" },
  ]

  return (
    <section id="metrics" ref={ref as any} className="py-6 sm:py-8 lg:py-12 bg-[#FAF5EF] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile: single-row responsive shrink, Desktop: 3-column grid */}
        <div className="flex items-center justify-between gap-4 md:grid md:grid-cols-3">
          {row.map((r) => (
            <M.div
              key={r.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 min-w-0"
            >
              <div className="p-4 sm:p-6 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                <div className="text-xl sm:text-3xl font-bold text-[#C46B43]">{r.value}{r.suffix}</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-base text-[#2E2B28]/80 whitespace-normal break-words leading-snug">{r.label}</div>
              </div>
            </M.div>
          ))}
        </div>
      </div>
    </section>
  )
}
