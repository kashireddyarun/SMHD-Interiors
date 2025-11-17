import { Instagram, Facebook, Phone, Mail, MapPin, Clock, MessageCircle, CircleDot } from "lucide-react"

export function Footer() {
  return (
    <footer id="footer" className="bg-white py-12 lg:py-16 border-t">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo/logo.png" alt="SMHD Interiors" className="h-12 w-auto mr-2" />
              <span className="text-2xl font-bold">
                SMHD <span className="text-[#C46B43]">INTERIORS</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-4 flex items-start">
              <CircleDot className="h-5 w-5 mr-2 mt-1 text-[#C46B43] flex-shrink-0" />
              <span>
                Crafting exceptional interiors that blend timeless elegance with modern functionality. Your vision, our
                expertise.
              </span>
            </p>
            <div className="text-gray-600 text-sm space-y-3">
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-[#C46B43]" />
                <div>
                  <p className="leading-relaxed">
                    No. 32, Jb Estate, Vivekananda Nagar,<br />
                    Adhiparashakthi Nagar, Avadi,<br />
                    Chennai - 600054
                  </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=No.+32,+Jb+Estate,+Vivekananda+Nagar,+Adhiparashakthi+Nagar,+Chennai,+Avadi-600054"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#C46B43] text-white rounded-lg hover:bg-[#B25B33] transition-all duration-200 transform hover:scale-105"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                </div>
              </div>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-[#C46B43]" />
                Mon - Sat: 9:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#living" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#footer" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-800">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <a href="tel:+919940322694" title="Call us" className="flex items-center hover:text-[#C46B43] transition-colors duration-200">
                  <Phone className="h-4 w-4 mr-2 text-[#C46B43]" />
                  +91 99403 22694
                </a>
              </p>

              <p>
                <a href="mailto:Karthiksmhd@gmail.com" className="flex items-center hover:text-[#C46B43] transition-colors duration-200">
                  <Mail className="h-4 w-4 mr-2 text-[#C46B43]" />
                  Karthiksmhd@gmail.com
                </a>
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-gray-800">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/smhdinteriors.9940"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Instagram className="h-5 w-5" />
                </a>

                <a
                  href="https://www.facebook.com/smhdinteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2] text-white transition-all duration-300 hover:scale-105"
                >
                  <Facebook className="h-5 w-5" />
                </a>

                <a
                  href="https://wa.me/919940322694"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366] text-white transition-all duration-300 hover:scale-105"
                >
                  {/* Inline WhatsApp SVG (white, uses currentColor) */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.48A10 10 0 1 0 3.48 20.52L2 22l1.48-1.48A10 10 0 0 0 20.52 3.48zM12.01 19.5c-1.86 0-3.6-.5-5.12-1.36l-.37-.22-3.03.9.9-3.02-.24-.39A7.48 7.48 0 0 1 4.5 12.01c0-4.14 3.37-7.5 7.51-7.5 4.14 0 7.5 3.36 7.5 7.5 0 4.14-3.36 7.5-7.5 7.5zm3.94-5.21c-.21-.1-1.24-.61-1.43-.68-.19-.08-.33-.11-.47.11-.14.22-.54.68-.66.82-.12.14-.24.16-.45.06-.21-.09-.9-.33-1.71-1.05-.63-.57-1.05-1.27-1.17-1.48-.12-.21-.01-.33.09-.43.09-.09.21-.24.31-.36.1-.12.13-.21.2-.34.07-.13.03-.25-.02-.34-.05-.09-.46-1.11-.63-1.52-.17-.4-.34-.34-.47-.35l-.4-.01c-.13 0-.33.05-.5.22-.17.17-.66.64-.66 1.56 0 .92.68 1.82.78 1.95.1.13 1.43 2.22 3.88 3.86 2.66 1.78 3.02 1.31 3.56 1.23.37-.06 1.24-.5 1.42-.98.18-.48.18-.9.13-.98-.05-.08-.2-.13-.41-.22z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 SMHD Interiors. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-[#C46B43] transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
