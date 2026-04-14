"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Maximize, Bed, Bath } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/types/property"
import { formatPrice, formatArea } from "@/utils/helpers"

interface PropertyCardProps {
  property: Property
  onViewDetails: (property: Property) => void
  index?: number
}

export function PropertyCard({ property, onViewDetails, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Featured Badge */}
          {property.featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}

          {/* Property Type Badge */}
          <Badge
            variant="secondary"
            className="absolute top-4 right-4 bg-card/90 text-card-foreground backdrop-blur-sm"
          >
            {property.type}
          </Badge>

          {/* Quick View Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Button
              onClick={() => onViewDetails(property)}
              className="w-full"
              size="sm"
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5">
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl md:text-2xl font-serif font-bold text-primary">
              {formatPrice(property.price)}
            </span>
            <Badge variant="outline" className="text-xs">
              {property.status}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-semibold text-card-foreground mb-2 line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Maximize className="h-4 w-4" />
              <span className="text-sm">{formatArea(property.area)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
