import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Dependency, Method, Field } from '../../core/types';

/**
 * Base class for diagram generators
 */
export abstract class DiagramGenerator {
    /**
     * Generate a diagram for a class
     * @param classItem The class to generate a diagram for
     * @param allClasses All classes in the project (for finding relationships)
     * @returns The generated diagram as a string
     */
    public abstract generateDiagram(classItem: Dependency, allClasses: Dependency[]): string;
    
    /**
     * Display the generated diagram in a webview panel
     * @param context The extension context
     * @param classItem The class to show the diagram for
     * @param allClasses All classes in the project
     * @param diagramFormat The format of the diagram (e.g., 'mermaid')
     */
    public async showDiagram(
        context: vscode.ExtensionContext,
        classItem: Dependency,
        allClasses: Dependency[],
        diagramFormat: string = 'mermaid'
    ): Promise<void> {
        // Create a webview panel
        const panel = vscode.window.createWebviewPanel(
            'classDiagram',
            `Class Diagram: ${classItem.name.split('.').pop()}`,
            vscode.ViewColumn.One,
            { 
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'media'))
                ]
            }
        );
        
        // Generate the diagram
        const diagram = this.generateDiagram(classItem, allClasses);
        
        // Read HTML template
        let htmlPath = path.join(context.extensionPath, 'media', 'html', 'webview.html');
        
        // Check if the webview.html file exists
        if (!fs.existsSync(htmlPath)) {
            // Try alternate locations
            const altPath = path.join(context.extensionPath, 'resources', 'templates', 'diagram.html');
            if (fs.existsSync(altPath)) {
                htmlPath = altPath;
            }
        }
        
        // If the template exists, use it
        let htmlContent: string;
        if (fs.existsSync(htmlPath)) {
            htmlContent = fs.readFileSync(htmlPath, 'utf8');
            // Replace diagram placeholder with actual diagram
            htmlContent = htmlContent.replace('DIAGRAM_PLACEHOLDER', diagram);
        } else {
            // Create a basic HTML template if the file doesn't exist
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Class Diagram</title>
                    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.0.0/dist/mermaid.min.js"></script>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        .diagram-container {
                            overflow: auto;
                        }
                        #zoom-controls {
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background: rgba(255, 255, 255, 0.9);
                            padding: 10px;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                            z-index: 1000;
                            display: flex;
                            gap: 10px;
                        }
                        button {
                            padding: 5px 10px;
                            cursor: pointer;
                            background: #f0f0f0;
                            border: 1px solid #ccc;
                            border-radius: 3px;
                        }
                        button:hover {
                            background: #e0e0e0;
                        }
                        .zoom-level {
                            display: inline-block;
                            min-width: 60px;
                            text-align: center;
                            line-height: 28px;
                        }
                        #scroll-container {
                            width: 100%;
                            height: 100vh;
                            overflow: auto;
                            position: relative;
                        }
                        #content {
                            padding: 20px;
                            transform-origin: 0 0;
                            transition: transform 0.2s ease-out;
                            min-width: fit-content;
                        }
                    </style>
                </head>
                <body>
                    <div id="scroll-container">
                        <div id="content">
                            <pre class="mermaid">
${diagram}
                            </pre>
                        </div>
                    </div>
                    
                    <div id="zoom-controls">
                        <button onclick="zoomOut()">−</button>
                        <span class="zoom-level">100%</span>
                        <button onclick="zoomIn()">+</button>
                        <button onclick="resetZoom()">Reset</button>
                    </div>
                    
                    <script>
                        // Initialize Mermaid
                        mermaid.initialize({
                            startOnLoad: true,
                            theme: 'default',
                            securityLevel: 'loose',
                            classDiagram: {
                                useMaxWidth: false,
                                wrap: false
                            }
                        });
                        
                        // Zoom functionality
                        let zoomScale = 1;
                        const content = document.getElementById('content');
                        const zoomLevel = document.querySelector('.zoom-level');
                        const MIN_ZOOM = 0.5;
                        const MAX_ZOOM = 3;
                        const ZOOM_STEP = 0.1;
                        
                        function updateZoom() {
                            content.style.transform = \`scale(\${zoomScale})\`;
                            zoomLevel.textContent = \`\${Math.round(zoomScale * 100)}%\`;
                        }
                        
                        function zoomIn() {
                            if (zoomScale < MAX_ZOOM) {
                                zoomScale = Math.min(MAX_ZOOM, zoomScale + ZOOM_STEP);
                                updateZoom();
                            }
                        }
                        
                        function zoomOut() {
                            if (zoomScale > MIN_ZOOM) {
                                zoomScale = Math.max(MIN_ZOOM, zoomScale - ZOOM_STEP);
                                updateZoom();
                            }
                        }
                        
                        function resetZoom() {
                            zoomScale = 1;
                            updateZoom();
                        }
                        
                        // Mouse wheel zoom
                        window.addEventListener('wheel', function(event) {
                            if (event.ctrlKey || event.metaKey) {
                                event.preventDefault();
                                
                                if (event.deltaY < 0) {
                                    zoomIn();
                                } else {
                                    zoomOut();
                                }
                            }
                        }, { passive: false });
                    </script>
                </body>
                </html>
            `;
        }
        
        // Set the HTML content
        panel.webview.html = htmlContent;
    }
}