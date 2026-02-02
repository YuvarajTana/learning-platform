'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'server' | 'database' | 'user' | 'cache' | 'queue' | 'api' | 'client' | 'auth' | 'storage';
  description?: string;
}

export interface Connection {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
  protocol?: string;
}

interface SystemVisualizationProps {
  nodes: Node[];
  connections: Connection[];
  title: string;
  description: string;
}

const nodeColors = {
  server: 'hsl(175, 80%, 50%)',
  database: 'hsl(270, 60%, 60%)',
  user: 'hsl(35, 90%, 55%)',
  cache: 'hsl(195, 80%, 45%)',
  queue: 'hsl(150, 60%, 50%)',
  api: 'hsl(200, 70%, 55%)',
  client: 'hsl(40, 85%, 60%)',
  auth: 'hsl(300, 65%, 65%)',
  storage: 'hsl(120, 50%, 60%)',
};

const getNodePosition = (id: string, nodes: Node[]) => {
  const node = nodes.find(n => n.id === id);
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
};

const getNodeTypeIcon = (type: Node['type'], x: number, y: number) => {
  const color = nodeColors[type];
  
  switch (type) {
    case 'server':
      return (
        <g>
          <rect
            x={x - 8}
            y={y - 8}
            width="16"
            height="16"
            rx="2"
            fill={color}
          />
          <rect
            x={x - 10}
            y={y - 10}
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </g>
      );
    case 'database':
      return (
        <g>
          <ellipse
            cx={x}
            cy={y - 2}
            rx="10"
            ry="6"
            fill={color}
          />
          <ellipse
            cx={x}
            cy={y + 2}
            rx="10"
            ry="6"
            fill={color}
          />
          <ellipse
            cx={x}
            cy={y + 6}
            rx="10"
            ry="6"
            fill={color}
          />
        </g>
      );
    case 'user':
      return (
        <g>
          <circle cx={x} cy={y - 2} r="6" fill={color} />
          <circle cx={x} cy={y + 4} r="8" fill="none" stroke={color} strokeWidth="1.5" />
        </g>
      );
    case 'cache':
      return (
        <g>
          <polygon
            points={`${x},${y - 10} ${x + 10},${y + 5} ${x - 10},${y + 5}`}
            fill={color}
          />
          <polygon
            points={`${x},${y - 12} ${x + 12},${y + 6} ${x - 12},${y + 6}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </g>
      );
    case 'queue':
      return (
        <g>
          <rect
            x={x - 12}
            y={y - 6}
            width="24"
            height="12"
            rx="2"
            fill={color}
          />
          <rect
            x={x - 14}
            y={y - 8}
            width="28"
            height="16"
            rx="3"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </g>
      );
    case 'api':
      return (
        <g>
          <rect
            x={x - 10}
            y={y - 10}
            width="20"
            height="20"
            rx="4"
            fill={color}
          />
          <text
            x={x}
            y={y + 3}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            API
          </text>
        </g>
      );
    case 'client':
      return (
        <g>
          <rect
            x={x - 10}
            y={y - 8}
            width="20"
            height="12"
            rx="2"
            fill={color}
          />
          <rect
            x={x - 12}
            y={y - 10}
            width="24"
            height="16"
            rx="3"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </g>
      );
    case 'auth':
      return (
        <g>
          <circle cx={x} cy={y} r="10" fill={color} />
          <path
            d={`M${x - 4} ${y - 2} L${x} ${y + 3} L${x + 6} ${y - 4}`}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    case 'storage':
      return (
        <g>
          <rect
            x={x - 10}
            y={y - 6}
            width="20"
            height="12"
            rx="2"
            fill={color}
          />
          <circle cx={x - 6} cy={y - 2} r="1.5" fill="white" />
          <circle cx={x} cy={y - 2} r="1.5" fill="white" />
          <circle cx={x + 6} cy={y - 2} r="1.5" fill="white" />
        </g>
      );
    default:
      return (
        <circle cx={x} cy={y} r="10" fill={color} />
      );
  }
};

export const SystemVisualization = ({ 
  nodes, 
  connections, 
  title, 
  description 
}: SystemVisualizationProps) => {
  const [activeConnection, setActiveConnection] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % connections.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [connections.length]);

  return (
    <div className="w-full bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto">
        <svg
          viewBox="0 0 900 560"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
          style={{ width: '100%', height: '560px', overflow: 'visible' }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsl(222, 30%, 16%)"
                strokeWidth="0.5"
              />
            </pattern>
            
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="glow-purple">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(175, 80%, 50%)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(175, 80%, 50%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(175, 80%, 50%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />

          {/* Connections layer */}
          <g className="connections" style={{ pointerEvents: 'none' }}>
          {connections.map((conn, index) => {
            const from = getNodePosition(conn.from, nodes);
            const to = getNodePosition(conn.to, nodes);
            const isActive = index === activeConnection;
            
            return (
              <g key={`${conn.from}-${conn.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isActive ? 'hsl(175, 80%, 50%)' : 'hsl(222, 30%, 25%)'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  opacity={isActive ? 0.7 : 0.45}
                  className={conn.animated ? 'connection-line' : ''}
                  filter={isActive ? 'url(#glow-cyan)' : undefined}
                />
                
                {/* Connection label background */}
                {conn.label && (
                  <g>
                  <rect
                    x={(from.x + to.x) / 2 - 40}
                    y={(from.y + to.y) / 2 - 34}
                    width="80"
                    height="18"
                    rx="4"
                    fill="#020617"
                    opacity="0.85"
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 22}
                    textAnchor="middle"
                    fill="#cbd5f5"
                    fontSize="10"
                    fontFamily="Inter, sans-serif"
                    className="font-mono"
                  >
                    {conn.label}
                  </text>
                  </g>
                )}
                
                {/* Data packet animation */}
                {isActive && conn.animated && (
                  <motion.circle 
                    r="5" 
                    fill="hsl(175, 80%, 50%)" 
                    filter="url(#glow-cyan)"
                    animate={{}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M${from.x},${from.y} L${to.x},${to.y}`}
                    />
                  </motion.circle>
                )}
              </g>
            );
          })}
          </g>

          {/* Nodes layer */}
          {nodes.map((node) => (
            <g 
              key={node.id} 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node glow effect when hovered */}
              {hoveredNode === node.id && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="35"
                  fill={nodeColors[node.type]}
                  opacity="0.1"
                  filter="url(#glow-cyan)"
                />
              )}
              
              {/* Node background */}
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill="hsl(222, 47%, 7%)"
                stroke={hoveredNode === node.id ? nodeColors[node.type] : nodeColors[node.type]}
                strokeWidth="2"
                filter={hoveredNode === node.id ? 'url(#glow-cyan)' : undefined}
              />
              
              {/* Node icon */}
              {getNodeTypeIcon(node.type, node.x, node.y)}
            </g>
          ))}

          {/* Labels layer */}
          {nodes.map((node) => {
            const tooltipX = node.x > 650 ? node.x - 220 : node.x - 100;
            return (
              <g key={`label-${node.id}`}>
                {/* Background rectangle for label */}
                <rect
                  x={node.x - 58}
                  y={node.y + 34}
                  width={116}
                  height={26}
                  rx={6}
                  fill="#020617"
                  opacity={0.9}
                />
                          
                {/* Label text */}
                <text
                  x={node.x}
                  y={node.y + 52}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#e5e7eb"
                  fontWeight="500"
                >
                  {node.label}
                </text>
                          
                {/* Node description tooltip */}
                {hoveredNode === node.id && node.description && (
                  <foreignObject
                    x={tooltipX}
                    y={node.y - 80}
                    width="200"
                    height="70"
                  >
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-2 text-xs text-gray-200">
                      {node.description}
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {nodes.map(node => (
          <div 
            key={node.id} 
            className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg border border-gray-700"
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: nodeColors[node.type] }}
            />
            <span className="text-sm text-gray-300">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};