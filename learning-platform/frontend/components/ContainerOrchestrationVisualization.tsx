'use client';

import { SystemVisualization, Node, Connection } from './SystemVisualization';

// Container Orchestration Visualization
export const ContainerOrchestrationVisualization = () => {
  const nodes: Node[] = [
    { id: 'developers', x: 100, y: 50, label: 'Developers', type: 'user', description: 'Application developers' },
    { id: 'git-repo', x: 100, y: 150, label: 'Git Repo', type: 'storage', description: 'Source code repository' },
    { id: 'ci-cd', x: 100, y: 250, label: 'CI/CD Pipeline', type: 'server', description: 'Continuous integration/delivery' },
    { id: 'container-registry', x: 100, y: 350, label: 'Container Registry', type: 'storage', description: 'Docker image storage' },
    { id: 'kubernetes-master', x: 300, y: 150, label: 'K8s Master', type: 'server', description: 'Cluster orchestration control plane' },
    { id: 'kubernetes-worker-1', x: 300, y: 250, label: 'K8s Worker 1', type: 'server', description: 'Compute node 1' },
    { id: 'kubernetes-worker-2', x: 300, y: 350, label: 'K8s Worker 2', type: 'server', description: 'Compute node 2' },
    { id: 'kubernetes-worker-3', x: 300, y: 450, label: 'K8s Worker 3', type: 'server', description: 'Compute node 3' },
    { id: 'load-balancer', x: 500, y: 200, label: 'Load Balancer', type: 'server', description: 'Traffic distribution' },
    { id: 'app-container-1', x: 500, y: 300, label: 'App Container', type: 'api', description: 'Application pod instance 1' },
    { id: 'app-container-2', x: 500, y: 400, label: 'App Container', type: 'api', description: 'Application pod instance 2' },
    { id: 'db-container', x: 500, y: 500, label: 'DB Container', type: 'database', description: 'Database pod' },
    { id: 'users', x: 700, y: 250, label: 'Users', type: 'user', description: 'End users' },
    { id: 'monitoring', x: 700, y: 100, label: 'Monitoring', type: 'api', description: 'Cluster monitoring' },
    { id: 'logging', x: 700, y: 150, label: 'Logging', type: 'storage', description: 'Log aggregation' },
  ];

  const connections: Connection[] = [
    { from: 'developers', to: 'git-repo', label: 'Push Code', animated: true, protocol: 'Git' },
    { from: 'git-repo', to: 'ci-cd', label: 'Trigger Build', animated: true, protocol: 'Webhook' },
    { from: 'ci-cd', to: 'container-registry', label: 'Push Image', animated: true, protocol: 'Docker' },
    { from: 'container-registry', to: 'kubernetes-master', label: 'Pull Image', animated: true, protocol: 'Docker' },
    { from: 'kubernetes-master', to: 'kubernetes-worker-1', label: 'Schedule', animated: true, protocol: 'K8s API' },
    { from: 'kubernetes-master', to: 'kubernetes-worker-2', label: 'Schedule', animated: true, protocol: 'K8s API' },
    { from: 'kubernetes-master', to: 'kubernetes-worker-3', label: 'Schedule', animated: true, protocol: 'K8s API' },
    { from: 'kubernetes-worker-1', to: 'app-container-1', label: 'Deploy', animated: true, protocol: 'K8s' },
    { from: 'kubernetes-worker-2', to: 'app-container-2', label: 'Deploy', animated: true, protocol: 'K8s' },
    { from: 'kubernetes-worker-3', to: 'db-container', label: 'Deploy', animated: true, protocol: 'K8s' },
    { from: 'users', to: 'load-balancer', label: 'Requests', animated: true, protocol: 'HTTP' },
    { from: 'load-balancer', to: 'app-container-1', label: 'Route', animated: true, protocol: 'HTTP' },
    { from: 'load-balancer', to: 'app-container-2', label: 'Route', animated: true, protocol: 'HTTP' },
    { from: 'app-container-1', to: 'db-container', label: 'Connect', animated: true, protocol: 'TCP' },
    { from: 'app-container-2', to: 'db-container', label: 'Connect', animated: true, protocol: 'TCP' },
    { from: 'kubernetes-master', to: 'monitoring', label: 'Metrics', animated: true, protocol: 'Prometheus' },
    { from: 'kubernetes-worker-1', to: 'logging', label: 'Logs', animated: true, protocol: 'Fluentd' },
    { from: 'kubernetes-worker-2', to: 'logging', label: 'Logs', animated: true, protocol: 'Fluentd' },
    { from: 'kubernetes-worker-3', to: 'logging', label: 'Logs', animated: true, protocol: 'Fluentd' },
  ];

  return (
    <SystemVisualization
      nodes={nodes}
      connections={connections}
      title="Container Orchestration Architecture"
      description="Kubernetes-based container orchestration with CI/CD pipeline and monitoring"
    />
  );
};