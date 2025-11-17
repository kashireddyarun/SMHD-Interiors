"use client"

import { motion } from "framer-motion"
import { FileText, Layers, Hammer, Check } from "lucide-react"

const M: any = motion

const steps = [
  { icon: FileText, title: "Consultation", desc: "Tell us about your space and goals." },
  { icon: Layers, title: "Design & Visualisation", desc: "3D renders and approved layouts." },
  { icon: Hammer, title: "Execution & Fit-out", desc: "Trusted contractors and project management." },
  { icon: Check, title: "Handover", desc: "Final walkthrough and aftercare." },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-serif font-bold mb-6">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <M.article
                key={s.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-start gap-3 p-6 rounded-lg border"
                aria-labelledby={`how-step-${i}`}
              >
                <div className="p-3 rounded-md bg-[#FAF5EF]">
                  <Icon className="h-6 w-6 text-[#C46B43]" />
                </div>
                <h4 id={`how-step-${i}`} className="font-semibold">
                  {s.title}
                </h4>
                <p className="text-lg text-muted-foreground">{s.desc}</p>
              </M.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
