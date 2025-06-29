"use client"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight } from "lucide-react"

interface CtaSectionProps {
  onScanClick: () => void
  onHowItWorksClick: () => void
}

export function CtaSection({ onScanClick, onHowItWorksClick }: CtaSectionProps) {
  return (
    <section className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-4xl">
      <Button
        onClick={onScanClick}
        className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Search className="w-5 h-5" />
        Scan Wallet & Optimize
        <ArrowRight className="w-5 h-5" />
      </Button>
      <Button
        onClick={onHowItWorksClick}
        variant="outline"
        className="bg-transparent border border-gray-600 text-white px-8 py-6 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        How It Works
      </Button>
    </section>
  )
}
