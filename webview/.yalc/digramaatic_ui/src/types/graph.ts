// src/types/graph.ts

/**
 * Generic Node interface that can accommodate different data structure formats
 */
export interface Node {
    id: string;
    title?: string;
    name?: string;
    type?: string;
    language?: string;
    filepath?: string;
    sections?: Section[];
    metadata?: Record<string, any>;
  }
  
  /**
   * Section represents a grouping of items within a node
   */
  export interface Section {
    id: string;
    name: string;
    items: SectionItem[];
  }
  
  /**
   * Item within a section
   */
  export interface SectionItem {
    id: string;
    value: string;
    icon?: string;
    metadata?: Record<string, any>;
  }
  
  /**
   * Generic Edge interface for connections between nodes
   */
  export interface Edge {
    source: string;
    target: string;
    type?: string;
    metadata?: Record<string, any>;
  }
  
  /**
   * Root data structure for the graph
   */
  export interface GraphData {
    // Project metadata
    projectName?: string;
    projectType?: string;
    language?: string;
    version?: string;
    analyzedAt?: string;
    
    // Core data
    nodes: Node[];
    edges: Edge[];
    
    // Additional metadata
    metadata?: Record<string, any>;
  }