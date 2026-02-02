'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Component {
  id: string
  name: string
  description: string
  color: string
  type: 'user' | 'client' | 'api' | 'server' | 'database' | 'auth'
  position: { x: number; y: number }
}

interface ArchitectureDiagramProps {
  components: Component[]
  title?: string
  connections?: Array<{ from: string; to: string }>
}

export default function ArchitectureDiagram({
  components,
  title,
  connections = [],
}: ArchitectureDiagramProps) {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    >
      {title && (
        <h3 className="text-xl font-semibold mb-6 text-gray-800">{title}</h3>
      )}
      
      <div
        className="relative w-full"
        style={{
          height: '600px',       // fixed canvas height
          overflow: 'hidden',    // prevents bleed
        }}
      >
        {/* SVG for connections */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          {connections.map((conn, idx) => {
            const from = components.find((c) => c.id === conn.from)
            const to = components.find((c) => c.id === conn.to)
            if (!from || !to) return null

            const x1 = from.position.x
            const y1 = from.position.y
            const x2 = to.position.x
            const y2 = to.position.y

            return (
              <motion.line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: hoveredComponent === conn.from || hoveredComponent === conn.to ? 1 : 0.3,
                  opacity: hoveredComponent === conn.from || hoveredComponent === conn.to ? 0.6 : 0.2,
                }}
                transition={{ duration: 0.3 }}
              />
            )
          })}
        </svg>

        {/* Components */}
        {components.map((component) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: hoveredComponent === component.id ? 1.05 : 1,
            }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="absolute"
            style={{
              left: `${component.position.x}%`,
              top: `${component.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredComponent(component.id)}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            <div
              className={`rounded-lg p-4 shadow-md border-2 cursor-pointer transition-all ${
                hoveredComponent === component.id
                  ? 'shadow-lg border-opacity-100'
                  : 'border-opacity-50'
              }`}
              style={{
                backgroundColor: component.color,
                borderColor: component.color,
                minWidth: '120px',
                textAlign: 'center',
              }}
            >
              <div className="font-semibold text-white mb-1">{component.name}</div>
              <div className="text-[10px] tracking-wider uppercase opacity-70 text-white">
                {component.type}
              </div>
              {hoveredComponent === component.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-white mt-2 bg-black bg-opacity-30 rounded px-2 py-1"
                >
                  {component.description}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

