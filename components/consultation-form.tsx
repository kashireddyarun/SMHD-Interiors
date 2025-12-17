"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { MessageSquare } from "lucide-react"

type PropertyType = "1 BHK" | "2 BHK" | "3 BHK" | "4+ BHK / Duplex"

export function ConsultationForm({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    propertyType: "" as PropertyType,
    location: "",
    name: "",
    phone: "",
    whatsappUpdates: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 max-h-[95vh]">
        <DialogTitle className="font-serif font-semibold text-[#2E2B28] mb-1" style={{fontSize: '21px'}}>
          Get a free design consultation
        </DialogTitle>
        <DialogDescription className="text-[#2E2B28]/70 mb-4" style={{fontSize: '12.25px'}}>
          Design it your way, but for less
        </DialogDescription>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-[#2E2B28] mb-2" style={{fontSize: '12.25px'}}>Property type</label>
            <div className="grid grid-cols-2 gap-2">
              {["1 BHK", "2 BHK", "3 BHK", "4+ BHK / Duplex"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyType: type as PropertyType })}
                  className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                    formData.propertyType === type
                      ? "bg-[#C46B43] text-white border-[#C46B43]"
                      : "border-gray-200 text-[#2E2B28] hover:border-[#C46B43]"
                  }`}
                  style={{fontSize: '12.25px'}}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block font-medium text-[#2E2B28] mb-2" style={{fontSize: '12.25px'}}>
              Property Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C46B43]/20 focus:border-[#C46B43]"
              placeholder="Enter your location"
              style={{fontSize: '12.25px'}}
            />
          </div>

          <div>
            <label htmlFor="name" className="block font-medium text-[#2E2B28] mb-2" style={{fontSize: '12.25px'}}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C46B43]/20 focus:border-[#C46B43]"
              placeholder="Enter your name"
              style={{fontSize: '12.25px'}}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium text-[#2E2B28] mb-2" style={{fontSize: '12.25px'}}>
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500" style={{fontSize: '12.25px'}}>
                +91
              </span>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 px-3 py-2 rounded-r-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C46B43]/20 focus:border-[#C46B43]"
                placeholder="Enter your mobile number"
                style={{fontSize: '12.25px'}}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="whatsapp"
              checked={formData.whatsappUpdates}
              onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
              className="rounded border-gray-300 text-[#C46B43] focus:ring-[#C46B43] w-4 h-4"
            />
            <label htmlFor="whatsapp" className="text-[#2E2B28] flex items-center" style={{fontSize: '12.25px'}}>
              Yes, send me updates via WhatsApp
              <MessageSquare className="w-4 h-4 ml-1 text-green-500" />
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C46B43] hover:bg-[#B25B33] text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            style={{fontSize: '12.25px'}}
          >
            Book a Free Consultation
          </Button>

          <p className="text-center text-[#2E2B28]/60" style={{fontSize: '10px'}}>
            By submitting, you consent to our{" "}
            <a href="#" className="text-[#C46B43] hover:underline">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#C46B43] hover:underline">
              terms of use
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}