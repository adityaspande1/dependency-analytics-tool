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
     */
    public async showDiagram(
        context: vscode.ExtensionContext,
        targetNode: Node,
        allNodes: Node[],
        diagramFormat: string = 'react'
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
        const graphData = this.prepareGraphData(targetNode, allNodes);
        
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
                </style>
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
     * @returns Graph data in the format expected by the digramaatic_ui library
     */
    private prepareGraphData(targetNode: Node, allNodes: Node[]): any {
        // Create a set of nodes to include in the graph
        const nodeIds = new Set<string>([targetNode.id]);
        const edges: any[] = [];
        
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
            metadata: {
                generatedBy: "Dependency Analytics Tool for VS Code",
                focusedNode: targetNode.id
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
                filePath: node.metadata?.sourceFile || node.metadata?.filePath
            }
        };
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
        
        return 'unknown';
    }
}