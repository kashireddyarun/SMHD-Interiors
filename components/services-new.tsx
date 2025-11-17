"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
const M: any = motion

const services = [
  {
    icon: "🏠",
    title: "Residential Design",
    description: "Creating beautiful, functional living spaces that reflect your personal style and enhance daily living.",
  },
  {
    icon: "🏢",
    title: "Commercial Interiors",
    description: "Designing productive and inspiring workspaces that elevate your brand and business environment.",
  },
  {
    icon: "🔨",
    title: "Renovation & Remodeling",
    description: "Transforming existing spaces with modern design solutions while preserving their unique character.",
  },
  {
    icon: "🏺",
    title: "Modular Kitchens",
    description: "Custom-designed modular kitchen solutions that combine style, functionality, and efficiency.",
  },
]

export function Services() {
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
    <section id="services" ref={sectionRef} className="py-6 sm:py-8 bg-[#FAF5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2
            className={`text-2xl font-serif font-semibold mb-3 sm:mb-4 text-[#2E2B28] text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Our Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <M.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-auto sm:h-[300px]"
            >
              <Card className={`h-full p-4 bg-white rounded-2xl shadow-lg md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300`}>
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4" aria-hidden>
                  {service.icon}
                </div>
                <h3 className="text-lg font-serif text-[#2E2B28] mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-[#2E2B28]/70 font-sans text-sm leading-relaxed">{service.description}</p>
              </Card>
            </M.div>
          ))}
        </div>
      </div>
    </section>
  )
}