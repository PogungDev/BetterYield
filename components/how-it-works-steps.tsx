import { ArrowRight } from "lucide-react"

export function HowItWorksSteps() {
  return (
    <section className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400 mt-8 max-w-4xl w-full justify-center">
      <div className="flex items-center gap-2">
        <span className="text-white">1. Connect Wallet</span>
        <ArrowRight className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white">2. Analyze Positions</span>
        <ArrowRight className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white">3. See Optimization Potential</span>
      </div>
    </section>
  )
}
