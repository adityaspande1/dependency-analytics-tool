// src/views/diagram/react-graph-generator.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { DiagramGenerator } from './graph-generator';
import { Node, Edge, Graph } from '../../converter/types';

/**
 * Generates interactive diagrams using the digramaatic_ui React library
 */
export class ReactGraphGenerator extends DiagramGenerator {
    /**
     * Generate an interactive React-based diagram
     * @param targetNode The node to generate a diagram for
     * @param allNodes All nodes in the project (for finding relationships)
     * @returns An empty string, as we're generating HTML directly
     */
    public generateDiagram(targetNode: Node, allNodes: Node[]): string {
        // We don't need to return a string as we'll be generating React components
        // This is just to satisfy the interface
        return '';
    }
    
    /**
     * Display the generated diagram in a webview panel
     * @param context The extension context
     * @param targetNode The node to show the diagram for
     * @param allNodes All nodes in the project
     * @param diagramFormat The format of the diagram (ignored, will always use React)
     * @param graph Optional full graph data including edges
     */
    public async showDiagram(
        context: vscode.ExtensionContext,
        targetNode: Node,
        allNodes: Node[],
        diagramFormat: string = 'react',
        graph?: Graph
    ): Promise<void> {
        // Create a webview panel
        const panel = vscode.window.createWebviewPanel(
            'dependencyDiagram',
            `Diagram: ${targetNode.title}`,
            vscode.ViewColumn.One,
            { 
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'media')),
                    vscode.Uri.file(path.join(context.extensionPath, 'resources')),
                    vscode.Uri.file(path.join(context.extensionPath, 'dist', 'webview'))
                ]
            }
        );
        
        // Prepare data for the React app
        const graphData = this.prepareGraphData(targetNode, allNodes, graph);
        
        // Get path to assets
        const mainScript = this.getWebviewResourcePath(context, panel, 'dist/webview/assets/index.js');
        const mainCss = this.getWebviewResourcePath(context, panel, 'dist/webview/assets/style.css');
        
        if (!mainScript) {
            vscode.window.showErrorMessage('Could not load dependency diagram: build assets missing');
            panel.dispose();
            return;
        }
        
        // Generate HTML for the webview
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dependency Diagram</title>
                ${mainCss ? `<link rel="stylesheet" href="${mainCss}">` : ''}
                <script>
                    // Make data available to React app
                    window.diagramData = ${JSON.stringify(graphData)};
                    window.vscode = acquireVsCodeApi();
                    
                    // Add process polyfill for browser environment
                    window.process = {
                        env: { NODE_ENV: 'production' },
                        browser: true
                    };
                    
                    // Set additional visualization parameters
                    window.viewParams = {
                        singleNodeMode: ${graphData.nodes.length === 1},
                        showSections: true,
                        autoLayout: "${graphData.nodes.length === 1 ? 'single' : 'circular'}"
                    };
                </script>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        height: 100vh;
                        width: 100vw;
                        overflow: hidden;
                    }
                    #root {
                        height: 100vh;
                        width: 100vw;
                    }
                    
                    /* Component detail view styles */
                    .component-detail {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        max-width: 360px;
                        max-height: 80vh;
                        overflow-y: auto;
                        border-radius: 12px;
                        background-color: rgba(30, 30, 30, 0.95);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                        backdrop-filter: blur(8px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        z-index: 1000;
                        padding: 1.5rem;
                        animation: slideIn 0.3s ease-out;
                        transition: all 0.3s ease;
                    }
                    
                    @keyframes slideIn {
                        from { transform: translateY(-20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    
                    .component-heading {
                        margin-bottom: 1.5rem;
                        font-weight: bold;
                        font-size: 1.2rem;
                        padding-bottom: 0.5rem;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .component-heading .file-path {
                        font-size: 0.7rem;
                        opacity: 0.6;
                        margin-top: 0.25rem;
                        font-weight: normal;
                    }
                    
                    .component-section {
                        margin-bottom: 1.5rem;
                        border-radius: 8px;
                        background-color: rgba(45, 45, 45, 0.5);
                        transition: all 0.2s ease;
                        overflow: hidden;
                    }
                    
                    .section-heading {
                        font-weight: bold;
                        padding: 0.75rem 1rem;
                        color: #64D2FF;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: rgba(35, 35, 35, 0.7);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .section-heading:hover {
                        background-color: rgba(50, 50, 50, 0.7);
                    }
                    
                    .section-heading .count {
                        background-color: rgba(100, 210, 255, 0.15);
                        padding: 0.15rem 0.5rem;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        color: #64D2FF;
                    }
                    
                    .section-items {
                        padding: 0.5rem 1rem;
                    }
                    
                    .section-item {
                        display: flex;
                        align-items: baseline;
                        padding: 0.4rem 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .section-item:last-child {
                        border-bottom: none;
                    }
                    
                    .item-name {
                        font-weight: bold;
                        margin-right: 0.5rem;
                        min-width: 40%;
                    }
                    
                    .item-value {
                        opacity: 0.85;
                        word-break: break-word;
                    }
                    
                    .item-prop .item-name {
                        color: #F8C555;
                    }
                    
                    .item-state .item-name {
                        color: #FC9AD9;
                    }
                    
                    .item-hook .item-name {
                        color: #56D364;
                    }
                    
                    .item-method .item-name {
                        color: #71B7FF;
                    }
                    
                    .item-button {
                        background-color: rgba(100, 210, 255, 0.15);
                        border: none;
                        color: #64D2FF;
                        border-radius: 4px;
                        padding: 0.3rem 0.6rem;
                        font-size: 0.8rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    
                    .item-button:hover {
                        background-color: rgba(100, 210, 255, 0.3);
                    }
                    
                    .show-more {
                        width: 100%;
                        text-align: center;
                        background: none;
                        border: none;
                        color: #64D2FF;
                        padding: 0.4rem;
                        font-size: 0.8rem;
                        cursor: pointer;
                        opacity: 0.7;
                    }
                    
                    .show-more:hover {
                        opacity: 1;
                    }
                    
                    /* Improved close button */
                    .close-detail {
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.7);
                        cursor: pointer;
                        font-size: 1.2rem;
                        padding: 0;
                        line-height: 1;
                    }
                    
                    .close-detail:hover {
                        color: white;
                    }
                    
                    /* Collapsible sections */
                    .section-collapsed .section-items {
                        display: none;
                    }
                    
                    .section-arrow {
                        font-size: 0.8rem;
                        transition: transform 0.2s ease;
                    }
                    
                    .section-collapsed .section-arrow {
                        transform: rotate(-90deg);
                    }
                    
                    /* Theme-specific adjustments */
                    .vscode-light .component-detail {
                        background-color: rgba(255, 255, 255, 0.95);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                        border: 1px solid rgba(0, 0, 0, 0.1);
                    }
                    
                    .vscode-light .component-section {
                        background-color: rgba(240, 240, 240, 0.7);
                    }
                    
                    .vscode-light .section-heading {
                        background-color: rgba(230, 230, 230, 0.7);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    
                    .vscode-light .section-item {
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }
                </style>
                <script>
                    // JavaScript for toggling component sections
                    document.addEventListener('DOMContentLoaded', () => {
                        // Setup section toggling
                        document.body.addEventListener('click', (e) => {
                            if (e.target.closest('.section-heading')) {
                                const section = e.target.closest('.component-section');
                                section.classList.toggle('section-collapsed');
                            }
                            if (e.target.closest('.close-detail')) {
                                const detail = e.target.closest('.component-detail');
                                if (detail) {
                                    detail.style.opacity = '0';
                                    detail.style.transform = 'translateY(-20px)';
                                    setTimeout(() => detail.remove(), 300);
                                }
                            }
                        });
                    });
                </script>
            </head>
            <body>
                <div id="root"></div>
                <script type="module" src="${mainScript}"></script>
            </body>
            </html>
        `;
        
        // Set the HTML content
        panel.webview.html = htmlContent;
        
        // Handle messages from webview
        panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'selectNode':
                        // Handle node selection (e.g., update structure view)
                        const selectedNode = allNodes.find(n => n.id === message.nodeId);
                        if (selectedNode) {
                            vscode.commands.executeCommand('dependencyAnalytics.showNodeDetails', selectedNode);
                        }
                        break;
                    case 'navigateToSource':
                        // Handle navigation to source
                        if (message.filePath) {
                            vscode.commands.executeCommand('dependencyAnalytics.navigateToSource', {
                                metadata: { sourceFile: message.filePath }
                            });
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    }
    
    /**
     * Prepare data for the React graph component
     * @param targetNode The target node to focus on
     * @param allNodes All nodes in the project
     * @param graph Optional full graph data including edges
     * @returns Graph data in the format expected by the digramaatic_ui library
     */
    private prepareGraphData(targetNode: Node, allNodes: Node[], graph?: Graph): any {
        // Create a set of nodes to include in the graph
        const nodeIds = new Set<string>([targetNode.id]);
        const edges: any[] = [];
        
        // Check if we have an actual Graph object with edges already defined
        if (graph && Array.isArray(graph.edges)) {
            // Process existing edges, filter to only include those related to the target node
            graph.edges.forEach((edge: any) => {
                if (edge.source === targetNode.id || edge.target === targetNode.id) {
                    // Add both nodes to the set
                    nodeIds.add(edge.source);
                    nodeIds.add(edge.target);
                    
                    // Add the edge to our collection
                    edges.push({
                        source: edge.source,
                        target: edge.target,
                        type: edge.type || 'dependency',
                        metadata: edge.metadata || { relationship: 'related' }
                    });
                }
            });
        } else {
            // Try to find graph data if not provided
            const graphData = this.findGraphData(allNodes);
            if (graphData && Array.isArray(graphData.edges)) {
                // Process existing edges, filter to only include those related to the target node
                graphData.edges.forEach((edge: any) => {
                    if (edge.source === targetNode.id || edge.target === targetNode.id) {
                        // Add both nodes to the set
                        nodeIds.add(edge.source);
                        nodeIds.add(edge.target);
                        
                        // Add the edge to our collection
                        edges.push({
                            source: edge.source,
                            target: edge.target,
                            type: edge.type || 'dependency',
                            metadata: edge.metadata || { relationship: 'related' }
                        });
                    }
                });
            }
        }
        
        // If we didn't find any edges from graph data, fallback to generating them from metadata
        if (edges.length === 0) {
            // Find direct relationships (outgoing)
            allNodes.forEach(node => {
                if (node.metadata?.outgoingDependencies && Array.isArray(node.metadata.outgoingDependencies)) {
                    node.metadata.outgoingDependencies.forEach((dep: string) => {
                        const targetNodeData = allNodes.find(n => 
                            n.metadata?.fullName === dep || n.title === dep || n.id === dep);
                        
                        if (targetNodeData && (node.id === targetNode.id || targetNodeData.id === targetNode.id)) {
                            nodeIds.add(node.id);
                            nodeIds.add(targetNodeData.id);
                            
                            edges.push({
                                source: node.id,
                                target: targetNodeData.id,
                                type: 'dependency',
                                metadata: {
                                    direction: 'outgoing'
                                }
                            });
                        }
                    });
                }
                
                // Handle TypeScript imports (commonly stored in imports field)
                if (node.metadata?.imports && Array.isArray(node.metadata.imports)) {
                    node.metadata.imports.forEach((importInfo: any) => {
                        const importName = typeof importInfo === 'string' ? importInfo : importInfo.name || importInfo.path;
                        if (!importName) return;
                        
                        const importedNode = allNodes.find(n => 
                            n.metadata?.fullName === importName || 
                            n.title === importName || 
                            n.id === importName || 
                            (n.metadata?.filePath && n.metadata.filePath.includes(importName)));
                        
                        if (importedNode && (node.id === targetNode.id || importedNode.id === targetNode.id)) {
                            nodeIds.add(node.id);
                            nodeIds.add(importedNode.id);
                            
                            edges.push({
                                source: node.id,
                                target: importedNode.id,
                                type: 'import',
                                metadata: {
                                    direction: 'outgoing',
                                    relationship: 'imports'
                                }
                            });
                        }
                    });
                }
            });
            
            // Find inheritance relationships
            allNodes.forEach(node => {
                if (node.metadata?.superClassName && node.id === targetNode.id) {
                    const superClass = allNodes.find(n => 
                        n.metadata?.fullName === node.metadata.superClassName || 
                        n.title === node.metadata.superClassName);
                    
                    if (superClass) {
                        nodeIds.add(superClass.id);
                        
                        edges.push({
                            source: node.id,
                            target: superClass.id,
                            type: 'inheritance',
                            metadata: {
                                relationship: 'extends'
                            }
                        });
                    }
                }
                
                if (node.metadata?.superClassName && node.metadata.superClassName === targetNode.metadata?.fullName) {
                    nodeIds.add(node.id);
                    
                    edges.push({
                        source: node.id,
                        target: targetNode.id,
                        type: 'inheritance',
                        metadata: {
                            relationship: 'extends'
                        }
                    });
                }
            });
            
            // Find interface implementation relationships
            allNodes.forEach(node => {
                if (node.metadata?.interfaces && Array.isArray(node.metadata.interfaces)) {
                    node.metadata.interfaces.forEach((interfaceName: string) => {
                        const interfaceNode = allNodes.find(n => 
                            n.metadata?.fullName === interfaceName || n.title === interfaceName);
                        
                        if (interfaceNode && (node.id === targetNode.id || interfaceNode.id === targetNode.id)) {
                            nodeIds.add(node.id);
                            nodeIds.add(interfaceNode.id);
                            
                            edges.push({
                                source: node.id,
                                target: interfaceNode.id,
                                type: 'implementation',
                                metadata: {
                                    relationship: 'implements'
                                }
                            });
                        }
                    });
                }
            });
        }
        
        // Filter nodes by the ids we've collected
        const nodes = allNodes
            .filter(node => nodeIds.has(node.id))
            .map(node => this.transformNodeForReact(node));
        
        // Return the graph data in format expected by digramaatic_ui
        return {
            nodes,
            edges,
            projectName: `Diagram: ${targetNode.title}`,
            language: this.detectLanguage(allNodes),
            layout: nodes.length === 1 ? 'single' : 'circular',
            visualization: {
                mode: edges.length === 0 ? 'detail' : 'graph',
                singleNodeDetail: edges.length === 0
            },
            metadata: {
                generatedBy: "Dependency Analytics Tool for VS Code",
                focusedNode: targetNode.id,
                isSingleNode: nodes.length === 1
            }
        };
    }
    
    /**
     * Transform a node to the format expected by the digramaatic_ui library
     * @param node The node to transform
     * @returns A node in the format expected by digramaatic_ui
     */
    private transformNodeForReact(node: Node): any {
        return {
            id: node.id,
            title: node.title,
            type: node.type,
            sections: node.sections,
            metadata: {
                ...node.metadata,
                filePath: node.metadata?.sourceFile || node.metadata?.filePath,
                // Extract additional metadata for visualization
                hooks: this.extractHooks(node),
                state: this.extractState(node),
                props: this.extractProps(node)
            }
        };
    }
    
    /**
     * Extract hooks from a node's sections
     * @param node The node to extract hooks from
     * @returns Array of hook names
     */
    private extractHooks(node: Node): string[] {
        // Extract hooks from sections
        const hooks: string[] = [];
        if (node.sections) {
            for (const section of node.sections) {
                if (section.name.toLowerCase() === 'hooks' && section.items) {
                    for (const item of section.items) {
                        if (item.icon === 'hook' && item.value) {
                            hooks.push(item.value);
                        }
                    }
                }
            }
        }
        return hooks;
    }
    
    /**
     * Extract state variables from a node's sections
     * @param node The node to extract state from
     * @returns Array of state variable details
     */
    private extractState(node: Node): any[] {
        // Extract state from sections
        const stateItems: any[] = [];
        if (node.sections) {
            for (const section of node.sections) {
                if (section.name.toLowerCase() === 'state' && section.items) {
                    for (const item of section.items) {
                        if (item.icon === 'state' && item.value) {
                            stateItems.push({
                                name: item.id,
                                value: item.value
                            });
                        }
                    }
                }
            }
        }
        return stateItems;
    }
    
    /**
     * Extract props from a node's sections
     * @param node The node to extract props from
     * @returns Array of prop details
     */
    private extractProps(node: Node): any[] {
        // Extract props from sections
        const propItems: any[] = [];
        if (node.sections) {
            for (const section of node.sections) {
                if (section.name.toLowerCase() === 'props' && section.items) {
                    for (const item of section.items) {
                        if (item.icon === 'prop' && item.value) {
                            propItems.push({
                                name: item.id,
                                value: item.value
                            });
                        }
                    }
                }
            }
        }
        return propItems;
    }
    
    /**
     * Get webview resource URI
     * @param context Extension context
     * @param panel Webview panel
     * @param resourcePath Path to the resource relative to extension root
     * @returns URI to the resource in the webview
     */
    private getWebviewResourcePath(
        context: vscode.ExtensionContext,
        panel: vscode.WebviewPanel,
        resourcePath: string
    ): string | undefined {
        const resourceUri = vscode.Uri.file(path.join(context.extensionPath, resourcePath));
        
        if (!fs.existsSync(resourceUri.fsPath)) {
            console.error(`Resource not found: ${resourceUri.fsPath}`);
            return undefined;
        }
        
        const webviewUri = panel.webview.asWebviewUri(resourceUri);
        return webviewUri.toString();
    }
    
    /**
     * Detect the language of the project based on the nodes
     * @param nodes All nodes in the project
     * @returns The detected language
     */
    private detectLanguage(nodes: Node[]): string {
        // Try to detect language from node types
        const nodeTypes = new Set<string>();
        nodes.forEach(node => {
            if (node.type) nodeTypes.add(node.type.toLowerCase());
        });
        
        if (nodeTypes.has('component') || nodeTypes.has('hook')) return 'typescript';
        if (nodeTypes.has('class') || nodeTypes.has('interface')) return 'java';
        if (nodeTypes.has('model') || nodeTypes.has('view')) return 'python';
        
        // Try to detect from file extensions in metadata
        for (const node of nodes) {
            if (node.metadata?.filePath || node.metadata?.sourceFile) {
                const filePath = node.metadata?.filePath || node.metadata?.sourceFile || '';
                if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) return 'typescript';
                if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) return 'javascript';
                if (filePath.endsWith('.java')) return 'java';
                if (filePath.endsWith('.py')) return 'python';
            }
        }
        
        return 'unknown';
    }
    
    /**
     * Find the complete graph data including edges from the set of nodes
     * @param nodes All nodes in the project
     * @returns Graph data if found, otherwise undefined
     */
    private findGraphData(nodes: Node[]): Graph | undefined {
        // Check if the allNodes array is actually the entire graph object
        // This happens when the extension has loaded the graph and passed it
        if (Array.isArray(nodes) && 'edges' in (nodes as any)) {
            console.log('Found edges property in nodes array');
            return nodes as unknown as Graph;
        }
        
        // Check if the first node has a reference to the parent graph
        if (nodes.length > 0 && (nodes[0] as any)._graph) {
            console.log('Found _graph property in first node');
            return (nodes[0] as any)._graph;
        }
        
        // Otherwise, try to rebuild the graph structure from the workspace
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            console.log('No workspace folders found');
            return undefined;
        }
        
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        console.log('Workspace root:', workspaceRoot);
        
        // First try to load from standard location
        const standardDepsPath = path.join(workspaceRoot, '.vscode', 'standard-dependencies.json');
        console.log('Checking standard deps path:', standardDepsPath);
        if (fs.existsSync(standardDepsPath)) {
            console.log('Found standard deps file');
            try {
                const data = JSON.parse(fs.readFileSync(standardDepsPath, 'utf8'));
                if (data && data.nodes && data.edges) {
                    console.log(`Loaded ${data.edges.length} edges from standard file`);
                    return data as Graph;
                }
            } catch (error) {
                console.error('Error loading graph data:', error);
            }
        }
        
        // Then try from assets folder (common for demo/sample projects)
        const assetsDepsPath = path.join(workspaceRoot, 'assets', 'standard-dependencies.json');
        console.log('Checking assets deps path:', assetsDepsPath);
        if (fs.existsSync(assetsDepsPath)) {
            console.log('Found assets deps file');
            try {
                const data = JSON.parse(fs.readFileSync(assetsDepsPath, 'utf8'));
                if (data && data.nodes && data.edges) {
                    console.log(`Loaded ${data.edges.length} edges from assets file`);
                    return data as Graph;
                }
            } catch (error) {
                console.error('Error loading graph data from assets:', error);
            }
        }
        
        // Finally try the root of the workspace
        const rootDepsPath = path.join(workspaceRoot, 'standard-dependencies.json');
        console.log('Checking root deps path:', rootDepsPath);
        if (fs.existsSync(rootDepsPath)) {
            console.log('Found root deps file');
            try {
                const data = JSON.parse(fs.readFileSync(rootDepsPath, 'utf8'));
                if (data && data.nodes && data.edges) {
                    console.log(`Loaded ${data.edges.length} edges from root file`);
                    return data as Graph;
                }
            } catch (error) {
                console.error('Error loading graph data from root:', error);
            }
        }
        
        console.log('Could not find any graph data');
        return undefined;
    }
}