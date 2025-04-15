"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

type NavItem = {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            AnimatedNav
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t"
        >
          <nav className="container py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                pathname={pathname}
                onClick={() => setMobileMenuOpen(false)}
                mobile
              />
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}

function NavItem({
  item,
  pathname,
  onClick,
  mobile = false,
}: {
  item: NavItem
  pathname: string
  onClick?: () => void
  mobile?: boolean
}) {
  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={cn(
        "relative px-1 py-2 text-sm font-medium transition-colors",
        mobile ? "text-foreground/70 hover:text-foreground" : "text-foreground/70 hover:text-foreground",
        isActive ? "text-foreground" : "",
      )}
      onClick={onClick}
    >
      {item.name}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-foreground"
          layoutId="navigation-underline"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  )
}
