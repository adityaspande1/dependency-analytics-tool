// src/index.ts
// Component exports
export { Graph } from './components/Graph'
export { GraphEdge } from './components/GraphEdge'
export { GraphNode } from './components/GraphNode'

// Type exports 
export { 
  type GraphData,
  type Node,
  type Edge,
  type Section,
  type SectionItem
} from './types/graph'

// Utility exports
export { 
  sampleData, 
  typescriptProjectSample,
  javaProjectSample,
  djangoProjectSample
} from './lib/data'