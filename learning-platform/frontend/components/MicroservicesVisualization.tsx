'use client';

import { SystemVisualization, Node, Connection } from './SystemVisualization';

// Microservices Architecture Visualization
export const MicroservicesVisualization = () => {
  const nodes: Node[] = [
    { id: 'users', x: 100, y: 100, label: 'Users', type: 'user', description: 'End users interacting with the platform' },
    { id: 'gateway', x: 250, y: 100, label: 'API Gateway', type: 'server', description: 'Single entry point for all client requests' },
    { id: 'auth-service', x: 250, y: 200, label: 'Auth Service', type: 'server', description: 'Handles authentication and authorization' },
    { id: 'user-service', x: 400, y: 50, label: 'User Service', type: 'server', description: 'Manages user profiles and accounts' },
    { id: 'project-service', x: 400, y: 150, label: 'Project Service', type: 'server', description: 'Manages learning projects' },
    { id: 'progress-service', x: 400, y: 250, label: 'Progress Service', type: 'server', description: 'Tracks user progress' },
    { id: 'notification-service', x: 400, y: 350, label: 'Notification Service', type: 'server', description: 'Handles notifications' },
    { id: 'db-users', x: 600, y: 50, label: 'User DB', type: 'database', description: 'Database for user data' },
    { id: 'db-projects', x: 600, y: 150, label: 'Project DB', type: 'database', description: 'Database for project data' },
    { id: 'db-progress', x: 600, y: 250, label: 'Progress DB', type: 'database', description: 'Database for progress data' },
    { id: 'db-notifications', x: 600, y: 350, label: 'Notification DB', type: 'database', description: 'Database for notifications' },
    { id: 'message-queue', x: 500, y: 450, label: 'Message Queue', type: 'queue', description: 'Asynchronous communication between services' },
    { id: 'load-balancer', x: 100, y: 200, label: 'Load Balancer', type: 'server', description: 'Distributes traffic across services' },
    { id: 'monitoring', x: 700, y: 200, label: 'Monitoring', type: 'api', description: 'Service monitoring and observability' },
  ];

  const connections: Connection[] = [
    { from: 'users', to: 'load-balancer', label: 'Requests', animated: true, protocol: 'HTTP' },
    { from: 'load-balancer', to: 'gateway', label: 'Forward', animated: true, protocol: 'HTTP' },
    { from: 'gateway', to: 'auth-service', label: 'Auth', animated: true, protocol: 'HTTP' },
    { from: 'gateway', to: 'user-service', label: 'User', animated: true, protocol: 'HTTP' },
    { from: 'gateway', to: 'project-service', label: 'Project', animated: true, protocol: 'HTTP' },
    { from: 'gateway', to: 'progress-service', label: 'Progress', animated: true, protocol: 'HTTP' },
    { from: 'gateway', to: 'notification-service', label: 'Notify', animated: true, protocol: 'HTTP' },
    { from: 'auth-service', to: 'db-users', label: 'User Auth', animated: true, protocol: 'SQL' },
    { from: 'user-service', to: 'db-users', label: 'User Data', animated: true, protocol: 'SQL' },
    { from: 'project-service', to: 'db-projects', label: 'Project Data', animated: true, protocol: 'SQL' },
    { from: 'progress-service', to: 'db-progress', label: 'Progress Data', animated: true, protocol: 'SQL' },
    { from: 'notification-service', to: 'db-notifications', label: 'Notify Data', animated: true, protocol: 'SQL' },
    { from: 'notification-service', to: 'message-queue', label: 'Events', animated: true, protocol: 'AMQP' },
    { from: 'progress-service', to: 'message-queue', label: 'Events', animated: true, protocol: 'AMQP' },
    { from: 'user-service', to: 'message-queue', label: 'Events', animated: true, protocol: 'AMQP' },
    { from: 'project-service', to: 'message-queue', label: 'Events', animated: true, protocol: 'AMQP' },
    { from: 'monitoring', to: 'user-service', label: 'Metrics', animated: true, protocol: 'Metrics' },
    { from: 'monitoring', to: 'project-service', label: 'Metrics', animated: true, protocol: 'Metrics' },
    { from: 'monitoring', to: 'progress-service', label: 'Metrics', animated: true, protocol: 'Metrics' },
    { from: 'monitoring', to: 'auth-service', label: 'Metrics', animated: true, protocol: 'Metrics' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Microservices Architecture"
      description="Scalable microservices architecture with separate databases and asynchronous communication"
    />
  );
};