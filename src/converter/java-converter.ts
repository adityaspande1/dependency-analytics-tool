// src/converter/java-converter.ts

import { Graph, Node, Edge, Section, Item } from './types';
import { generateId, createSection, createItem, getSimpleName, determineNodeType } from './utils';

interface JavaField {
  name: string;
  type: string;
  modifier: string;
  final: boolean;
  static: boolean;
}

interface JavaMethod {
  accessModifier: string;
  name: string;
  parameters: string[];
  returnType: string;
  final: boolean;
  static: boolean;
  abstract: boolean;
}

interface JavaClass {
  name: string;
  superClassName: string;
  interfaces: string[];
  packageName: string;
  sourceFile: string;
  fields: JavaField[];
  methods: JavaMethod[];
  outGoingDependencies: string[];
  incomingDependencies: string[];
  final: boolean;
  class: boolean;
  interface: boolean;
  abstract: boolean;
  package: boolean;
  importedPackages: {
    name: string;
    package: boolean;
  }[];
  elements?: any[];
}

interface JavaPackage {
  name: string;
  elements: (JavaPackage | JavaClass)[];
  class?: boolean;
  package?: boolean;
}

export function convertJavaDependencies(javaDependencies: JavaPackage): Graph {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeMap = new Map<string, string>();
  
  // Process the Java package structure
  processJavaPackage(javaDependencies, nodes, nodeMap);
  
  // Create edges based on node relationships
  createJavaEdges(nodes, edges, nodeMap);
  
  return {
    nodes,
    edges,
    metadata: {
      projectType: 'java',
      projectName: javaDependencies.name || 'Java Project',
      convertedAt: new Date().toISOString(),
      originalFormat: {}
    }
  };
}

function processJavaPackage(
  javaPackage: JavaPackage, 
  nodes: Node[], 
  nodeMap: Map<string, string>
) {
  if (!javaPackage.elements) {return;}
  
  // Process all elements in the package
  javaPackage.elements.forEach(element => {
    if (element.class) {
      // This is a class
      const javaClass = element as JavaClass;
      createJavaClassNode(javaClass, nodes, nodeMap);
    } else if (element.package) {
      // This is a package, process it recursively
      processJavaPackage(element as JavaPackage, nodes, nodeMap);
    }
  });
}

