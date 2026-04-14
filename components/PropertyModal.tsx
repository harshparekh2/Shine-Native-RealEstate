"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize,
  Bed,
  Bath,
  Check,
  MessageCircle,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Property, Inquiry } from "@/types/property"
import { formatPrice, formatArea, generateWhatsAppLink } from "@/utils/helpers"
import { useProperties } from "@/contexts/PropertyContext"

interface PropertyModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
}

export function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showInquiryForm, setShowInquiryForm] = useState(false)

  if (!property) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-card rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-card-foreground" />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 min-h-full">
                {/* Image Gallery */}
                <div className="relative aspect-square md:aspect-auto md:h-full bg-muted">
                  <Image
                    src={property.images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Image Navigation */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 text-card-foreground" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 text-card-foreground" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex
                                ? "bg-card w-6"
                                : "bg-card/50 hover:bg-card/80"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Image Thumbnails */}
                  <div className="absolute bottom-16 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
                    {property.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-primary"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6 md:p-8 lg:p-10 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {!showInquiryForm ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                          <Badge className="bg-primary text-primary-foreground">
                            {property.type}
                          </Badge>
                          <Badge variant="outline">{property.status}</Badge>
                          {property.featured && (
                            <Badge className="bg-accent text-accent-foreground">
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Price */}
                        <p className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
                          {formatPrice(property.price)}
                        </p>

                        {/* Title */}
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-card-foreground mb-4">
                          {property.title}
                        </h2>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-muted-foreground mb-6">
                          <MapPin className="h-5 w-5 flex-shrink-0" />
                          <span>{property.location}</span>
                        </div>

                        {/* Key Features */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg mb-6">
                          <div className="text-center">
                            <Bed className="h-6 w-6 mx-auto mb-1 text-primary" />
                            <p className="text-lg font-semibold text-card-foreground">
                              {property.bedrooms}
                            </p>
                            <p className="text-xs text-muted-foreground">Bedrooms</p>
                          </div>
                          <div className="text-center">
                            <Bath className="h-6 w-6 mx-auto mb-1 text-primary" />
                            <p className="text-lg font-semibold text-card-foreground">
                              {property.bathrooms}
                            </p>
                            <p className="text-xs text-muted-foreground">Bathrooms</p>
                          </div>
                          <div className="text-center">
                            <Maximize className="h-6 w-6 mx-auto mb-1 text-primary" />
                            <p className="text-lg font-semibold text-card-foreground">
                              {formatArea(property.area)}
                            </p>
                            <p className="text-xs text-muted-foreground">Area</p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-card-foreground mb-2">
                            Description
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {property.description}
                          </p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-8">
                          <h3 className="font-semibold text-card-foreground mb-3">
                            Amenities
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {property.amenities.map((amenity, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-muted-foreground"
                              >
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={generateWhatsAppLink(property.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button className="w-full gap-2" size="lg">
                              <MessageCircle className="h-5 w-5" />
                              WhatsApp
                            </Button>
                          </a>
                          <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 gap-2"
                            onClick={() => setShowInquiryForm(true)}
                          >
                            <Send className="h-5 w-5" />
                            Send Inquiry
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inquiry"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <InquiryForm
                          propertyId={property.id}
                          propertyTitle={property.title}
                          onBack={() => setShowInquiryForm(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface InquiryFormProps {
  propertyId: string
  propertyTitle: string
  onBack: () => void
}

function InquiryForm({ propertyId, propertyTitle, onBack }: InquiryFormProps) {
  const { addInquiry } = useProperties()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I am interested in the property: ${propertyTitle}`,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    // Save to context
    const inquiry: Inquiry = {
      id: Date.now().toString(),
      propertyId,
      propertyTitle,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      date: new Date().toISOString(),
      status: 'New',
    }
    addInquiry(inquiry)

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
        >
          <Check className="h-8 w-8 text-primary" />
        </motion.div>
        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground mb-6">
          Your inquiry has been received. Our team will get back to you shortly.
        </p>
        <Button variant="outline" onClick={onBack}>
          Back to Property
        </Button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted-foreground hover:text-card-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Details
      </button>

      <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
        Send Inquiry
      </h3>
      <p className="text-muted-foreground mb-6">
        Fill out the form below and we will get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1">
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? "border-destructive" : "border-input"
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1">
            Phone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? "border-destructive" : "border-input"
            }`}
            placeholder="Your phone number"
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? "border-destructive" : "border-input"
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
              errors.message ? "border-destructive" : "border-input"
            }`}
            placeholder="Your message..."
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg">
          Send Inquiry
        </Button>
      </form>
    </div>
  )
}
