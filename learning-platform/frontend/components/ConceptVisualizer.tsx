'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ConceptNode {
  id: string
  label: string
  description: string
  color: string
  position: { x: number; y: number }
  connections?: string[]
}

interface ConceptVisualizerProps {
  title: string
  description: string
  nodes: ConceptNode[]
}

export default function ConceptVisualizer({ 
  title, 
  description, 
  nodes 
}: ConceptVisualizerProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNodeById = (id: string) => nodes.find(n => n.id === id)

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <svg 
            className="w-7 h-7 text-primary-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
            />
          </svg>
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Visual Area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 mb-6 min-h-[400px] border border-gray-200">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map(node => 
            node.connections?.map(targetId => {
              const target = getNodeById(targetId)
              if (!target) return null

              const isActive = activeNode === node.id || activeNode === targetId
              const isHovered = hoveredNode === node.id || hoveredNode === targetId

              return (
                <motion.line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.position.x}%`}
                  y1={`${node.position.y}%`}
                  x2={`${target.position.x}%`}
                  y2={`${target.position.y}%`}
                  stroke={isActive || isHovered ? '#0ea5e9' : '#d1d5db'}
                  strokeWidth={isActive || isHovered ? 3 : 2}
                  strokeDasharray={isActive ? '0' : '5,5'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isActive || isHovered ? 1 : 0.5 
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="transition-all duration-300"
                />
              )
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute',
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="cursor-pointer z-10"
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: activeNode === node.id ? 1.15 : 1,
              }}
              className="relative"
            >
              {/* Node Circle */}
              <div
                className={`
                  w-24 h-24 rounded-full flex items-center justify-center
                  shadow-lg border-4 transition-all duration-300
                  ${activeNode === node.id || hoveredNode === node.id
                    ? 'border-white shadow-2xl'
                    : 'border-white/50'
                  }
                `}
                style={{ 
                  backgroundColor: node.color,
                }}
              >
                <span className="text-white font-bold text-sm text-center px-2">
                  {node.label}
                </span>
              </div>

              {/* Pulse Effect */}
              {(activeNode === node.id || hoveredNode === node.id) && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Active Node Details */}
      {activeNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 border-2 border-primary-200"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
              style={{ backgroundColor: getNodeById(activeNode)?.color }}
            >
              {getNodeById(activeNode)?.label.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {getNodeById(activeNode)?.label}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {getNodeById(activeNode)?.description}
              </p>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!activeNode && (
        <div className="text-center text-sm text-gray-500 italic">
          Click on any node to see more details
        </div>
      )}
    </div>
  )
}