function createJavaClassNode(
  javaClass: JavaClass,
  nodes: Node[],
  nodeMap: Map<string, string>
) {
  const nodeId = generateId('java', javaClass.name);
  nodeMap.set(javaClass.name, nodeId);
  
  const sections: Section[] = [];
  
  // Create class section with basic information
  const classInfoItems: Item[] = [];
  
  // Add inheritance info
  if (javaClass.superClassName && javaClass.superClassName !== 'java.lang.Object') {
    classInfoItems.push(createItem(
      generateId('extends', `${javaClass.name}_extends`),
      `extends ${getSimpleName(javaClass.superClassName)}`,
      'inheritance'
    ));
  }
  
  // Add interfaces
  if (javaClass.interfaces && javaClass.interfaces.length > 0) {
    const interfaces = javaClass.interfaces.map(getSimpleName).join(', ');
    classInfoItems.push(createItem(
      generateId('implements', `${javaClass.name}_implements`),
      `implements ${interfaces}`,
      'interface'
    ));
  }
  
  if (classInfoItems.length > 0) {
    sections.push(createSection(
      generateId('sec', `${nodeId}_info`),
      'Class Info',
      classInfoItems
    ));
  }
  
  // Create fields section
  if (javaClass.fields && javaClass.fields.length > 0) {
    const fieldItems = javaClass.fields.map(field => {
      const modifiers: string[] = [];
      if (field.modifier) {modifiers.push(field.modifier.toLowerCase());}
      if (field.static) {modifiers.push('static');}
      if (field.final) {modifiers.push('final');}
      
      return createItem(
        generateId('field', `${javaClass.name}_${field.name}`),
        `${modifiers.join(' ')} ${getSimpleName(field.type)} ${field.name}`,
        'field',
        { type: field.type }
      );
    });
    
    sections.push(createSection(
      generateId('sec', `${nodeId}_fields`),
      'Fields',
      fieldItems
    ));
  }
  
  // Create methods section
  if (javaClass.methods && javaClass.methods.length > 0) {
    const methodItems = javaClass.methods.map(method => {
      const modifiers: string[] = [];
      if (method.accessModifier) {modifiers.push(method.accessModifier.toLowerCase());}
      if (method.static) {modifiers.push('static');}
      if (method.final) {modifiers.push('final');}
      if (method.abstract) {modifiers.push('abstract');}
      
      // For constructors, display name differently
      const isConstructor = method.name === '<init>';
      const displayName = isConstructor ? getSimpleName(javaClass.name) : method.name;
      
      // Simplify parameter types to just the class name, not the full package
      const params = method.parameters.map(getSimpleName).join(', ');
      
      // Display return type for non-constructors
      const returnTypeStr = isConstructor ? '' : `: ${getSimpleName(method.returnType)}`;
      
      return createItem(
        generateId('method',`${javaClass.name}_${method.name}`),
        `${modifiers.join(' ')} ${displayName}(${params})${returnTypeStr}`,
        isConstructor ? 'constructor' : 'method',
        { 
          returnType: method.returnType,
          isConstructor
        }
      );
    });
    
    sections.push(createSection(
      generateId('sec', `${nodeId}_methods`),
      'Methods',
      methodItems
    ));
  }
  
  // Create imports section if available
  if (javaClass.importedPackages && javaClass.importedPackages.length > 0) {
    const importItems = javaClass.importedPackages.map(pkg => {
      return createItem(
        generateId('import', `${javaClass.name}_${pkg.name}`),
        pkg.name,
        'package'
      );
    });
    
    sections.push(createSection(
      generateId('sec', `${nodeId}_imports`),
      'Imports',
      importItems
    ));
  }
  
  // Create the node
  nodes.push({
    id: nodeId,
    title: getSimpleName(javaClass.name),
    type: javaClass.interface ? 'interface' : 'class',
    sections,
    metadata: {
      fullName: javaClass.name,
      packageName: javaClass.packageName,
      sourceFile: javaClass.sourceFile,
      isAbstract: javaClass.abstract,
      isFinal: javaClass.final,
      superClassName: javaClass.superClassName,
      interfaces: javaClass.interfaces,
      outGoingDependencies: javaClass.outGoingDependencies,
      incomingDependencies: javaClass.incomingDependencies
    }
  });
}

function createJavaEdges(
  nodes: Node[],
  edges: Edge[],
  nodeMap: Map<string, string>
) {
  nodes.forEach(node => {
    const metadata = node.metadata;
    
    // Skip if no metadata or not a class
    if (!metadata || (node.type !== 'class' && node.type !== 'interface')) {return;}
    
    // Create inheritance edge if there's a superclass
    if (metadata.fullName && metadata.superClassName && 
        metadata.superClassName !== 'java.lang.Object') {
      const targetNodeId = nodeMap.get(metadata.superClassName);
      
      if (targetNodeId) {
        edges.push({
          source: node.id,
          target: targetNodeId,
          type: 'inheritance',
          metadata: {
            relationship: 'extends'
          }
        });
      }
    }
    
    // Create interface implementation edges
    if (metadata.interfaces) {
      metadata.interfaces.forEach((interfaceName: string) => {
        const targetNodeId = nodeMap.get(interfaceName);
        
        if (targetNodeId) {
          edges.push({
            source: node.id,
            target: targetNodeId,
            type: 'implementation',
            metadata: {
              relationship: 'implements'
            }
          });
        }
      });
    }
    
    // Create dependency edges
    if (metadata.outGoingDependencies) {
      metadata.outGoingDependencies.forEach((dependency: string) => {
        const targetNodeId = nodeMap.get(dependency);
        
        if (targetNodeId) {
          edges.push({
            source: node.id,
            target: targetNodeId,
            type: 'dependency',
            metadata: {
              direction: 'outgoing'
            }
          });
        }
      });
    }
  });
}