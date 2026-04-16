"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateWhatsAppLink } from "@/utils/helpers"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/properties", label: "Properties" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ]

  const showTransparent = isHomePage && !isScrolled

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent 
          ? "bg-transparent py-4" 
          : "bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 py-2 shadow-xl"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-110 border border-white/10 bg-slate-900/50">
              <Image
                src="/hp background.png"
                alt="HP VERSE REAL ESTATE Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-sans text-xl md:text-2xl font-black tracking-tight leading-none text-white">
                HP Verse
              </span>
              <span className="text-[10px] md:text-xs font-black tracking-[0.5em] uppercase mt-1 text-amber-400">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-bold tracking-widest text-white/80 hover:text-amber-400 transition-all duration-300 relative group uppercase"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#fbbf24]" />
              </Link>
            ))}
            
            <div className="h-6 w-px bg-white/10 mx-2" />

            <Link href="/admin">
              <Button 
                variant="ghost" 
                size="sm"
                className="font-bold text-white/70 hover:text-amber-400 hover:bg-white/5 tracking-widest uppercase text-[10px]"
              >
                Admin
              </Button>
            </Link>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="sm" 
                className="gap-2 rounded-full font-black px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg transition-all duration-500 hover:scale-105 border-none text-[10px] tracking-widest"
              >
                <Phone className="h-3 w-3" />
                CONTACT
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white shadow-lg"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60] md:hidden bg-slate-950/98 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    className="text-3xl font-black text-white hover:text-amber-400 transition-all duration-300 block py-2 uppercase tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <div className="h-px w-12 bg-amber-400/20 mx-auto mt-2" />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs mt-4 flex flex-col gap-4"
              >
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white/70 hover:text-amber-400 hover:bg-white/5 text-sm tracking-[0.2em] uppercase font-bold py-6 rounded-2xl">
                    Admin Panel
                  </Button>
                </Link>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full gap-3 h-16 rounded-2xl text-lg font-black bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xl shadow-amber-500/20 uppercase tracking-widest border-none">
                    <Phone className="h-5 w-5" />
                    Contact Us
                  </Button>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
