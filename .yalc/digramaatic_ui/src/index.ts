// src/index.ts
// Main component export
export { Graph } from './components/Graph';

// Graph components
export * from './components/graph/index';

// Graph node components
export * from './components/graph-node';

// Types
export * from './types/graph';

// Utilities
export * from './utils/graph/nodeStyles';
export * from './utils/graphLayout';

// Utility exports
export { 
  sampleData, 
  typescriptProjectSample,
  javaProjectSample,
  djangoProjectSample
} from './lib/data'