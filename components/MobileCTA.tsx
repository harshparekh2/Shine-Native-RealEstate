"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateWhatsAppLink } from "@/utils/helpers"

export function MobileCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card border-t border-border p-4 safe-area-bottom"
    >
      <div className="flex gap-3">
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A]">
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </Button>
        </a>
        <a href="tel:+917574002596" className="flex-1">
          <Button variant="outline" className="w-full gap-2">
            <Phone className="h-5 w-5" />
            Call Now
          </Button>
        </a>
      </div>
    </motion.div>
  )
}
