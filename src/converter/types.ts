// src/converter/types.ts

/**
 * Standardized graph schema types
 */

// Node represents a single entity in the graph
export interface Node {
  id: string;
  title: string;
  type: string; // 'class', 'function', 'module', etc.
  sections: Section[];
  metadata: Record<string, any>; // Additional data specific to the node type
}

// Section represents a group of items in a node
export interface Section {
  id: string;
  name: string;
  items: Item[];
  metadata?: Record<string, any>;
}

// Item represents a single property/method/field in a section
export interface Item {
  id: string;
  value: string;
  icon?: string; // Optional icon identifier
  metadata?: Record<string, any>;
}

// Edge represents a connection between nodes
export interface Edge {
  source: string; // Source node ID
  target: string; // Target node ID
  type: string; // 'dependency', 'inheritance', etc.
  metadata?: Record<string, any>;
}

// Graph is the top-level structure
export interface Graph {
  nodes: Node[];
  edges: Edge[];
  metadata: {
    projectType: string; // 'typescript', 'java', 'python'
    projectName: string;
    convertedAt: string;
    originalFormat: Record<string, any>; // Original metadata
  };
}
