"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { FeaturedProperties } from "@/components/FeaturedProperties"
import { About } from "@/components/About"
import { Footer } from "@/components/Footer"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      <main className={`min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <Header />
        <Hero />
        <FeaturedProperties />
        <About />
        <Footer />
      </main>
    </>
  )
}
