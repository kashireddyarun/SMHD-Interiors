"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

const M: any = motion

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)

  const heading = "Transforming Your Space into a Style Statement"

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  }

  const word = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center pt-20 w-full overflow-hidden relative">
        {/* Static Background Image (full coverage) */}
        <div
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images_in/navbar.jpg')`,
          }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 w-full mx-auto px-6 lg:px-8 py-12 lg:py-24">
          <M.div
            className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight md:leading-tight">
              {heading.split(" ").map((w, i) => (
                <M.span key={i} variants={word} className="inline-block mr-1 md:mr-2">
                  {w}
                </M.span>
              ))}
            </h1>

            <M.p
              className="text-base sm:text-lg md:text-xl text-white/90 font-sans max-w-2xl mx-auto"
              variants={word}
            >
              Elegant, functional, and timeless designs crafted for every home.
            </M.p>

            <M.div className="mt-6" variants={word}>
              <Button
                size="lg"
                onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))}
                className="bg-[#C46B43] hover:bg-[#B25B33] text-white px-6 py-5 text-lg rounded-lg transition-colors duration-300"
              >
                Book a Free Consultation
              </Button>
            </M.div>
          </M.div>
        </div>
      </div>
    </section>
  )
}
