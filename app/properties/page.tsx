"use client"

import { Header } from "@/components/Header"
import { PropertyGrid } from "@/components/PropertyGrid"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { MobileCTA } from "@/components/MobileCTA"

export default function PropertiesPage() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Header />
      <div className="pt-20">
        <PropertyGrid />
      </div>
      <Footer />
      <WhatsAppButton />
      <MobileCTA />
    </main>
  )
}
