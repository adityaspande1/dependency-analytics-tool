import { Node } from '../types/graph';

/**
 * Get scaling factor based on the number of nodes
 */
export function getLayoutScalingFactor(nodeCount: number): number {
  // Significantly reduce scaling factors for smaller graphs
  if (nodeCount <= 3) return 0.15;
  if (nodeCount <= 5) return 0.2;
  if (nodeCount <= 10) return 0.3;
  if (nodeCount <= 20) return 0.45;
  if (nodeCount <= 50) return 0.7;
  if (nodeCount <= 100) return 1.0;
  return 1.5;
}

/**
 * Create a spiral layout for nodes
 */
export function createSpiralLayout(
  nodes: Node[], 
  center: { x: number, y: number }, 
  availableSpace: { width: number, height: number }
): Record<string, { x: number; y: number }> {
  const nodeCount = nodes.length;
  const minDimension = Math.min(availableSpace.width, availableSpace.height);
  const scaleFactor = getLayoutScalingFactor(nodeCount);

  // Smaller values create tighter spirals
  const a = minDimension / 40 * scaleFactor;
  const b = minDimension / 40 * scaleFactor;

  return nodes.reduce((acc, node, index) => {
    const theta = index * 0.5;
    const r = a + b * theta;
    acc[node.id] = {
      x: center.x + r * Math.cos(theta),
      y: center.y + r * Math.sin(theta)
    };
    return acc;
  }, {} as Record<string, { x: number; y: number }>);
}

/**
 * Create a donut layout for nodes
 */
export function createDonutLayout(
  nodes: Node[], 
  center: { x: number, y: number }, 
  availableSpace: { width: number, height: number }
): Record<string, { x: number; y: number }> {
  const nodeCount = nodes.length;
  const minDimension = Math.min(availableSpace.width, availableSpace.height);
  
  // Significantly reduce the spacing for smaller graphs
  let scaleFactor = getLayoutScalingFactor(nodeCount);
  if (nodeCount <= 5) {
    scaleFactor = 0.15;  // Very tight grouping for very small graphs
  } else if (nodeCount < 10) {
    scaleFactor = 0.25;  // Tighter grouping for small graphs
  } else if (nodeCount < 20) {
    scaleFactor = 0.35;
  }

  const innerRadius = minDimension / 10 * scaleFactor;
  const outerRadius = minDimension / 4 * scaleFactor;

  const nodesByType: Record<string, Node[]> = {};
  nodes.forEach(node => {
    const type = node.type || 'unknown';
    if (!nodesByType[type]) {
      nodesByType[type] = [];
    }
    nodesByType[type].push(node);
  });

  const positions = {} as Record<string, { x: number; y: number }>;
  let ringIndex = 0;

  Object.entries(nodesByType).forEach(([, typeNodes]) => {
    // For single-type graphs with few nodes, place them in a circle
    const ringRadius = innerRadius + (outerRadius - innerRadius) * (ringIndex / Math.max(Object.keys(nodesByType).length - 1, 1));

    typeNodes.forEach((node, i) => {
      const angle = (i / typeNodes.length) * 2 * Math.PI;
      positions[node.id] = {
        x: center.x + ringRadius * Math.cos(angle),
        y: center.y + ringRadius * Math.sin(angle)
      };
    });

    ringIndex++;
  });

  return positions;
}

/**
 * Create a circular layout for nodes
 */
export function createCircularLayout(
  nodes: Node[], 
  center: { x: number, y: number }, 
  availableSpace: { width: number, height: number }
): Record<string, { x: number; y: number }> {
  const nodeCount = nodes.length;
  const radius = Math.min(availableSpace.width, availableSpace.height) / 3;
  const scaleFactor = getLayoutScalingFactor(nodeCount);
  const angleStep = (2 * Math.PI) / nodeCount;

  return nodes.reduce((acc, node, index) => {
    const angle = index * angleStep;
    acc[node.id] = {
      x: center.x + (radius * scaleFactor) * Math.cos(angle),
      y: center.y + (radius * scaleFactor) * Math.sin(angle),
    };
    return acc;
  }, {} as Record<string, { x: number; y: number }>);
}

/**
 * Create a force-directed layout for nodes
 */
export function createForceLayout(
  nodes: Node[], 
  center: { x: number, y: number }, 
  availableSpace: { width: number, height: number }
): Record<string, { x: number; y: number }> {
  const nodeCount = nodes.length;
  const scaleFactor = getLayoutScalingFactor(nodeCount);
  
  return nodes.reduce((acc, node, index) => {
    const angle = (index / nodeCount) * 2 * Math.PI;
    const radius = Math.min(availableSpace.width, availableSpace.height) / 5 * scaleFactor;
    const jitter = nodeCount <= 5 ? 0 : Math.random() * 50;

    acc[node.id] = {
      x: center.x + (radius + jitter) * Math.cos(angle),
      y: center.y + (radius + jitter) * Math.sin(angle),
    };
    return acc;
  }, {} as Record<string, { x: number; y: number }>);
}

/**
 * Get the initial zoom scale based on node count
 */
export function getInitialZoomScale(nodeCount: number): number {
  return nodeCount <= 3 ? 0.8 :
         nodeCount <= 10 ? 0.7 :
         nodeCount <= 20 ? 0.5 :
         nodeCount <= 50 ? 0.4 : 0.3;
} 