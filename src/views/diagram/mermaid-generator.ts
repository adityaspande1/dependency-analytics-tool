// src/views/diagram/mermaid-generator.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DiagramGenerator } from './graph-generator';
import { Node } from '../../converter/types';

/**
 * Generates class diagrams using Mermaid syntax from the standard format
 */
export class MermaidGenerator extends DiagramGenerator {
    /**
     * Generate a Mermaid class diagram
     * @param targetNode The node to generate a diagram for
     * @param allNodes All nodes in the project (for finding relationships)
     * @returns The generated Mermaid diagram as a string
     */
    public generateDiagram(targetNode: Node, allNodes: Node[]): string {
        let diagram = 'classDiagram\n';
        
        // Keep track of processed classes to avoid duplicates
        const processedNodeIds = new Set<string>();
        const processedRelations = new Set<string>();
        
        // Queue of nodes to process
        const nodeQueue: Node[] = [targetNode];
        
        // Process all nodes first to define them
        while (nodeQueue.length > 0) {
            const currentNode = nodeQueue.shift()!;
            
            // Skip if already processed
            if (processedNodeIds.has(currentNode.id)) {
                continue;
            }
            processedNodeIds.add(currentNode.id);
            
            try {
                // Add node definition
                diagram += this.generateNodeDefinition(currentNode);
            } catch (error) {
                console.error(`Error generating node definition for ${currentNode.title}: ${error}`);
            }
            
            // Add related nodes to queue
            this.findRelatedNodes(currentNode, allNodes).forEach(relatedNode => {
                if (!processedNodeIds.has(relatedNode.id)) {
                    nodeQueue.push(relatedNode);
                }
            });
        }
        
        // Reset processed set for relationship processing
        processedNodeIds.clear();
        
        // Queue of nodes to process for relationships
        const relationshipQueue: Node[] = [targetNode];
        
        // Process all relationships
        while (relationshipQueue.length > 0) {
            const currentNode = relationshipQueue.shift()!;
            
            // Skip if already processed
            if (processedNodeIds.has(currentNode.id)) {
                continue;
            }
            processedNodeIds.add(currentNode.id);
            
            try {
                // Add relationships
                diagram += this.generateRelationships(currentNode, allNodes, processedRelations);
            } catch (error) {
                console.error(`Error generating relationships for ${currentNode.title}: ${error}`);
            }
            
            // Add related nodes to queue
            this.findRelatedNodes(currentNode, allNodes).forEach(relatedNode => {
                if (!processedNodeIds.has(relatedNode.id)) {
                    relationshipQueue.push(relatedNode);
                }
            });
        }
        
        return diagram;
    }
    
