'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlowStep {
  id: string
  title: string
  description: string
  icon?: string
}

interface FlowDiagramProps {
  steps: FlowStep[]
  title?: string
}

export default function FlowDiagram({ steps, title }: FlowDiagramProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    >
      {title && (
        <h3 className="text-xl font-semibold mb-6 text-gray-800">{title}</h3>
      )}
      
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-400 opacity-30"></div>
        
        <div className="space-y-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="relative flex items-start gap-4"
            >
              {/* Step Number Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-all ${
                  activeStep === step.id
                    ? 'bg-primary-600 text-white scale-110'
                    : 'bg-white text-primary-600 border-2 border-primary-500'
                }`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {index + 1}
              </motion.div>

              {/* Content Card */}
              <motion.div
                className={`flex-1 bg-gray-50 rounded-lg p-4 border-2 transition-all ${
                  activeStep === step.id
                    ? 'border-primary-500 shadow-md bg-primary-50'
                    : 'border-gray-200'
                }`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Arrow (except for last step) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStep === step.id ? 1 : 0.3 }}
                  className="absolute left-8 top-16 w-0.5 h-6 bg-primary-500"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

