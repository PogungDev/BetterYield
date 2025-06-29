"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ModernButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function ModernButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  className,
}: ModernButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25",
    secondary: "glass glass-hover border-white/20 text-white",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
