'use client';

import { SystemVisualization, Node, Connection } from './SystemVisualization';

// Overall Platform Architecture Visualization
export const PlatformArchitectureVisualization = () => {
  const nodes: Node[] = [
    { id: 'users', x: 100, y: 100, label: 'Users', type: 'user', description: 'Students and learners using the platform' },
    { id: 'frontend', x: 300, y: 100, label: 'Frontend', type: 'client', description: 'Next.js React application with UI components' },
    { id: 'auth', x: 300, y: 200, label: 'Authentication', type: 'auth', description: 'JWT-based authentication system' },
    { id: 'api', x: 500, y: 100, label: 'API Gateway', type: 'server', description: 'FastAPI backend services' },
    { id: 'projects', x: 500, y: 200, label: 'Projects Service', type: 'server', description: 'Manages learning projects and content' },
    { id: 'progress', x: 500, y: 300, label: 'Progress Service', type: 'server', description: 'Tracks user progress and achievements' },
    { id: 'db', x: 700, y: 150, label: 'Database', type: 'database', description: 'PostgreSQL database storing all platform data' },
    { id: 'storage', x: 700, y: 250, label: 'Storage', type: 'storage', description: 'File storage for code samples and resources' },
    { id: 'code-execution', x: 500, y: 400, label: 'Code Execution', type: 'server', description: 'Sandboxed environment for code execution' },
    { id: 'response', x: 700, y: 50, label: 'Response', type: 'api', description: 'API responses to frontend' },
  ];

  const connections: Connection[] = [
    { from: 'users', to: 'frontend', label: 'UI Interactions', animated: true, protocol: 'HTTP' },
    { from: 'frontend', to: 'auth', label: 'Auth Requests', animated: true, protocol: 'JWT' },
    { from: 'frontend', to: 'api', label: 'API Calls', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'projects', label: 'Project Data', animated: true, protocol: 'Internal' },
    { from: 'api', to: 'progress', label: 'Progress Updates', animated: true, protocol: 'Internal' },
    { from: 'api', to: 'code-execution', label: 'Execute Code', animated: true, protocol: 'Internal' },
    { from: 'api', to: 'db', label: 'Queries', animated: true, protocol: 'SQL' },
    { from: 'api', to: 'storage', label: 'Store Files', animated: true, protocol: 'Internal' },
    { from: 'projects', to: 'db', label: 'Project Data', animated: true, protocol: 'SQL' },
    { from: 'progress', to: 'db', label: 'Progress Data', animated: true, protocol: 'SQL' },
    { from: 'auth', to: 'db', label: 'User Data', animated: true, protocol: 'SQL' },
    { from: 'code-execution', to: 'response', label: 'Execution Result', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'response', label: 'API Response', animated: true, protocol: 'HTTP' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Learning Platform Architecture"
      description="Complete system architecture showing all components and their interactions"
    />
  );
};