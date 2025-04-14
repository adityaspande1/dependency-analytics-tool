// src/core/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { ProjectDetector } from '../project-detector';
import { ParserRegistry } from '../parsers/parser-registry';
import { JavaParser } from '../parsers/java';
import { PythonParser } from '../parsers/python';
import { TypeScriptParser } from '../parsers/typescript';
import { DependencyTreeProvider } from '../views/tree/dependency-tree';
import { StructureTreeProvider } from '../views/tree/structure-tree';
import { MermaidGenerator } from '../views/diagram/mermaid-generator';
import { FileUtils } from '../utils';
import { convertDependencies, detectDependencyType } from '../converter';
import { Graph } from '../converter/types';
import { ProjectType } from './types';
import { ReactGraphGenerator } from '../views/diagram/react-graph-generator';

export function activate(context: vscode.ExtensionContext) {
    console.log('Dependency Analytics Extension is now active');
    
    // Create output channel for logs
    const outputChannel = vscode.window.createOutputChannel('Dependency Analytics');
    
    // Create tree view providers
    const dependencyTreeProvider = new DependencyTreeProvider();
    const structureTreeProvider = new StructureTreeProvider();
    
    // Register tree data providers
    vscode.window.registerTreeDataProvider('dependencyView', dependencyTreeProvider);
    vscode.window.registerTreeDataProvider('classStructure', structureTreeProvider);
    
    // Create parser registry and register parsers
    const parserRegistry = new ParserRegistry();
    parserRegistry.registerParser(new JavaParser());
    parserRegistry.registerParser(new PythonParser());
    parserRegistry.registerParser(new TypeScriptParser());
    
    // Create project detector
    const projectDetector = new ProjectDetector();
    
    // Create diagram generator
    const diagramGenerator = new MermaidGenerator();
    const reactGraphGenerator = new ReactGraphGenerator();
    
    // Store the current dependency graph
    let currentDependencyGraph: Graph | null = null;
    
    // Store all nodes for quick lookup
    let allNodes: any[] = [];
    
    // Check if dependencies.json exists in the workspace and load it
    async function loadExistingDependencies(): Promise<boolean> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            return false;
        }
        
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        
        // First check for standardized dependencies (from previous run)
        const standardDepsPath = path.join(workspaceRoot, '.vscode', 'standard-dependencies.json');
        if (fs.existsSync(standardDepsPath)) {
            try {
                outputChannel.appendLine(`Loading existing standardized dependencies from ${standardDepsPath}`);
                const dependenciesData = FileUtils.readJsonFile<Graph>(standardDepsPath);
                
                if (dependenciesData) {
                    currentDependencyGraph = dependenciesData;
                    
                    // Collect all nodes for reference
                    allNodes = currentDependencyGraph.nodes;
                    
                    // Update the tree views
                    dependencyTreeProvider.setGraph(currentDependencyGraph);
                    
                    outputChannel.appendLine(`Successfully loaded standardized dependencies with ${allNodes.length} nodes`);
                    return true;
                }
            } catch (error) {
                outputChannel.appendLine(`Error loading standardized dependencies: ${error}`);
            }
        }
        
        // If no standardized dependencies, check for language-specific dependencies
        const languageDepsPath = path.join(workspaceRoot, '.vscode', 'language-dependencies.json');
        if (fs.existsSync(languageDepsPath)) {
            try {
                outputChannel.appendLine(`Loading existing language-specific dependencies from ${languageDepsPath}`);
                const dependenciesData = FileUtils.readJsonFile<any>(languageDepsPath);
                
                if (dependenciesData) {
                    // Convert to standardized format
                    currentDependencyGraph = convertDependencies(dependenciesData);
                    
                    // Save the standardized format for future use
                    fs.writeFileSync(standardDepsPath, JSON.stringify(currentDependencyGraph, null, 2));
                    
                    // Collect all nodes for reference
                    allNodes = currentDependencyGraph.nodes;
                    
                    // Update the tree views
                    dependencyTreeProvider.setGraph(currentDependencyGraph);
                    
                    outputChannel.appendLine(`Successfully converted and loaded dependencies with ${allNodes.length} nodes`);
                    return true;
                }
            } catch (error) {
                outputChannel.appendLine(`Error converting dependencies: ${error}`);
            }
        }
        
        // Finally, check for legacy java dependencies.json
        const javaDepsPath = path.join(workspaceRoot, '.vscode', 'dependencies.json');
        if (fs.existsSync(javaDepsPath)) {
            try {
                outputChannel.appendLine(`Loading legacy Java dependencies from ${javaDepsPath}`);
                const dependenciesData = FileUtils.readJsonFile<any>(javaDepsPath);
                
                if (dependenciesData) {
                    // Convert to standardized format
                    currentDependencyGraph = convertDependencies(dependenciesData);
                    
                    // Save the standardized format for future use
                    fs.writeFileSync(standardDepsPath, JSON.stringify(currentDependencyGraph, null, 2));
                    
                    // Collect all nodes for reference
                    allNodes = currentDependencyGraph.nodes;
                    
                    // Update the tree views
                    dependencyTreeProvider.setGraph(currentDependencyGraph);
                    
                    outputChannel.appendLine(`Successfully converted and loaded legacy dependencies with ${allNodes.length} nodes`);
                    return true;
                }
            } catch (error) {
                outputChannel.appendLine(`Error converting legacy dependencies: ${error}`);
            }
        }
        
        return false;
    }
    
    // Start the analysis process
    async function startAnalysis(): Promise<void> {
        // Check if dependencies already exist
        if (await loadExistingDependencies()) {
            vscode.window.showInformationMessage('Loaded existing dependency analysis.');
            return;
        }
        
        // Select the root folder
        const rootFolder = await projectDetector.selectRootFolder();
        if (!rootFolder) {
            vscode.window.showErrorMessage('No folder selected for analysis.');
            return;
        }
        
        // Detect the project type
        const projectType = await projectDetector.detectProjectType(rootFolder);
        if (!projectType) {
            vscode.window.showErrorMessage('Could not detect project type. Please make sure your project structure is supported.');
            return;
        }
        
        vscode.window.showInformationMessage(`Detected ${projectType.name} project. Analyzing dependencies...`);
        
        try {
            // Parse the project and get standardized graph
            currentDependencyGraph = await parserRegistry.parse(projectType);
            
            // Save the standardized graph
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders && workspaceFolders.length > 0) {
                const workspaceRoot = workspaceFolders[0].uri.fsPath;
                const outputDir = path.join(workspaceRoot, '.vscode');
                
                // Ensure output directory exists
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }
                
                const standardDepsPath = path.join(outputDir, 'standard-dependencies.json');
                fs.writeFileSync(standardDepsPath, JSON.stringify(currentDependencyGraph, null, 2));
            }
            
            // Collect all nodes for reference
            allNodes = currentDependencyGraph.nodes;
            
            // Update the tree views
            dependencyTreeProvider.setGraph(currentDependencyGraph);
            
            vscode.window.showInformationMessage('Dependency analysis completed successfully.');
        } catch (error) {
            outputChannel.appendLine(`Error analyzing dependencies: ${error}`);
            vscode.window.showErrorMessage(`Error analyzing dependencies: ${error}`);
        }
    }
    
    // Register commands
    context.subscriptions.push(
        // Start analysis command
        vscode.commands.registerCommand('dependencyAnalytics.startAnalysis', startAnalysis),
        
        // Show node details command
        vscode.commands.registerCommand('dependencyAnalytics.showNodeDetails', (node: any) => {
            // Update the structure tree view
            structureTreeProvider.setNode(node.node);
        }),
        
        // Show diagram command
        vscode.commands.registerCommand('dependencyAnalytics.showClassDiagram', async (node: any) => {
            if (!node || !node.node) {
                // If called from command palette, let the user pick a node
                if (allNodes.length === 0) {
                    vscode.window.showErrorMessage('No nodes available. Please run dependency analysis first.');
                    return;
                }

                const nodeOptions = allNodes.map(n => ({
                    label: n.title,
                    description: n.type,
                    detail: n.metadata?.filePath || n.metadata?.sourceFile || '',
                    node: n
                }));

                const selectedItem = await vscode.window.showQuickPick(nodeOptions, {
                    placeHolder: 'Select a node to show its dependency diagram'
                });

                if (!selectedItem) {
                    return; // User cancelled
                }

                node = { node: selectedItem.node };
            }
            
            try {
                // First update the structure view
                structureTreeProvider.setNode(node.node);
                
                // Log to help debug
                outputChannel.appendLine(`Showing diagram for node: ${node.node.title} (${node.node.id})`);
                outputChannel.appendLine(`Node type: ${node.node.type}, metadata: ${JSON.stringify(node.node.metadata)}`);
                
                // Check if we have a graph with edges in our state
                if (currentDependencyGraph?.edges) {
                    const relatedEdges = currentDependencyGraph.edges.filter(
                        edge => edge.source === node.node.id || edge.target === node.node.id
                    );
                    outputChannel.appendLine(`Found ${relatedEdges.length} related edges for this node`);
                    
                    if (relatedEdges.length > 0) {
                        outputChannel.appendLine(`Sample edge: ${JSON.stringify(relatedEdges[0])}`);
                    }
                } else {
                    outputChannel.appendLine('No edges found in the dependency graph');
                }
                
                // Show the diagram
                if (currentDependencyGraph) {
                    // If we have the full graph with edges, use it
                    await reactGraphGenerator.showDiagram(
                        context,
                        node.node,
                        currentDependencyGraph.nodes,
                        'react', // Always use React format
                        currentDependencyGraph
                    );
                } else {
                    // Fallback to just the nodes
                    await reactGraphGenerator.showDiagram(
                        context,
                        node.node,
                        allNodes,
                        'react' // Always use React format
                    );
                }
            } catch (error) {
                outputChannel.appendLine(`Error showing diagram: ${error}`);
                vscode.window.showErrorMessage(`Error showing diagram: ${error}`);
            }
        }),
        
        // Navigate to source command
        vscode.commands.registerCommand('dependencyAnalytics.navigateToSource', async (node: any) => {
            if (!node || !node.metadata?.sourceFile) {
                vscode.window.showErrorMessage('Source file information not available');
                return;
            }
            
            try {
                const sourceFile = node.node.metadata.sourceFile;
                
                // Find the source file
                const files = await vscode.workspace.findFiles(`**/${sourceFile}`);
                if (files.length === 0) {
                    vscode.window.showErrorMessage(`File not found: ${sourceFile}`);
                    return;
                }
                
                // Open the document
                const document = await vscode.workspace.openTextDocument(files[0]);
                await vscode.window.showTextDocument(document);
            } catch (error) {
                outputChannel.appendLine(`Error navigating to source: ${error}`);
                vscode.window.showErrorMessage(`Error navigating to source: ${error}`);
            }
        }),
        
        // Refresh analysis command
        vscode.commands.registerCommand('dependencyAnalytics.refreshAnalysis', startAnalysis)
    );
    
    // Set up file watcher to refresh analysis when files change
    const fileWatcher = vscode.workspace.createFileSystemWatcher('/*.{java,py,ts,js}');
    
    // Debounce the refresh to avoid too many updates
    let refreshTimeout: NodeJS.Timeout | null = null;
    const refreshAnalysis = () => {
        if (refreshTimeout) {
            clearTimeout(refreshTimeout);
        }
        
        refreshTimeout = setTimeout(async () => {
            await startAnalysis();
        }, 2000);
    };
    
    fileWatcher.onDidChange(refreshAnalysis);
    fileWatcher.onDidCreate(refreshAnalysis);
    fileWatcher.onDidDelete(refreshAnalysis);
    
    context.subscriptions.push(fileWatcher);
    
    // Auto-start analysis when the extension is activated
    startAnalysis();
}

export function deactivate() {
    // Cleanup
}