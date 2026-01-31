'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SystemVisualization, Node, Connection } from '@/components/SystemVisualization';
import { MicroservicesVisualization } from '@/components/MicroservicesVisualization';
import { ContainerOrchestrationVisualization } from '@/components/ContainerOrchestrationVisualization';

export default function ConceptsPage() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  
  const concepts = [
    { id: 'http', name: 'HTTP Protocol', description: 'HyperText Transfer Protocol for web communication' },
    { id: 'rest', name: 'REST API', description: 'Representational State Transfer architectural style' },
    { id: 'database', name: 'Database Systems', description: 'Data storage and retrieval mechanisms' },
    { id: 'auth', name: 'Authentication', description: 'Identity verification and access control' },
    { id: 'validation', name: 'Input Validation', description: 'Ensuring data integrity and security' },
    { id: 'security', name: 'Web Security', description: 'Protecting applications from threats' },
    { id: 'microservices', name: 'Microservices', description: 'Distributed system architecture pattern' },
    { id: 'containers', name: 'Containerization', description: 'Application packaging and deployment' },
  ];

  // HTTP Protocol Visualization
  const httpNodes: Node[] = [
    { id: 'client', x: 100, y: 200, label: 'Client', type: 'client', description: 'Browser or API consumer' },
    { id: 'request', x: 250, y: 150, label: 'HTTP Request', type: 'api', description: 'GET, POST, PUT, DELETE methods' },
    { id: 'server', x: 400, y: 200, label: 'Server', type: 'server', description: 'Handles incoming requests' },
    { id: 'response', x: 550, y: 250, label: 'HTTP Response', type: 'api', description: 'Status codes and data' },
  ];

  const httpConnections: Connection[] = [
    { from: 'client', to: 'request', label: 'Initiates', animated: true, protocol: 'TCP' },
    { from: 'request', to: 'server', label: 'Sends', animated: true, protocol: 'HTTP' },
    { from: 'server', to: 'response', label: 'Responds', animated: true, protocol: 'HTTP' },
    { from: 'response', to: 'client', label: 'Returns', animated: true, protocol: 'TCP' },
  ];

  // REST API Visualization
  const restNodes: Node[] = [
    { id: 'frontend', x: 100, y: 150, label: 'Frontend', type: 'client', description: 'React application' },
    { id: 'api', x: 300, y: 100, label: 'REST API', type: 'server', description: 'CRUD endpoints' },
    { id: 'db', x: 300, y: 250, label: 'Database', type: 'database', description: 'Data storage' },
    { id: 'resource', x: 500, y: 150, label: 'Resource', type: 'api', description: 'Managed entity' },
  ];

  const restConnections: Connection[] = [
    { from: 'frontend', to: 'api', label: 'GET /api/users', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'db', label: 'Query', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'api', label: 'Results', animated: true, protocol: 'SQL' },
    { from: 'api', to: 'frontend', label: 'JSON Response', animated: true, protocol: 'HTTP' },
    { from: 'frontend', to: 'api', label: 'POST /api/users', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'resource', label: 'Creates', animated: true, protocol: 'Internal' },
  ];

  // Database Visualization
  const dbNodes: Node[] = [
    { id: 'app', x: 100, y: 150, label: 'Application', type: 'server', description: 'Business logic layer' },
    { id: 'orm', x: 300, y: 100, label: 'ORM', type: 'api', description: 'Object-relational mapping' },
    { id: 'db', x: 300, y: 200, label: 'Database', type: 'database', description: 'Data storage engine' },
    { id: 'tables', x: 500, y: 150, label: 'Tables', type: 'storage', description: 'Structured data' },
  ];

  const dbConnections: Connection[] = [
    { from: 'app', to: 'orm', label: 'Operations', animated: true, protocol: 'API' },
    { from: 'orm', to: 'db', label: 'SQL', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'tables', label: 'Stores', animated: true, protocol: 'Internal' },
    { from: 'tables', to: 'orm', label: 'Data', animated: true, protocol: 'SQL' },
    { from: 'orm', to: 'app', label: 'Objects', animated: true, protocol: 'API' },
  ];

  // Authentication Visualization
  const authNodes: Node[] = [
    { id: 'user', x: 100, y: 100, label: 'User', type: 'user', description: 'End user' },
    { id: 'login', x: 250, y: 100, label: 'Login Form', type: 'client', description: 'Credential input' },
    { id: 'auth-service', x: 400, y: 100, label: 'Auth Service', type: 'auth', description: 'Verification' },
    { id: 'db', x: 400, y: 250, label: 'User DB', type: 'database', description: 'Credentials' },
    { id: 'token', x: 550, y: 100, label: 'JWT Token', type: 'cache', description: 'Session token' },
    { id: 'protected-api', x: 550, y: 250, label: 'API', type: 'server', description: 'Protected endpoints' },
  ];

  const authConnections: Connection[] = [
    { from: 'user', to: 'login', label: 'Enters', animated: true, protocol: 'UI' },
    { from: 'login', to: 'auth-service', label: 'Credentials', animated: true, protocol: 'HTTP' },
    { from: 'auth-service', to: 'db', label: 'Verify', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'auth-service', label: 'Valid?', animated: true, protocol: 'SQL' },
    { from: 'auth-service', to: 'token', label: 'Issues', animated: true, protocol: 'JWT' },
    { from: 'token', to: 'user', label: 'Receives', animated: true, protocol: 'HTTP' },
    { from: 'user', to: 'protected-api', label: 'Token + Request', animated: true, protocol: 'HTTP' },
    { from: 'protected-api', to: 'token', label: 'Validate', animated: true, protocol: 'JWT' },
  ];

  // Input Validation Visualization
  const validationNodes: Node[] = [
    { id: 'client', x: 100, y: 150, label: 'Client', type: 'client', description: 'User input' },
    { id: 'frontend-validation', x: 250, y: 100, label: 'Frontend', type: 'api', description: 'Initial checks' },
    { id: 'backend-validation', x: 250, y: 200, label: 'Backend', type: 'server', description: 'Server-side validation' },
    { id: 'sanitizer', x: 400, y: 150, label: 'Sanitizer', type: 'queue', description: 'Input cleaning' },
    { id: 'processor', x: 550, y: 150, label: 'Processor', type: 'server', description: 'Business logic' },
  ];

  const validationConnections: Connection[] = [
    { from: 'client', to: 'frontend-validation', label: 'Input', animated: true, protocol: 'UI' },
    { from: 'frontend-validation', to: 'backend-validation', label: 'Data', animated: true, protocol: 'HTTP' },
    { from: 'backend-validation', to: 'sanitizer', label: 'Valid?', animated: true, protocol: 'Internal' },
    { from: 'sanitizer', to: 'processor', label: 'Clean Data', animated: true, protocol: 'Internal' },
    { from: 'backend-validation', to: 'client', label: 'Error', animated: true, protocol: 'HTTP' },
  ];

  // Security Visualization
  const securityNodes: Node[] = [
    { id: 'external', x: 100, y: 100, label: 'External', type: 'user', description: 'Potential attacker' },
    { id: 'firewall', x: 250, y: 100, label: 'Firewall', type: 'queue', description: 'Traffic filtering' },
    { id: 'waf', x: 250, y: 200, label: 'WAF', type: 'queue', description: 'Web Application Firewall' },
    { id: 'app', x: 400, y: 150, label: 'Application', type: 'server', description: 'Main application' },
    { id: 'db', x: 400, y: 250, label: 'Database', type: 'database', description: 'Data storage' },
    { id: 'monitoring', x: 550, y: 100, label: 'Monitoring', type: 'api', description: 'Security logs' },
  ];

  const securityConnections: Connection[] = [
    { from: 'external', to: 'firewall', label: 'Requests', animated: true, protocol: 'HTTP' },
    { from: 'firewall', to: 'waf', label: 'Filtered', animated: true, protocol: 'Internal' },
    { from: 'waf', to: 'app', label: 'Safe', animated: true, protocol: 'HTTP' },
    { from: 'app', to: 'db', label: 'Queries', animated: true, protocol: 'SQL' },
    { from: 'app', to: 'monitoring', label: 'Logs', animated: true, protocol: 'Internal' },
    { from: 'waf', to: 'monitoring', label: 'Alerts', animated: true, protocol: 'Internal' },
  ];

  const conceptVisualizations: Record<string, { nodes: Node[], connections: Connection[], title: string, description: string }> = {
    http: { nodes: httpNodes, connections: httpConnections, title: 'HTTP Protocol Flow', description: 'Visualization of HTTP request-response cycle' },
    rest: { nodes: restNodes, connections: restConnections, title: 'REST API Architecture', description: 'How REST APIs connect clients to databases' },
    database: { nodes: dbNodes, connections: dbConnections, title: 'Database Integration', description: 'Database connection and ORM patterns' },
    auth: { nodes: authNodes, connections: authConnections, title: 'Authentication Flow', description: 'Complete authentication flow with JWT tokens' },
    validation: { nodes: validationNodes, connections: validationConnections, title: 'Input Validation', description: 'Client and server-side validation layers' },
    security: { nodes: securityNodes, connections: securityConnections, title: 'Security Layers', description: 'Multiple layers of security protection' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Learning Concepts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore fundamental computer science concepts through interactive visualizations
          </p>
        </motion.div>

        {/* Concept Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 6) }}
            >
              <button
                onClick={() => setSelectedConcept(selectedConcept === concept.id ? null : concept.id)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedConcept === concept.id
                    ? 'border-primary-500 bg-primary-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{concept.name}</h3>
                <p className="text-gray-600">{concept.description}</p>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Visualization Area */}
        {selectedConcept && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-12"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations]?.title || 
                 (selectedConcept === 'microservices' ? 'Microservices Architecture' : 
                  selectedConcept === 'containers' ? 'Container Orchestration Architecture' : 
                  'Concept Visualization')}
              </h2>
              <p className="text-gray-600">
                {conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations]?.description ||
                 (selectedConcept === 'microservices' ? 'Scalable microservices architecture with separate databases and asynchronous communication' :
                  selectedConcept === 'containers' ? 'Kubernetes-based container orchestration with CI/CD pipeline and monitoring' :
                  'Detailed visualization of the selected concept')}
              </p>
            </div>
            <div className="p-6">
              <div className="h-[600px]">
                {selectedConcept === 'microservices' ? (
                  <MicroservicesVisualization />
                ) : selectedConcept === 'containers' ? (
                  <ContainerOrchestrationVisualization />
                ) : conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations] ? (
                  <SystemVisualization
                    nodes={conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations].nodes}
                    connections={conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations].connections}
                    title={conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations].title}
                    description={conceptVisualizations[selectedConcept as keyof typeof conceptVisualizations].description}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Visualization not available for this concept
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Browse Projects
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}