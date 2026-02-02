'use client'

import { useState } from 'react'

interface Annotation {
  line: number
  label: string
  explanation: string
}

interface Props {
  code: string
  annotations: Annotation[]
  onSelect: (
    payload: { annotation: Annotation; y: number } | null
  ) => void
}

export default function MultiProjectAnnotatedCode({
  code,
  annotations,
  onSelect,
}: Props) {
  const [activeLine, setActiveLine] = useState<number | null>(null)

  const lines = code.split('\n')

  const getAnnotation = (lineNumber: number) =>
    annotations.find(a => a.line === lineNumber)

  const isCommentLine = (line: string) => {
    const trimmed = line.trim()
    return (
      trimmed.startsWith('#') ||
      trimmed.startsWith('"""') ||
      trimmed.startsWith("'''")
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
      {lines.map((line, index) => {
        const lineNumber = index + 1
        const annotation = getAnnotation(lineNumber)
        const isComment = isCommentLine(line)

        return (
          <div key={index} className="flex items-start justify-between gap-4">
            {/* CODE */}
            <pre
              className={`whitespace-pre-wrap flex-1 ${
                isComment ? 'text-green-400 italic' : ''
              }`}
            >
              {line || ' '}
            </pre>

            {/* NUMBER */}
            {annotation && !isComment ? (
              <button
                onClick={(e) => {
                  const next = activeLine === lineNumber ? null : lineNumber
                  setActiveLine(next)
                  if (next && annotation) {
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                    const absoluteY = rect.top + window.scrollY
                    onSelect({
                      annotation,
                      y: absoluteY,
                    })
                  } else {
                    onSelect(null)
                  }
                }}
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center mt-1
                  ${
                    activeLine === lineNumber
                      ? 'bg-blue-500'
                      : 'bg-gray-600 hover:bg-blue-400'
                  }
                `}
              >
                {annotations.indexOf(annotation) + 1}
              </button>
            ) : (
              <div className="w-6 h-6" />
            )}
          </div>
        )
      })}
    </div>
  )
}
