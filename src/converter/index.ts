// src/converter/index.ts
import { Graph } from './types';
import { convertJavaDependencies } from './java-converter';
import { convertTypeScriptDependencies } from './typescript-converter';
import { convertPythonDependencies } from './python-converter';
/**
 * Detect the type of dependency data based on file content
 */
export function detectDependencyType(data: any): 'typescript' | 'java' | 'python' | 'unknown' {
  // Check for React TypeScript component-based dependencies (new format)
  if (!Array.isArray(data) && data.components && typeof data.components === 'object') {
    return 'typescript';
  }
  
  // Check for TypeScript dependencies (legacy format)
  if (Array.isArray(data) && data.length > 0 && data[0].fileName && data[0].exports) {
    return 'typescript';
  }
  
  // Check for Java dependencies
  if (!Array.isArray(data) && data.name && data.elements) {
    return 'java';
  }
  
  // Check for Python dependencies
  if (!Array.isArray(data) && data.metadata && data.apps && data.models) {
    return 'python';
  }
  
  // Will add more format detection as needed
  
  return 'unknown';
}

/**
 * Convert dependencies to standardized format
 */
export function convertDependencies(data: any): Graph {
  const type = detectDependencyType(data);
  
  switch (type) {
    case 'typescript':
      return convertTypeScriptDependencies(data);
    case 'java':
      return convertJavaDependencies(data);
    case 'python':
      return convertPythonDependencies(data);
    default:
      throw new Error(`Unknown dependency data format`);
  }
}

// Export types
export * from './types';