'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface CodeSampleProps {
  code: string
  language: string
  title?: string
  explanation?: string
  showLineNumbers?: boolean
}

export default function CodeSample({
  code,
  language,
  title,
  explanation,
  showLineNumbers = true,
}: CodeSampleProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden border border-gray-300 shadow-lg bg-white"
    >
      {title && (
        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300 uppercase font-medium tracking-wide">{language}</span>
            <button
              onClick={copyToClipboard}
              className="text-xs text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-gray-700 font-medium"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
      <div className="relative bg-[#1e1e1e]">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.7',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            background: '#1e1e1e',
          }}
          lineNumberStyle={{
            minWidth: '3.5em',
            paddingRight: '1.5em',
            color: '#858585',
            userSelect: 'none',
            textAlign: 'right',
          }}
          wrapLines={true}
          lineProps={(lineNumber) => ({
            style: {
              display: 'block',
              width: '100%',
            }
          })}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {explanation && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>
        </div>
      )}
    </motion.div>
  )
}

