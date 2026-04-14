export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  area: number
  bedrooms: number
  bathrooms: number
  type: string
  status: string
  featured: boolean
  images: string[]
  amenities: string[]
}

export interface Inquiry {
  id: string
  propertyId: string
  propertyTitle: string
  name: string
  email: string
  phone: string
  message: string
  date: string
  status: 'New' | 'Read'
}
