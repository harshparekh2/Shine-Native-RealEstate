"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"
import { generateWhatsAppLink } from "@/utils/helpers"

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-bold mb-4">Shine Native</h3>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Your trusted partner in finding premium properties. We specialize in
              luxury real estate, offering exceptional homes for discerning clients.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#properties"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Admin
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Property Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4">Property Types</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-primary-foreground/70">Villas</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Penthouses</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Apartments</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Townhouses</span>
              </li>
              <li>
                <span className="text-primary-foreground/70">Farmhouses</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary-foreground/70" />
                <span className="text-primary-foreground/70">
                  123 Business District,
                  <br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>+91 75740 02696</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hpverse@gmail.com"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>hpverse@gmail.com</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shine Native. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
