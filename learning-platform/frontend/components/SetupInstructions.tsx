'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SetupStep {
  id: string
  title: string
  description: string
  commands?: string[]
  explanation?: string
  tips?: string[]
}

interface SetupInstructionsProps {
  projectTitle: string
  projectNumber: number
}

export default function SetupInstructions({ projectTitle, projectNumber }: SetupInstructionsProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [expandedTips, setExpandedTips] = useState<number | null>(null)

  const steps: SetupStep[] = [
    {
      id: 'prerequisites',
      title: 'Check Prerequisites',
      description: 'Ensure you have the required tools installed on your system',
      commands: [
        'python --version  # Should be 3.11+',
        'node --version    # Should be 18+',
        'npm --version     # Comes with Node.js'
      ],
      explanation: 'These commands verify that Python and Node.js are installed and meet the minimum version requirements.',
      tips: [
        'If Python is not installed, download from python.org',
        'If Node.js is not installed, download from nodejs.org',
        'Use pyenv or nvm to manage multiple versions'
      ]
    },
    {
      id: 'clone',
      title: 'Get the Project Files',
      description: 'Create a new directory and set up your project structure',
      commands: [
        'mkdir project-' + projectNumber,
        'cd project-' + projectNumber,
        'touch main.py',
        'touch requirements.txt'
      ],
      explanation: 'We create a dedicated folder for this project and the necessary Python files.',
      tips: [
        'Use descriptive folder names for better organization',
        'Keep each project in its own directory',
        'Consider using version control (git init)'
      ]
    },
    {
      id: 'backend-setup',
      title: 'Set Up Python Environment',
      description: 'Create a virtual environment and install dependencies',
      commands: [
        '# Create virtual environment',
        'python -m venv venv',
        '',
        '# Activate virtual environment',
        'source venv/bin/activate  # On Mac/Linux',
        'venv\\Scripts\\activate    # On Windows',
        '',
        '# Install FastAPI and dependencies',
        'pip install fastapi uvicorn[standard]'
      ],
      explanation: 'Virtual environments isolate project dependencies, preventing conflicts between different projects.',
      tips: [
        'Always activate venv before installing packages',
        'You should see (venv) in your terminal prompt when activated',
        'Use "deactivate" to exit the virtual environment'
      ]
    },
    {
      id: 'write-code',
      title: 'Write Your Code',
      description: 'Implement the project according to the specifications',
      commands: [
        '# Open main.py in your editor',
        'code main.py  # If using VS Code',
        '',
        '# Or use any text editor:',
        'nano main.py',
        'vim main.py'
      ],
      explanation: 'Follow the project requirements and code examples to build your application.',
      tips: [
        'Start with the basic structure first',
        'Test each feature as you build it',
        'Refer to the code examples in this project',
        'Don\'t hesitate to experiment and learn'
      ]
    },
    {
      id: 'run',
      title: 'Run the Application',
      description: 'Start your server and test the application',
      commands: [
        '# Start the FastAPI server',
        'uvicorn main:app --reload',
        '',
        '# Server will start at:',
        'http://localhost:8000',
        '',
        '# View API documentation:',
        'http://localhost:8000/docs'
      ],
      explanation: 'The --reload flag enables auto-reload when you make code changes during development.',
      tips: [
        'Keep the server running in one terminal',
        'Open another terminal for testing',
        'Use the /docs endpoint to test your API',
        'Press Ctrl+C to stop the server'
      ]
    },
    {
      id: 'test',
      title: 'Test Your Implementation',
      description: 'Verify everything works correctly',
      commands: [
        '# Test with curl',
        'curl http://localhost:8000',
        '',
        '# Or open in browser:',
        'open http://localhost:8000',
        '',
        '# Check API docs:',
        'open http://localhost:8000/docs'
      ],
      explanation: 'Testing ensures your implementation meets the project requirements.',
      tips: [
        'Test all endpoints thoroughly',
        'Try different inputs to ensure robustness',
        'Check error handling',
        'Compare with expected outputs'
      ]
    }
  ]

  const copyToClipboard = (text: string, index: number) => {
    // Remove comments for cleaner copy
    const cleanText = text.split('\n')
      .filter(line => !line.trim().startsWith('#'))
      .join('\n')
      .trim()

    navigator.clipboard.writeText(cleanText)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const currentStep = steps[activeStep]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center text-2xl">
            🚀
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Setup Instructions
            </h3>
            <p className="text-green-100 text-sm">
              Build this project on your local machine
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Progress</h4>
          <span className="text-sm text-gray-600">
            Step {activeStep + 1} of {steps.length}
          </span>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all
                ${activeStep === index
                  ? 'bg-green-600 text-white shadow-lg'
                  : activeStep > index
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }
              `}
            >
              <span className="flex items-center gap-2">
                {activeStep > index ? '✓' : index + 1}
                <span className="hidden md:inline">{step.title}</span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {/* Step Header */}
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                {activeStep + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentStep.title}
                </h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>
            </div>
          </div>

          {/* Commands */}
          {currentStep.commands && currentStep.commands.length > 0 && (
            <div className="mb-6">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-gray-400 font-mono">terminal</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentStep.commands!.join('\n'), activeStep)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium transition-colors"
                  >
                    {copiedIndex === activeStep ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto bg-transparent m-0">
                  <code className="font-mono text-sm leading-relaxed whitespace-pre" style={{ color: '#e5e7eb', display: 'block' }}>
                    {currentStep.commands.join('\n')}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* Explanation */}
          {currentStep.explanation && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h5 className="font-semibold text-blue-900 mb-1">Why this step?</h5>
                  <p className="text-blue-800 leading-relaxed">{currentStep.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          {currentStep.tips && currentStep.tips.length > 0 && (
            <div>
              <button
                onClick={() => setExpandedTips(expandedTips === activeStep ? null : activeStep)}
                className="w-full flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors mb-2"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-semibold text-amber-900">
                    Pro Tips ({currentStep.tips.length})
                  </span>
                </div>
                <motion.svg
                  animate={{ rotate: expandedTips === activeStep ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {expandedTips === activeStep && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      {currentStep.tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-amber-600 font-bold flex-shrink-0">•</span>
                          <p className="text-amber-900 leading-relaxed">{tip}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
            ${activeStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow'
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all
                ${index === activeStep
                  ? 'bg-green-600 w-8'
                  : index < activeStep
                    ? 'bg-green-400'
                    : 'bg-gray-300'
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
            ${activeStep === steps.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          Next
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