    /**
     * Generate the Mermaid node definition
     * @param node The node to generate a definition for
     * @returns The Mermaid node definition
     */
    private generateNodeDefinition(node: Node): string {
        let definition = '';
        const safeName = this.safeMermaidName(node.title);
        
        definition += `    class ${safeName} {\n`;
        
        // Add stereotypes based on node type
        const stereotypes: string[] = [];
        if (node.type === 'interface') stereotypes.push('interface');
        if (node.type === 'abstract' || node.metadata?.isAbstract) stereotypes.push('abstract');
        
        if (stereotypes.length > 0) {
            definition += `        <<${stereotypes.join(' ')}>>\n`;
        }
        
        // Find fields and methods in sections
        for (const section of node.sections || []) {
            for (const item of section.items || []) {
                try {
                    // If the item has an icon, use it to determine the type
                    if (item.icon === 'field') {
                        // Extract access modifier if available at the start of the value
                        let accessModifier = '~'; // Default to package private
                        let itemValue = item.value;
                        
                        if (itemValue.startsWith('public ')) {
                            accessModifier = '+';
                            itemValue = itemValue.substring(7);
                        } else if (itemValue.startsWith('private ')) {
                            accessModifier = '-';
                            itemValue = itemValue.substring(8);
                        } else if (itemValue.startsWith('protected ')) {
                            accessModifier = '#';
                            itemValue = itemValue.substring(10);
                        }
                        
                        // Check for static
                        let staticPrefix = '';
                        if (itemValue.includes('static ')) {
                            staticPrefix = '$';
                        }
                        
                        // Clean up the field value
                        const cleanedValue = this.cleanFieldValue(itemValue);
                        definition += `        ${accessModifier}${staticPrefix}${cleanedValue}\n`;
                    } else if (item.icon === 'method' || item.icon === 'constructor') {
                        // Extract access modifier if available at the start of the value
                        let accessModifier = '~'; // Default to package private
                        let itemValue = item.value;
                        
                        if (itemValue.startsWith('public ')) {
                            accessModifier = '+';
                            itemValue = itemValue.substring(7);
                        } else if (itemValue.startsWith('private ')) {
                            accessModifier = '-';
                            itemValue = itemValue.substring(8);
                        } else if (itemValue.startsWith('protected ')) {
                            accessModifier = '#';
                            itemValue = itemValue.substring(10);
                        }
                        
                        // Check for static and abstract
                        let staticPrefix = '';
                        let abstractPrefix = '';
                        if (itemValue.includes('static ')) {
                            staticPrefix = '$';
                        }
                        if (itemValue.includes('abstract ')) {
                            abstractPrefix = '*';
                        }
                        
                        // Clean up the method value
                        const cleanedValue = this.cleanMethodValue(itemValue);
                        definition += `        ${accessModifier}${staticPrefix}${abstractPrefix}${cleanedValue}\n`;
                    }
                } catch (error) {
                    console.error(`Error processing item ${item.id}: ${error}`);
                }
            }
        }
        
        definition += '    }\n';
        return definition;
    }
    
    /**
     * Generate the Mermaid relationships for a node
     * @param node The node to generate relationships for
     * @param allNodes All nodes in the project
     * @param processedRelations Set of already processed relationships
     * @returns The Mermaid relationships
     */
    private generateRelationships(
        node: Node, 
        allNodes: Node[], 
        processedRelations: Set<string>
    ): string {
        let relationships = '';
        const safeName = this.safeMermaidName(node.title);
        
        // Look for inheritance in metadata
        if (node.metadata?.superClassName || node.metadata?.superClasses) {
            const superClasses = node.metadata.superClasses || 
                (node.metadata.superClassName ? [node.metadata.superClassName] : []);
            
            for (const superClass of superClasses) {
                if (superClass && superClass !== 'java.lang.Object') {
                    // Try to find the super class in the node list
                    const superNode = this.findNodeByName(superClass, allNodes);
                    if (superNode) {
                        const superName = this.safeMermaidName(superNode.title);
                        const relation = `    ${superName} <|-- ${safeName}\n`;
                        
                        if (!processedRelations.has(relation)) {
                            relationships += relation;
                            processedRelations.add(relation);
                        }
                    }
                }
            }
        }
        
        // Look for interface implementations in metadata
        if (node.metadata?.interfaces) {
            for (const interfaceName of node.metadata.interfaces) {
                // Try to find the interface in the node list
                const interfaceNode = this.findNodeByName(interfaceName, allNodes);
                if (interfaceNode) {
                    const interfaceSafeName = this.safeMermaidName(interfaceNode.title);
                    const relation = `    ${interfaceSafeName} <|.. ${safeName}\n`;
                    
                    if (!processedRelations.has(relation)) {
                        relationships += relation;
                        processedRelations.add(relation);
                    }
                }
            }
        }
        
        // Look for dependencies in the metadata
        if (node.metadata?.outgoingDependencies) {
            for (const depName of node.metadata.outgoingDependencies) {
                // Try to find the dependency in the node list
                const depNode = this.findNodeByName(depName, allNodes);
                if (depNode) {
                    const depSafeName = this.safeMermaidName(depNode.title);
                    
                    // Skip self-dependencies
                    if (depSafeName === safeName) {
                        continue;
                    }
                    
                    const relation = `    ${safeName} --> ${depSafeName}\n`;
                    
                    if (!processedRelations.has(relation)) {
                        relationships += relation;
                        processedRelations.add(relation);
                    }
                }
            }
        }
        
        return relationships;
    }
    
