"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { Property, Inquiry } from "@/types/property"
import propertiesData from "@/data/properties.json"

interface PropertyContextType {
  properties: Property[]
  inquiries: Inquiry[]
  setProperties: (properties: Property[]) => void
  addProperty: (property: Property) => void
  updateProperty: (id: string, property: Property) => void
  deleteProperty: (id: string) => void
  addInquiry: (inquiry: Inquiry) => void
  deleteInquiry: (id: string) => void
  markInquiryAsRead: (id: string) => void
  resetToOriginal: () => void
  downloadJSON: () => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

const STORAGE_KEY = "shine_native_properties"
const INQUIRY_STORAGE_KEY = "shine_native_inquiries"

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setPropertiesState] = useState<Property[]>([])
  const [inquiries, setInquiriesState] = useState<Inquiry[]>([])

  useEffect(() => {
    // Load from localStorage or fall back to JSON file
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setPropertiesState(JSON.parse(stored))
      } catch {
        setPropertiesState(propertiesData as Property[])
      }
    } else {
      setPropertiesState(propertiesData as Property[])
    }

    // Load inquiries
    const storedInquiries = localStorage.getItem(INQUIRY_STORAGE_KEY)
    if (storedInquiries) {
      try {
        setInquiriesState(JSON.parse(storedInquiries))
      } catch {
        setInquiriesState([])
      }
    }
  }, [])

  const setProperties = (newProperties: Property[]) => {
    setPropertiesState(newProperties)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProperties))
  }

  const setInquiries = (newInquiries: Inquiry[]) => {
    setInquiriesState(newInquiries)
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(newInquiries))
  }

  const addProperty = (property: Property) => {
    const newProperties = [...properties, property]
    setProperties(newProperties)
  }

  const updateProperty = (id: string, property: Property) => {
    const newProperties = properties.map((p) => (p.id === id ? property : p))
    setProperties(newProperties)
  }

  const deleteProperty = (id: string) => {
    const newProperties = properties.filter((p) => p.id !== id)
    setProperties(newProperties)
  }

  const addInquiry = (inquiry: Inquiry) => {
    const newInquiries = [inquiry, ...inquiries]
    setInquiries(newInquiries)
  }

  const deleteInquiry = (id: string) => {
    const newInquiries = inquiries.filter((i) => i.id !== id)
    setInquiries(newInquiries)
  }

  const markInquiryAsRead = (id: string) => {
    const newInquiries = inquiries.map((i) => 
      i.id === id ? { ...i, status: 'Read' as const } : i
    )
    setInquiries(newInquiries)
  }

  const resetToOriginal = () => {
    localStorage.removeItem(STORAGE_KEY)
    setPropertiesState(propertiesData as Property[])
  }

  const downloadJSON = () => {
    const dataStr = JSON.stringify(properties, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "properties.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        inquiries,
        setProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        addInquiry,
        deleteInquiry,
        markInquiryAsRead,
        resetToOriginal,
        downloadJSON,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperties() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider")
  }
  return context
}
