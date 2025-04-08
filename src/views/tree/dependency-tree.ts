// src/views/tree/dependency-tree.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { Graph, Node, Edge, Section, Item } from '../../converter/types';

/**
 * Tree view provider for displaying the dependency tree
 */
export class DependencyTreeProvider implements vscode.TreeDataProvider<DependencyTreeItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<DependencyTreeItem | undefined | void>();
    
    /**
     * Event fired when the tree data changes
     */
    public readonly onDidChangeTreeData = this._onDidChangeTreeData.event;
    
    /**
     * The current dependency graph, if any
     */
    private graph: Graph | null = null;
    
    /**
     * Map of node IDs to tree items
     */
    private nodeMap = new Map<string, DependencyTreeItem>();
    
    constructor() {}
    
    /**
     * Set the graph for this tree view
     * @param graph The dependency graph
     */
    public setGraph(graph: Graph | null): void {
        this.graph = graph;
        this.nodeMap.clear();
        this.refresh();
    }
    
    /**
     * Refresh the tree view
     */
    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }
    
    /**
     * Get the tree item for the given element
     * @param element The tree item to get
     * @returns The tree item
     */
    public getTreeItem(element: DependencyTreeItem): vscode.TreeItem {
        return element;
    }
    
    /**
     * Get the children of the given element
     * @param element The element to get children for
     * @returns A promise that resolves to the children
     */
    public getChildren(element?: DependencyTreeItem): Thenable<DependencyTreeItem[]> {
        if (!this.graph) {
            return Promise.resolve([]);
        }
        
        if (!element) {
            // Root level - find top-level nodes (those not targeted by any edge)
            const targetNodeIds = new Set<string>();
            
            // Collect all nodes that are targets of edges
            for (const edge of this.graph.edges) {
                targetNodeIds.add(edge.target);
            }
            
            // Filter out nodes that are not targets (these are root nodes)
            const rootNodes = this.graph.nodes.filter(node => !targetNodeIds.has(node.id));
            
            // If we don't have any root nodes, use all nodes as root
            const nodesToDisplay = rootNodes.length > 0 ? rootNodes : this.graph.nodes;
            
            return Promise.resolve(
                nodesToDisplay.map(node => this.createTreeItem(node))
            );
        }
        
        // Child nodes - find nodes that have an edge from this node
        const childNodes: Node[] = [];
        const nodeId = element.node.id;
        
        // Find edges where this node is the source
        const outgoingEdges = this.graph.edges.filter(edge => edge.source === nodeId);
        
        // For each outgoing edge, find the target node
        for (const edge of outgoingEdges) {
            const targetNode = this.graph.nodes.find(node => node.id === edge.target);
            if (targetNode) {
                childNodes.push(targetNode);
            }
        }
        
        return Promise.resolve(
            childNodes.map(node => this.createTreeItem(node))
        );
    }
    
    /**
     * Create a tree item for a node
     * @param node The node to create a tree item for
     * @returns The tree item
     */
    private createTreeItem(node: Node): DependencyTreeItem {
        // Check if we already have a tree item for this node
        if (this.nodeMap.has(node.id)) {
            return this.nodeMap.get(node.id)!;
        }
        
        // Determine if this node has children
        const hasChildren = this.graph?.edges.some(edge => edge.source === node.id) || false;
        
        // Create the tree item
        const treeItem = new DependencyTreeItem(
            node,
            hasChildren
                ? vscode.TreeItemCollapsibleState.Collapsed
                : vscode.TreeItemCollapsibleState.None
        );
        
        // Cache the tree item
        this.nodeMap.set(node.id, treeItem);
        
        return treeItem;
    }
}

/**
 * Tree item representing a node in the dependency tree
 */
export class DependencyTreeItem extends vscode.TreeItem {
    constructor(
        public readonly node: Node,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(node.title, collapsibleState);
        
        // Set tooltip to description of node
        this.tooltip = this.createTooltip(node);
        
        // Set description based on the type of node
        this.description = node.type;
        
        // Set context value for menus
        this.contextValue = node.type;
        
        // Add appropriate icon based on the type
        this.iconPath = this.getIconPath(node.type);
        
        // Add command to show details when clicked
        this.command = {
            command: 'dependencyAnalytics.showNodeDetails',
            title: 'Show Node Details',
            arguments: [node]
        };
    }
    
    /**
     * Create a tooltip for the node
     * @param node The node to create a tooltip for
     * @returns The tooltip
     */
    private createTooltip(node: Node): string {
        let tooltip = `${node.title} (${node.type})`;
        
        // Add metadata if available
        if (node.metadata) {
            if (node.metadata.fullName) {
                tooltip += `\nFull name: ${node.metadata.fullName}`;
            }
            
            if (node.metadata.filePath || node.metadata.sourceFile) {
                tooltip += `\nSource: ${node.metadata.filePath || node.metadata.sourceFile}`;
            }
            
            if (node.metadata.packageName) {
                tooltip += `\nPackage: ${node.metadata.packageName}`;
            }
            
            if (node.metadata.module) {
                tooltip += `\nModule: ${node.metadata.module}`;
            }
        }
        
        return tooltip;
    }
    
    /**
     * Get the icon path for a node type
     * @param nodeType The node type
     * @returns The icon path
     */
    private getIconPath(nodeType: string): { light: vscode.Uri; dark: vscode.Uri } {
        // Map node types to icon names
        let iconName = 'default';
        
        switch (nodeType.toLowerCase()) {
            case 'class':
                iconName = 'class';
                break;
            case 'interface':
                iconName = 'interface';
                break;
            case 'component':
                iconName = 'component';
                break;
            case 'function':
                iconName = 'function';
                break;
            case 'module':
            case 'package':
                iconName = 'package';
                break;
            case 'file':
                iconName = 'file';
                break;
            case 'model':
                iconName = 'model';
                break;
            case 'view':
                iconName = 'view';
                break;
            case 'app':
                iconName = 'app';
                break;
            default:
                iconName = 'default';
        }
        
        // Get the extension path using VS Code API
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.dependency-analytics')?.extensionPath || '';
        
        return {
            light: vscode.Uri.file(path.join(extensionPath, 'resources', 'icons', 'light', `${iconName}.svg`)),
            dark: vscode.Uri.file(path.join(extensionPath, 'resources', 'icons', 'dark', `${iconName}.svg`))
        };
    }
}