// src/converter/utils.ts

import { Node, Item, Section } from './types';

/**
 * Generates a unique ID for a node or edge
 */
export function generateId(prefix: string, name: string): string {
  return`${prefix}_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
}

/**
 * Extracts the simple name from a fully qualified Java class name
 * e.g., com.sample.book.Book -> Book
 */
export function getSimpleName(fullyQualifiedName: string): string {
  if (!fullyQualifiedName) {return '';}
  const parts = fullyQualifiedName.split('.');
  return parts[parts.length - 1];
}

/**
 * Creates a section with items
 */
export function createSection(id: string, name: string, items: Item[], metadata?: Record<string, any>): Section {
  return {
    id,
    name,
    items,
    metadata
  };
}

/**
 * Creates an item for a section
 */
export function createItem(id: string, value: string, icon?: string, metadata?: Record<string, any>): Item {
  return {
    id,
    value,
    icon,
    metadata
  };
}

/**
 * Determines the type of import/dependency based on the name pattern
 */
export function determineNodeType(name: string, additionalInfo?: any): string {
  if (additionalInfo?.class === true || additionalInfo?.isClass === true) {
    return additionalInfo.interface || additionalInfo.isInterface ? 'interface' : 'class';
  }
  
  if (additionalInfo?.type === 'function' || name.includes('()') || name.endsWith(')')) {
    return 'function';
  }
  
  if (additionalInfo?.type === 'model') {
    return 'model';
  }
  
  if (additionalInfo?.type === 'view') {
    return 'view';
  }
  
  if (name.endsWith('.ts') || name.endsWith('.js') || name.endsWith('.jsx') || name.endsWith('.tsx')) {
    return 'file';
  }
  
  // Default to module if we can't determine more specific type
  return 'module';
}