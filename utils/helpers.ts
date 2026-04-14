export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('en-IN')} sq ft`
}

export const WHATSAPP_NUMBER = "917574002696" // Updated number

export function generateWhatsAppLink(propertyTitle?: string): string {
  const message = propertyTitle
    ? `Hi, I am interested in your property: ${propertyTitle}`
    : "Hi, I am interested in your properties"
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