    /**
     * Find nodes related to the given node
     * @param node The node to find related nodes for
     * @param allNodes All nodes in the project
     * @returns The related nodes
     */
    private findRelatedNodes(node: Node, allNodes: Node[]): Node[] {
        const relatedNodes: Node[] = [];
        
        // Look for inheritance
        if (node.metadata?.superClassName || node.metadata?.superClasses) {
            const superClasses = node.metadata.superClasses || 
                (node.metadata.superClassName ? [node.metadata.superClassName] : []);
            
            for (const superClass of superClasses) {
                if (superClass && superClass !== 'java.lang.Object') {
                    const superNode = this.findNodeByName(superClass, allNodes);
                    if (superNode) {
                        relatedNodes.push(superNode);
                    }
                }
            }
        }
        
        // Look for interface implementations
        if (node.metadata?.interfaces) {
            for (const interfaceName of node.metadata.interfaces) {
                const interfaceNode = this.findNodeByName(interfaceName, allNodes);
                if (interfaceNode) {
                    relatedNodes.push(interfaceNode);
                }
            }
        }
        
        // Look for dependencies
        if (node.metadata?.outgoingDependencies) {
            for (const depName of node.metadata.outgoingDependencies) {
                const depNode = this.findNodeByName(depName, allNodes);
                if (depNode) {
                    relatedNodes.push(depNode);
                }
            }
        }
        
        return relatedNodes;
    }
    
    /**
     * Find a node by its name or full name
     * @param name The name to look for
     * @param allNodes All nodes in the project
     * @returns The node, or undefined if not found
     */
    private findNodeByName(name: string, allNodes: Node[]): Node | undefined {
        // Try to find by full name first
        let node = allNodes.find(n => 
            n.metadata?.fullName === name ||
            n.title === name
        );
        
        if (!node) {
            // Try to extract simple name and search by that
            const simpleName = name.split('.').pop() || name;
            node = allNodes.find(n => n.title === simpleName);
        }
        
        return node;
    }
    
    /**
     * Clean a field value for display in Mermaid
     * @param value The field value
     * @returns The cleaned value
     */
    private cleanFieldValue(value: string): string {
        // Replace static, final keywords
        let cleaned = value.replace(/static |final /g, '');
        
        // Ensure there's a type declaration
        if (!cleaned.includes(':')) {
            // Try to extract type from format "Type name"
            const parts = cleaned.trim().split(' ');
            if (parts.length >= 2) {
                const name = parts.pop()!;
                const type = parts.join(' ');
                cleaned = `${name} : ${type}`;
            }
        }
        
        return this.safeMermaidName(cleaned);
    }
    
    /**
     * Clean a method value for display in Mermaid
     * @param value The method value
     * @returns The cleaned value
     */
    private cleanMethodValue(value: string): string {
        // Replace static, final, abstract keywords
        let cleaned = value.replace(/static |final |abstract /g, '');
        
        // Ensure there's a return type
        if (!cleaned.includes(':') && !cleaned.includes('->')) {
            // Append void return type
            cleaned = `${cleaned} : void`;
        }
        
        return this.safeMermaidName(cleaned);
    }
    
    /**
     * Make a name safe for Mermaid syntax
     * @param name The name to make safe
     * @returns The safe name
     */
    private safeMermaidName(name: string): string {
        if (!name) return 'Unknown';
        
        // Replace special characters that cause issues in Mermaid syntax
        return name
            .replace(/[<>()[\]{}:;"',.?!@#$%^&*+=|\\\/]/g, '_') // Replace special chars with underscore
            .replace(/^_+|_+$/g, ''); // Trim underscores from start and end
    }
}

// Export the MermaidGenerator
export default MermaidGenerator;