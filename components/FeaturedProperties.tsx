"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "./PropertyCard"
import { PropertyModal } from "./PropertyModal"
import { useProperties } from "@/contexts/PropertyContext"
import type { Property } from "@/types/property"

export function FeaturedProperties() {
  const { properties } = useProperties()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  // Get featured properties first, then fill with regular properties to show 3
  const featuredProperties = properties
    .filter((p) => p.featured)
    .slice(0, 3)
  
  const displayProperties = featuredProperties.length >= 3 
    ? featuredProperties.slice(0, 3)
    : [...featuredProperties, ...properties.filter(p => !p.featured)].slice(0, 3)

  return (
    <section id="properties" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-3">
            Our Collection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our handpicked selection of luxury homes, each offering unique
            features and exceptional living experiences.
          </p>
        </motion.div>

        {/* Property Grid - Show 3-6 Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={setSelectedProperty}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/properties">
            <Button size="lg" className="gap-2 group">
              View All Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-muted-foreground text-sm mt-3">
            {properties.length} properties available
          </p>
        </motion.div>

        {/* Property Modal */}
        <PropertyModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      </div>
    </section>
  )
}
