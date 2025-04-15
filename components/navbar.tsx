"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

function NavItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick()

    // If we're already on the page, just scroll to top
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <Link
      href={href}
      className={`relative font-medium transition-colors ${
        isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
      }`}
      onClick={handleClick}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 w-full bg-pink-600"
          layoutId="navigation-underline"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-pink-600">AI Figure</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/how-it-works">How It Works</NavItem>
            <NavItem href="/examples">Examples</NavItem>
            <NavItem href="/features">Features</NavItem>
            <Button className="bg-pink-600 hover:bg-pink-700" asChild>
              <Link href="/upload">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-pink-600 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-b border-gray-200"
        >
          <div className="container px-4 py-4 space-y-3">
            <NavItem href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </NavItem>
            <NavItem href="/how-it-works" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </NavItem>
            <NavItem href="/examples" onClick={() => setIsMenuOpen(false)}>
              Examples
            </NavItem>
            <NavItem href="/features" onClick={() => setIsMenuOpen(false)}>
              Features
            </NavItem>
            <Button className="w-full bg-pink-600 hover:bg-pink-700" asChild>
              <Link href="/upload" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
