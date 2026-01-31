'use client';

import { SystemVisualization, Node, Connection } from './SystemVisualization';

// Project 1: Basic HTTP Server Visualization
export const Project1Visualization = () => {
  const nodes: Node[] = [
    { id: 'client', x: 100, y: 250, label: 'Client', type: 'client', description: 'Web browser or API client making requests' },
    { id: 'server', x: 300, y: 250, label: 'FastAPI Server', type: 'server', description: 'Python server handling HTTP requests' },
    { id: 'response', x: 500, y: 250, label: 'Response', type: 'api', description: 'JSON response with data' },
  ];

  const connections: Connection[] = [
    { from: 'client', to: 'server', label: 'GET /', animated: true, protocol: 'HTTP' },
    { from: 'server', to: 'response', label: '200 OK', animated: true, protocol: 'HTTP' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Project 1: Basic HTTP Server Architecture"
      description="Simple architecture with client-server communication using FastAPI"
    />
  );
};

// Project 2: REST API with CRUD Operations Visualization
export const Project2Visualization = () => {
  const nodes: Node[] = [
    { id: 'client', x: 100, y: 250, label: 'Client', type: 'client', description: 'Frontend application making API requests' },
    { id: 'api', x: 300, y: 150, label: 'REST API', type: 'server', description: 'FastAPI server with CRUD endpoints' },
    { id: 'db', x: 300, y: 350, label: 'Database', type: 'database', description: 'Data storage layer' },
    { id: 'response', x: 500, y: 250, label: 'Response', type: 'api', description: 'API response to client' },
  ];

  const connections: Connection[] = [
    { from: 'client', to: 'api', label: 'CRUD Requests', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'db', label: 'Queries', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'api', label: 'Results', animated: true, protocol: 'SQL' },
    { from: 'api', to: 'response', label: 'Response', animated: true, protocol: 'HTTP' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Project 2: REST API with CRUD Operations"
      description="Architecture with client, API layer, and database for CRUD operations"
    />
  );
};

// Project 3: Database Integration with SQLAlchemy Visualization
export const Project3Visualization = () => {
  const nodes: Node[] = [
    { id: 'client', x: 100, y: 250, label: 'Client', type: 'client', description: 'API consumer' },
    { id: 'api', x: 250, y: 150, label: 'FastAPI', type: 'server', description: 'Application server' },
    { id: 'orm', x: 250, y: 250, label: 'SQLAlchemy ORM', type: 'api', description: 'Object-relational mapping layer' },
    { id: 'db', x: 250, y: 350, label: 'SQLite DB', type: 'database', description: 'Persistent data storage' },
    { id: 'response', x: 400, y: 250, label: 'Response', type: 'api', description: 'API response' },
  ];

  const connections: Connection[] = [
    { from: 'client', to: 'api', label: 'API Call', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'orm', label: 'ORM Operations', animated: true, protocol: 'Python' },
    { from: 'orm', to: 'db', label: 'SQL Queries', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'orm', label: 'Data', animated: true, protocol: 'SQL' },
    { from: 'orm', to: 'api', label: 'Mapped Objects', animated: true, protocol: 'Python' },
    { from: 'api', to: 'response', label: 'Response', animated: true, protocol: 'HTTP' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Project 3: Database Integration with SQLAlchemy"
      description="Architecture integrating database with SQLAlchemy ORM for data persistence"
    />
  );
};

// Project 4: Authentication & Authorization with JWT Visualization
export const Project4Visualization = () => {
  const nodes: Node[] = [
    { id: 'client', x: 100, y: 200, label: 'Client', type: 'client', description: 'Authenticated user client' },
    { id: 'auth', x: 300, y: 100, label: 'Auth Service', type: 'auth', description: 'Authentication and JWT generation' },
    { id: 'jwt', x: 300, y: 200, label: 'JWT Token', type: 'cache', description: 'JSON Web Token for authentication' },
    { id: 'api', x: 300, y: 300, label: 'Protected API', type: 'server', description: 'API endpoints requiring authentication' },
    { id: 'db', x: 500, y: 200, label: 'User DB', type: 'database', description: 'User credential storage' },
    { id: 'response', x: 500, y: 300, label: 'Response', type: 'api', description: 'API response' },
  ];

  const connections: Connection[] = [
    { from: 'client', to: 'auth', label: 'Login Request', animated: true, protocol: 'HTTP' },
    { from: 'auth', to: 'db', label: 'Verify Credentials', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'auth', label: 'User Data', animated: true, protocol: 'SQL' },
    { from: 'auth', to: 'jwt', label: 'Create Token', animated: true, protocol: 'JWT' },
    { from: 'jwt', to: 'client', label: 'JWT Token', animated: true, protocol: 'HTTP' },
    { from: 'client', to: 'api', label: 'API Request + JWT', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'jwt', label: 'Validate Token', animated: true, protocol: 'JWT' },
    { from: 'api', to: 'response', label: 'Response', animated: true, protocol: 'HTTP' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Project 4: Authentication & Authorization with JWT"
      description="Secure architecture with JWT-based authentication and authorization"
    />
  );
};

// Project 5: Data Validation & Error Handling Visualization
export const Project5Visualization = () => {
  const nodes: Node[] = [
    { id: 'client', x: 100, y: 150, label: 'Client', type: 'client', description: 'API client with data' },
    { id: 'validator', x: 250, y: 100, label: 'Pydantic Validator', type: 'api', description: 'Data validation layer' },
    { id: 'api', x: 250, y: 200, label: 'FastAPI Handler', type: 'server', description: 'Request processing' },
    { id: 'processor', x: 250, y: 300, label: 'Business Logic', type: 'server', description: 'Core business processing' },
    { id: 'db', x: 400, y: 200, label: 'Database', type: 'database', description: 'Data storage' },
    { id: 'error', x: 400, y: 100, label: 'Error Handler', type: 'queue', description: 'Error processing' },
    { id: 'response', x: 400, y: 300, label: 'Response', type: 'api', description: 'Final response' },
  ];

  const connections: Connection[] = [
    { from: 'client', to: 'validator', label: 'Request Data', animated: true, protocol: 'HTTP' },
    { from: 'validator', to: 'api', label: 'Validated Data', animated: true, protocol: 'Python' },
    { from: 'api', to: 'processor', label: 'Process Request', animated: true, protocol: 'Python' },
    { from: 'processor', to: 'db', label: 'DB Operations', animated: true, protocol: 'SQL' },
    { from: 'db', to: 'processor', label: 'Results', animated: true, protocol: 'SQL' },
    { from: 'processor', to: 'response', label: 'Success Response', animated: true, protocol: 'HTTP' },
    { from: 'validator', to: 'error', label: 'Invalid Data', animated: true, protocol: 'Python' },
    { from: 'error', to: 'response', label: 'Error Response', animated: true, protocol: 'HTTP' },
    { from: 'api', to: 'error', label: 'Exception', animated: true, protocol: 'Python' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Project 5: Data Validation & Error Handling"
      description="Robust architecture with comprehensive validation and error handling"
    />
  );
};

// Main component to render project visualizations
export const ProjectVisualizationRenderer = ({ projectId }: { projectId: number }) => {
  switch (projectId) {
    case 1:
      return <Project1Visualization />;
    case 2:
      return <Project2Visualization />;
    case 3:
      return <Project3Visualization />;
    case 4:
      return <Project4Visualization />;
    case 5:
      return <Project5Visualization />;
    default:
      return (
        <div className="w-full bg-gray-900 rounded-xl p-6 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-2">System Architecture Visualization</h3>
          <p className="text-gray-300">Select a project to view its architecture visualization</p>
        </div>
      );
  }
};