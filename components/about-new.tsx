"use client"

import { useEffect, useRef, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#FAF5EF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src="/images_in/abot.jpg"
                alt="SMHD Interiors Team"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h2
              className={`text-4xl font-serif font-semibold mb-6 text-[#2E2B28] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              About SMHD Interiors
            </h2>
            <p
              className={`text-lg text-[#2E2B28]/80 font-sans leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              Welcome to SMHD Interiors – where creativity meets comfort.
              We design elegant, modern, and functional spaces that reflect your personality.
              From concept to completion, every detail is crafted with perfection.
              Transform your home or office into a masterpiece of style and warmth.
              SMHD Interiors – Redefining spaces, redefining lifestyles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}