"use client"

import { CheckCircle, Circle } from "lucide-react"

interface ProgressIndicatorProps {
  currentStep: number
  steps: string[]
}

export function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                index < currentStep
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400 border-emerald-400 text-white shadow-lg shadow-emerald-500/30"
                  : index === currentStep
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg shadow-purple-500/30 animate-pulse"
                    : "bg-white/5 border-white/20 text-white/40"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : index === currentStep ? (
                <Circle className="w-5 h-5 fill-current" />
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </div>
            <span
              className={`mt-3 text-xs font-medium text-center transition-all duration-300 ${
                index <= currentStep ? "text-white" : "text-white/40"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
