import type React from "react"

interface HeroSectionProps {
  optimizationSectionRef: React.RefObject<HTMLDivElement>
}

export function HeroSection({ optimizationSectionRef }: HeroSectionProps) {
  return (
    <section className="space-y-4 text-center max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        {"More than AI Powered Yield Optimizer, "}
        <span className="text-[#6366F1]">Chainlink Fund Manager?</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-400">
        Monitored by Data Feeds. 24/7 by Automation. Optimized by Functions.
      </p>
    </section>
  )
}
