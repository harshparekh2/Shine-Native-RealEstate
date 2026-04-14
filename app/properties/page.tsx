"use client"

import { Header } from "@/components/Header"
import { PropertyGrid } from "@/components/PropertyGrid"
import { Footer } from "@/components/Footer"

export default function PropertiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <PropertyGrid />
      </div>
      <Footer />
    </main>
  )
}
