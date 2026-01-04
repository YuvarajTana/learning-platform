'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExplanationStep {
  id: string
  title: string
  description: string
  code?: string
  visual?: React.ReactNode
  details?: string[]
}

interface InteractiveExplanationProps {
  title: string
  steps: ExplanationStep[]
  defaultStep?: number
}

export default function InteractiveExplanation({ 
  title, 
  steps, 
  defaultStep = 0 
}: InteractiveExplanationProps) {
  const [activeStep, setActiveStep] = useState(defaultStep)
  const [hoveredDetail, setHoveredDetail] = useState<number | null>(null)

  const currentStep = steps[activeStep]

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
          {title}
        </h3>
      </div>

      {/* Step Navigator */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm 
                whitespace-nowrap transition-all duration-200
                ${activeStep === index
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              <span className={`
                flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                ${activeStep === index
                  ? 'bg-white text-primary-600'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {index + 1}
              </span>
              {step.title}
            </motion.button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {/* Step Description */}
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              {currentStep.title}
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Code Example */}
          {currentStep.code && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-gray-400 font-mono ml-2">code</span>
                </div>
                <pre className="p-4 overflow-x-auto bg-transparent m-0">
                  <code className="font-mono text-sm leading-relaxed whitespace-pre" style={{ color: '#e5e7eb', display: 'block' }}>
                    {currentStep.code}
                  </code>
                </pre>
              </div>
            </motion.div>
          )}

          {/* Visual Component */}
          {currentStep.visual && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              {currentStep.visual}
            </motion.div>
          )}

          {/* Additional Details */}
          {currentStep.details && currentStep.details.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h5 className="text-lg font-semibold text-gray-900 mb-3">
                Key Points:
              </h5>
              {currentStep.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onHoverStart={() => setHoveredDetail(index)}
                  onHoverEnd={() => setHoveredDetail(null)}
                  className="group relative"
                >
                  <div className={`
                    flex items-start gap-3 p-4 rounded-lg border-2 transition-all duration-200
                    ${hoveredDetail === index
                      ? 'bg-primary-50 border-primary-300 shadow-md'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }
                  `}>
                    <motion.div
                      animate={{ 
                        scale: hoveredDetail === index ? 1.2 : 1,
                        rotate: hoveredDetail === index ? 5 : 0 
                      }}
                      className={`
                        flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                        ${hoveredDetail === index
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-300 text-gray-700'
                        }
                      `}
                    >
                      {index + 1}
                    </motion.div>
                    <p className={`
                      text-sm leading-relaxed transition-colors duration-200
                      ${hoveredDetail === index ? 'text-gray-900' : 'text-gray-700'}
                    `}>
                      {detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${activeStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>

        <span className="text-sm text-gray-600 font-medium">
          Step {activeStep + 1} of {steps.length}
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${activeStep === steps.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200'
            }
          `}
        >
          Next
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

