'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeAnnotation {
  line: number
  startCol?: number
  endCol?: number
  label: string
  explanation: string
  color?: string
}

interface InteractiveCodeBlockProps {
  code: string
  language: string
  title?: string
  annotations: CodeAnnotation[]
}

export default function InteractiveCodeBlock({ 
  code, 
  language,
  title,
  annotations 
}: InteractiveCodeBlockProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)
  const [showAnnotations, setShowAnnotations] = useState(true)

  const codeLines = code.split('\n')

  const getAnnotationsForLine = (lineNum: number) => {
    return annotations.filter(a => a.line === lineNum)
  }

  const getAnnotationColor = (annotation: CodeAnnotation) => {
    return annotation.color || '#0ea5e9'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      {title && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-gray-300 font-medium">{title}</span>
          </div>
          <span className="text-xs text-gray-400 font-mono uppercase px-2 py-1 bg-gray-900/50 rounded">
            {language}
          </span>
        </div>
      )}

      <div className="flex">
        {/* Code Area */}
        <div className={`${showAnnotations ? 'flex-[2]' : 'flex-[3]'} bg-gray-900`}>
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm whitespace-pre">
              {codeLines.map((line, index) => {
                const lineNum = index + 1
                const lineAnnotations = getAnnotationsForLine(lineNum)
                const isHovered = hoveredLine === lineNum
                const hasAnnotations = lineAnnotations.length > 0

                return (
                  <motion.div
                    key={index}
                    onMouseEnter={() => setHoveredLine(lineNum)}
                    onMouseLeave={() => setHoveredLine(null)}
                    className={`
                      relative flex items-start gap-4 group transition-all duration-200
                      ${isHovered ? 'bg-gray-800/50' : ''}
                      ${hasAnnotations ? 'cursor-pointer' : ''}
                    `}
                    whileHover={hasAnnotations ? { x: 4 } : {}}
                  >
                    {/* Line Number */}
                    <span className={`
                      select-none w-7 text-right flex-shrink-0 transition-colors duration-200
                      ${isHovered ? 'text-primary-400' : 'text-gray-500'}
                    `}>
                      {lineNum}
                    </span>

                    {/* Code Line */}
                    <code className="flex-1 text-gray-100 leading-relaxed">
                      {line || ' '}
                    </code>

                    {/* Annotation Indicators */}
                    {hasAnnotations && (
                      <div className="flex gap-1 pr-2">
                        {lineAnnotations.map((annotation, annotationIndex) => {
                          const globalIndex = annotations.indexOf(annotation)
                          const isActive = activeAnnotation === globalIndex

                          return (
                            <motion.button
                              key={annotationIndex}
                              onClick={() => setActiveAnnotation(
                                isActive ? null : globalIndex
                              )}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className={`
                                w-6 h-6 rounded-full flex items-center justify-center
                                text-xs font-bold transition-all duration-200
                                ${isActive
                                  ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900'
                                  : 'hover:ring-2 hover:ring-white/50'
                                }
                              `}
                              style={{
                                backgroundColor: getAnnotationColor(annotation),
                                opacity: isActive || isHovered ? 1 : 0.6,
                              }}
                            >
                              {globalIndex + 1}
                            </motion.button>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </pre>
          </div>
        </div>

        {/* Annotations Panel */}
        <div className={`${showAnnotations ? 'w-full md:w-96' : 'hidden'} bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col min-h-[200px]`}>
          <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Explanations
            </h4>
            <button 
              onClick={() => setShowAnnotations(false)}
              className="text-gray-500 hover:text-gray-700 md:hidden"
              aria-label="Hide annotations panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="px-4 py-2 border-b border-gray-200 bg-gray-100">
            <button 
              onClick={() => setShowAnnotations(false)}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Hide panel
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 max-h-[50vh]">
            <AnimatePresence mode="wait">
              {activeAnnotation !== null ? (
                <motion.div
                  key={activeAnnotation}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div
                    className="w-full p-4 rounded-lg shadow-sm border-l-4"
                    style={{
                      backgroundColor: `${getAnnotationColor(annotations[activeAnnotation])}10`,
                      borderLeftColor: getAnnotationColor(annotations[activeAnnotation]),
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-bold text-gray-900 flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            backgroundColor: getAnnotationColor(annotations[activeAnnotation]),
                          }}
                        >
                          {activeAnnotation + 1}
                        </span>
                        {annotations[activeAnnotation].label}
                      </h5>
                      <button
                        onClick={() => setActiveAnnotation(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {annotations[activeAnnotation].explanation}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      Line {annotations[activeAnnotation].line}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <svg 
                    className="w-16 h-16 mx-auto text-gray-300 mb-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <p className="text-sm text-gray-500 mb-4">
                    Click on numbered badges to see explanations
                  </p>
                  {annotations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Available Annotations:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {annotations.map((annotation, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveAnnotation(index)}
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-white hover:shadow-lg transition-all"
                            style={{ backgroundColor: getAnnotationColor(annotation) }}
                          >
                            {index + 1}. {annotation.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {!showAnnotations && (
          <div className="flex items-center justify-center p-4 bg-gray-100 border-l border-gray-200">
            <button 
              onClick={() => setShowAnnotations(true)}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Show explanations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

