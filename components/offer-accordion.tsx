"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const M: any = motion

const items = [
  {
    id: "services",
    title: "Our Services",
    body: `Our design philosophy combines aesthetics with functionality to create spaces that reflect your personality and lifestyle. We handle everything from initial concept to final execution:

    • Comprehensive space planning and layout optimization
    • Custom furniture design and sourcing
    • Material selection and color consultation
    • Modular kitchen and wardrobe solutions
    • Lighting design and electrical planning
    • Project management and timeline coordination
    
    We work closely with skilled craftsmen and trusted vendors to ensure the highest quality standards in every project.`,
  },
  {
    id: "price",
    title: "Price Benefits",
    body: `We believe in complete transparency and offer flexible pricing options to suit different budgets:

    • Clear, itemized quotations with no hidden costs
    • Three package tiers: Essential, Premium, and Luxury
    • Flexible payment schedule aligned with project milestones
    • Early booking discounts and seasonal offers
    • Bundle pricing for multiple room designs
    • Free initial consultation and basic space planning
    
    Our pricing includes project management and quality assurance at every step.`,
  },
  {
    id: "warranty",
    title: "Warranty",
    body: `We stand behind the quality of our work with comprehensive warranty coverage:

    • 5-year warranty on structural modifications
    • 3-year warranty on carpentry and woodwork
    • 2-year warranty on hardware and fixtures
    • 1-year warranty on paint and polish work
    • Terms and conditions apply
    
    Our warranty includes:
    • Free repairs for manufacturing defects
    • Replacement of faulty materials or fixtures
    • Regular maintenance checks in the first year
    • 24/7 customer support for urgent issues
    
    Simple claim process through our customer portal or service hotline.`,
  },
  {
    id: "tech",
    title: "Technology & Science",
    body: `We leverage cutting-edge technology to enhance the design process:

    • Advanced 3D visualization and virtual walkthrough
    • Material testing and quality certification
    • Digital project tracking and updates
    • Smart home integration planning
    • Eco-friendly material recommendations
    • Scientific space optimization algorithms
    
    Our tech-driven approach ensures precision in execution and helps you visualize the end result before work begins.`,
  },
]

export default function OfferAccordion() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="offers" className="py-20 bg-[#FAF5EF]">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-2xl font-serif font-bold mb-8 text-[#2E2B28]">What We Offer</h3>

        <div className="space-y-4">
          {items.map((it) => {
            const isOpen = open === it.id
            return (
              <div 
                key={it.id} 
                className="rounded-lg overflow-hidden border border-[#2E2B28]/10 bg-white transition-all duration-300 hover:shadow-md"
              >
                <button
                  aria-expanded={isOpen}
                  className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 ${
                    isOpen ? "bg-[#FAF5EF]" : "bg-white hover:bg-[#FAF5EF]/50"
                  }`}
                  onClick={() => setOpen(isOpen ? null : it.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFF1F1] flex items-center justify-center">
                      {it.id === "services" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#C46B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {it.id === "price" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" stroke="#C46B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {it.id === "warranty" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#C46B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20.188 10.934c.388-1.472.388-3.019 0-4.491l-.296-1.121a3.467 3.467 0 0 0-2.214-2.214l-1.121-.296a8.095 8.095 0 0 0-4.491 0l-1.121.296a3.467 3.467 0 0 0-2.214 2.214l-.296 1.121a8.095 8.095 0 0 0 0 4.491l.296 1.121a3.467 3.467 0 0 0 2.214 2.214l1.121.296c1.472.388 3.019.388 4.491 0l1.121-.296a3.467 3.467 0 0 0 2.214-2.214l.296-1.121z" stroke="#C46B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {it.id === "tech" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8v4l2.5 2.5M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke="#C46B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#2E2B28] text-lg">{it.title}</div>
                      <div className="text-lg text-[#2E2B28]/60 mt-1">
                        {isOpen ? "Click to close" : "Click to learn more"}
                      </div>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-[#C46B43] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`} 
                  />
                </button>

                <M.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-5 overflow-hidden"
                >
                  <div className="py-4 text-[#2E2B28]/80 leading-relaxed whitespace-pre-line">
                    {it.body}
                  </div>
                </M.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
