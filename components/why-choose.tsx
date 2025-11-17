"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export default function WhyChoose() {
  const features = [
    { id: 'poss', title: '51040 Design Possibilities', icon: HomeIcon },
    { id: 'storage', title: '20% EXTRA Storage', icon: StorageIcon },
    { id: 'emi', title: 'No Cost EMIs', icon: RupeeIcon },
    { id: 'warranty', title: 'Upto 25 Year Warranty', icon: ShieldIcon },
  ]

  return (
  <section id="why-choose" className="py-12 bg-[#FAF5EF]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-serif font-semibold text-[#2E2B28] mb-8">Why Choose SMHD Interiors?</h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-0 max-w-3xl mx-auto">
          <div className="space-y-8">
            {features.slice(0, 2).map((f) => (
              <div key={f.id} className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 flex items-center justify-center shadow-sm">
                  <f.icon className="w-9 h-9 text-[#C46B43]" />
                </div>
                <div className="mt-3 text-lg text-[#2E2B28] leading-tight text-center">{f.title}</div>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            {features.slice(2, 4).map((f) => (
              <div key={f.id} className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 flex items-center justify-center shadow-sm">
                  <f.icon className="w-9 h-9 text-[#C46B43]" />
                </div>
                <div className="mt-3 text-lg text-[#2E2B28] leading-tight text-center">{f.title}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function HomeIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StorageIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function RupeeIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17 3H8a4 4 0 000 8h5a4 4 0 010 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2l7 3v5c0 5-3.6 9.7-7 11-3.4-1.3-7-6-7-11V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12.5l1.9 1.9 3.1-3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
