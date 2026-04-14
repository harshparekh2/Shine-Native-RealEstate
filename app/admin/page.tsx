"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Plus,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  LogOut,
  Search,
  X,
  ArrowLeft,
  Save,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProperties } from "@/contexts/PropertyContext"
import type { Property, Inquiry } from "@/types/property"
import { formatPrice, formatArea } from "@/utils/helpers"
import { ImageUploader } from "@/components/ImageUploader"

// Admin credentials (simple frontend check as per requirements)
const ADMIN_EMAIL = "hpverse@gmail.com"
const ADMIN_PASSWORD = "Harsh@123"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Check for existing session
  useEffect(() => {
    const session = localStorage.getItem("shine_native_admin_session")
    if (session === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem("shine_native_admin_session", "true")
      setLoginError("")
    } else {
      setLoginError("Invalid email or password")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("shine_native_admin_session")
  }

  if (!isLoggedIn) {
    return <LoginForm onSubmit={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={loginError} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  error: string
}

function LoginForm({ onSubmit, email, setEmail, password, setPassword, error }: LoginFormProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-primary">
                Shine Native
              </span>
            </Link>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Sign in to manage properties
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="inline h-4 w-4 mr-1" />
                Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

interface AdminDashboardProps {
  onLogout: () => void
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    resetToOriginal, 
    downloadJSON,
    inquiries,
    deleteInquiry,
    markInquiryAsRead
  } = useProperties()
  const [activeTab, setActiveTab] = useState<"properties" | "inquiries">("properties")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: "property" | "inquiry", id: string } | null>(null)

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = (property: Property) => {
    if (isAddingNew) {
      addProperty(property)
    } else {
      updateProperty(property.id, property)
    }
    setEditingProperty(null)
    setIsAddingNew(false)
  }

  const handleDelete = () => {
    if (!showDeleteConfirm) return
    if (showDeleteConfirm.type === "property") {
      deleteProperty(showDeleteConfirm.id)
    } else {
      deleteInquiry(showDeleteConfirm.id)
    }
    setShowDeleteConfirm(null)
  }

  const handleAddNew = () => {
    const newProperty: Property = {
      id: Date.now().toString(),
      title: "",
      description: "",
      price: 0,
      location: "",
      area: 0,
      bedrooms: 0,
      bathrooms: 0,
      type: "Apartment",
      status: "Available",
      featured: false,
      images: [],
      amenities: [],
    }
    setEditingProperty(newProperty)
    setIsAddingNew(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-serif text-xl font-bold text-primary">
                Shine Native
              </Link>
              <Badge variant="secondary">Admin</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">View Site</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => {
              setActiveTab("properties")
              setSearchQuery("")
            }}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "properties"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Properties
              <Badge variant="secondary" className="ml-1">
                {properties.length}
              </Badge>
            </div>
            {activeTab === "properties" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab("inquiries")
              setSearchQuery("")
            }}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "inquiries"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Inquiries
              {inquiries.filter((i) => i.status === "New").length > 0 && (
                <Badge className="ml-1 bg-primary text-primary-foreground">
                  {inquiries.filter((i) => i.status === "New").length}
                </Badge>
              )}
            </div>
            {activeTab === "inquiries" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>

        {/* Stats */}
        {activeTab === "properties" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{properties.length}</p>
                <p className="text-sm text-muted-foreground">Total Properties</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">
                  {properties.filter((p) => p.featured).length}
                </p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">
                  {properties.filter((p) => p.status === "Available").length}
                </p>
                <p className="text-sm text-muted-foreground">Available</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">
                  {new Set(properties.map((p) => p.type)).size}
                </p>
                <p className="text-sm text-muted-foreground">Property Types</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{inquiries.length}</p>
                <p className="text-sm text-muted-foreground">Total Inquiries</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-primary">
                  {inquiries.filter((i) => i.status === "New").length}
                </p>
                <p className="text-sm text-muted-foreground">New</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">
                  {inquiries.filter((i) => i.status === "Read").length}
                </p>
                <p className="text-sm text-muted-foreground">Responded</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">
                  {new Set(inquiries.map((i) => i.propertyId)).size}
                </p>
                <p className="text-sm text-muted-foreground">Properties with Inquiries</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={activeTab === "properties" ? "Search properties..." : "Search inquiries..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {activeTab === "properties" && (
              <Button onClick={handleAddNew} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            )}
            <Button variant="outline" onClick={downloadJSON} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export JSON</span>
            </Button>
            <Button variant="outline" onClick={resetToOriginal} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        {/* List Content */}
        {activeTab === "properties" ? (
          <Card>
            <CardHeader>
              <CardTitle>Properties ({filteredProperties.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Image */}
                    <div className="relative w-full sm:w-24 h-32 sm:h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {property.title}
                        </h3>
                        {property.featured && (
                          <Badge variant="secondary" className="text-xs">Featured</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {property.location} • {property.type}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {formatPrice(property.price)} • {formatArea(property.area)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProperty(property)}
                        className="flex-1 sm:flex-none gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteConfirm({ type: "property", id: property.id })}
                        className="flex-1 sm:flex-none gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}

                {filteredProperties.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No properties found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Inquiries ({filteredInquiries.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => (
                  <motion.div
                    key={inquiry.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex flex-col gap-4 p-4 border rounded-lg transition-colors ${
                      inquiry.status === "New" 
                        ? "border-primary/30 bg-primary/5" 
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground">
                            {inquiry.name}
                          </h3>
                          {inquiry.status === "New" && (
                            <Badge className="text-[10px] h-4">New</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {inquiry.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {inquiry.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {new Date(inquiry.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="p-3 bg-background/50 rounded-md border border-border/50 mb-3">
                          <p className="text-sm font-medium text-foreground mb-1">
                            Property: <span className="text-primary">{inquiry.propertyTitle}</span>
                          </p>
                          <p className="text-sm text-muted-foreground italic">
                            "{inquiry.message}"
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        {inquiry.status === "New" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markInquiryAsRead(inquiry.id)}
                            className="flex-1 sm:flex-none gap-1 text-primary hover:text-primary"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Mark Read
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDeleteConfirm({ type: "inquiry", id: inquiry.id })}
                          className="flex-1 sm:flex-none gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredInquiries.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No inquiries found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {editingProperty && (
            <PropertyEditModal
              property={editingProperty}
              isNew={isAddingNew}
              onSave={handleSave}
              onClose={() => {
                setEditingProperty(null)
                setIsAddingNew(false)
              }}
            />
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-foreground/50"
                onClick={() => setShowDeleteConfirm(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Delete {showDeleteConfirm.type === "property" ? "Property" : "Inquiry"}?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      This action cannot be undone. This {showDeleteConfirm.type} will be permanently removed.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface PropertyEditModalProps {
  property: Property
  isNew: boolean
  onSave: (property: Property) => void
  onClose: () => void
}

function PropertyEditModal({ property, isNew, onSave, onClose }: PropertyEditModalProps) {
  const [formData, setFormData] = useState<Property>(property)
  const [amenitiesInput, setAmenitiesInput] = useState(property.amenities.join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.images.length === 0) {
      alert("Please upload at least one image")
      return
    }
    
    const updatedProperty = {
      ...formData,
      amenities: amenitiesInput.split(",").map((a) => a.trim()).filter(Boolean),
    }
    onSave(updatedProperty)
  }

  const handleImagesChange = (images: string[]) => {
    setFormData({ ...formData, images })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-card rounded-xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            {isNew ? "Add New Property" : "Edit Property"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price *</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Area (sq ft) *</label>
                  <Input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location *</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bedrooms</label>
                  <Input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bathrooms</label>
                  <Input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Studio">Studio</option>
                    <option value="Loft">Loft</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Condo">Condo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Pending">Pending</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-input"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Property
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Property Photos *
                </label>
                <ImageUploader
                  images={formData.images}
                  onImagesChange={handleImagesChange}
                  maxImages={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Amenities (comma-separated)
                </label>
                <textarea
                  value={amenitiesInput}
                  onChange={(e) => setAmenitiesInput(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
                  placeholder="Pool, Gym, Parking, Garden"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            {isNew ? "Add Property" : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </>
  )
}
