"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-sans text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight whitespace-nowrap"
          >
            Discover Your Dream Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-white/90 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            Experience luxury living with our curated collection of premium properties.
            From stunning penthouses to serene villas, find the perfect place to call home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#properties">
              <Button size="lg" className="text-base px-10 bg-amber-600 hover:bg-amber-700 text-white border-none rounded-xl">
                Explore Properties
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-10 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-xl"
              >
                Get in Touch
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
