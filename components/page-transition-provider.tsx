"use client"

import type { ReactNode } from "react"
import { PageTransition } from "@/components/page-transition"

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
