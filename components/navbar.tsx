"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { ConsultationForm } from "./consultation-form"

// Create motion components (loose-typed to avoid strict Motion prop typings interfering with className/html props)
const MotionNav: any = motion.nav
const MotionDiv: any = motion.div
const MotionLink: any = motion.a

type NavLink = {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  // Portfolio should jump to the Living Room interiors carousel
  { href: "#living", label: "Portfolio" },
  { href: "#about", label: "About" },
  // Contact now navigates to the footer where contact details live
  { href: "#footer", label: "Contact" },
]

const menuVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  // Handle scroll with Framer Motion
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  // Handle mobile menu body lock and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  // Listen for external requests to open the consultation modal (e.g. hero button)
  useEffect(() => {
    const openHandler = () => setIsConsultationOpen(true)
    window.addEventListener('open-consultation', openHandler as EventListener)
    return () => window.removeEventListener('open-consultation', openHandler as EventListener)
  }, [])

  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <MotionNav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(51, 51, 51, 0.95)" : "rgba(51, 51, 51, 0.85)",
        boxShadow: isScrolled ? "0 4px 6px -1px rgb(0 0 0 / 0.1)" : "none",
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-12 sm:h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="inline-flex items-center">
              <div className="flex items-center">
                <img
                  src="/logo/logo.png"
                  alt="SMHD Interiors"
                  className="h-10 sm:h-12 w-auto mr-2"
                />
                <span className="text-white font-semibold text-lg sm:text-xl">SMHD <span className="text-[#C46B43]">INTERIORS</span></span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation + CTA Button */}
          <div className="hidden md:flex items-center justify-end space-x-8 flex-1">
            <nav className="flex items-center">
              <div className="flex items-center space-x-6 mr-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-gray-100 hover:text-[#C46B43] transition-colors duration-200 font-semibold
                             relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 
                             after:bg-[#C46B43] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <Button
                onClick={() => setIsConsultationOpen(true)}
                className="bg-[#C46B43] hover:bg-[#B25B33] text-white text-[15px] rounded-lg shadow-sm 
                           hover:shadow-md transition-all duration-200 px-6 whitespace-nowrap transform hover:scale-105"
              >
                Book Free Consultation
              </Button>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-100 hover:text-[#C46B43] transition-colors duration-200
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C46B43]"
              aria-label="Toggle menu"
            >
              <MotionDiv
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </MotionDiv>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <MotionDiv
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Menu */}
            <MotionDiv
              className="absolute top-[48px] inset-x-0 bg-[#333333] shadow-lg z-50"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-[15px] text-center text-gray-100 hover:text-[#C46B43] 
                               transition-colors duration-200 rounded-md hover:bg-white/5"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        handleLinkClick()
                        setIsConsultationOpen(true)
                      }}
                      className="w-full bg-[#C46B43] hover:bg-[#B25B33] text-white text-[15px] rounded-lg 
                               shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                    >
                      Book Free Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>

      {/* Consultation Form Modal */}
      <ConsultationForm 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </MotionNav>
  )
}
