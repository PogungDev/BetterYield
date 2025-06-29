"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ModernCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function ModernCard({ children, className, hover = true, glow = false }: ModernCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        hover && "glass-hover hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10",
        glow && "animate-glow",
        className,
      )}
    >
      {children}
    </div>
  )
}
