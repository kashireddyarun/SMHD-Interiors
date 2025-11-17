"use client"

import { AnimatePresence, motion } from "framer-motion"
const M: any = motion
import { Hero } from "@/components/hero-new"
import { About } from "@/components/about-new"
import WhyChoose from "@/components/why-choose"
import { Services } from "@/components/services-new"
import OfferAccordion from "@/components/offer-accordion"
import HowItWorks from "@/components/how-it-works"
import Metrics from "@/components/metrics"
import { InteriorsSection } from "@/components/interiors-section"
// Contact and Showroom are intentionally not rendered on the homepage per design request
import { Footer } from "@/components/footer"

const sectionMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <M.main
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-[#FAF5EF] text-[#2E2B28] overflow-x-hidden space-y-8 sm:space-y-10"
      >
        <M.section variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Hero />
        </M.section>

        <M.section variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChoose />
            <InteriorsSection />
            <About />
          </div>
        </M.section>

        <M.section variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Services />
          </div>
        </M.section>

        <M.section variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OfferAccordion />
          </div>
        </M.section>

        <M.section variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HowItWorks />
          </div>
        </M.section>

        <M.section variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Metrics />
          </div>
        </M.section>

        

        {/* Showroom and contact cards removed as requested */}

        <M.section className="py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </M.section>
      </M.main>
    </AnimatePresence>
  )
}
