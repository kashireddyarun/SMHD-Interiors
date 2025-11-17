"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { MessageSquare, Loader2, CheckCircle, XCircle } from "lucide-react"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.propertyType || !formData.location || !formData.name || !formData.phone) {
      setErrorMessage('Please fill in all fields')
      setSubmitStatus('error')
      return
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit mobile number')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          propertyType: formData.propertyType,
          location: formData.location,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit consultation request')
      }

      setSubmitStatus('success')
      
      // Close dialog after 2 seconds on success
      setTimeout(() => {
        onClose()
        // Reset form
        setFormData({
          propertyType: "" as PropertyType,
          location: "",
          name: "",
          phone: "",
          whatsappUpdates: true
        })
        setSubmitStatus('idle')
      }, 2000)
      
    } catch (error: any) {
      console.error('Submission error:', error)
      setErrorMessage(error.message || 'Failed to submit. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-serif font-semibold text-[#2E2B28] mb-2">
          Get a free design consultation
        </DialogTitle>
        <DialogDescription className="text-[#2E2B28]/70 text-sm mb-4">
          Design it your way, but for less
        </DialogDescription>
        

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2E2B28] mb-2">Property type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["1 BHK", "2 BHK", "3 BHK", "4+ BHK / Duplex"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyType: type as PropertyType })}
                  className={`px-4 py-2 rounded-lg text-sm border transition-all duration-200 ${
                    formData.propertyType === type
                      ? "bg-[#C46B43] text-white border-[#C46B43]"
                      : "border-gray-200 text-[#2E2B28] hover:border-[#C46B43]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-[#2E2B28] mb-2">
              Property Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C46B43]/20 focus:border-[#C46B43]"
              placeholder="Enter your location"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2E2B28] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C46B43]/20 focus:border-[#C46B43]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#2E2B28] mb-2">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 px-4 py-2 rounded-r-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C46B43]/20 focus:border-[#C46B43]"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="whatsapp"
              checked={formData.whatsappUpdates}
              onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
              className="rounded border-gray-300 text-[#C46B43] focus:ring-[#C46B43]"
            />
            <label htmlFor="whatsapp" className="text-sm text-[#2E2B28] flex items-center">
              Yes, send me updates via WhatsApp
              <MessageSquare className="w-4 h-4 ml-1 text-green-500" />
            </label>
          </div>

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">
                Thank you! You'll receive a WhatsApp message shortly.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C46B43] hover:bg-[#B25B33] text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Book a Free Consultation'
            )}
          </Button>

          <p className="text-center text-xs text-[#2E2B28]/60">
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