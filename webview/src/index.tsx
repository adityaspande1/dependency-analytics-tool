/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// webview/src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Graph, GraphData } from 'digramaatic_ui';
import './index.css';

// Get data provided by the extension
// The Window interface is now declared in global.d.ts

const Webview: React.FC = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
    const [graphData, setGraphData] = React.useState<GraphData>(window.diagramData);
    const [isFullGraph, setIsFullGraph] = React.useState<boolean>(false);
    const [zoom, setZoom] = React.useState<number>(1);
    const fullGraphAvailable = window.viewParams?.fullGraphAvailable || false;
    
    // Handle node selection
    const handleNodeClick = (nodeId: string) => {
        window.vscode.postMessage({
            command: 'selectNode',
            nodeId
        });
    };
    
    // Handle navigation to source
    const handleNavigateToSource = (filePath: string) => {
        window.vscode.postMessage({
            command: 'navigateToSource',
            filePath
        });
    };
    
    // Handle toggling between focused and full graph views
    const handleToggleFullGraph = () => {
        const newValue = !isFullGraph;
        setIsFullGraph(newValue);
        window.vscode.postMessage({
            command: 'toggleFullGraph',
            showFullGraph: newValue
        });
    };
    
    // Handle zoom change
    const handleZoomChange = (newZoom: number) => {
        setZoom(newZoom);
    };
    
    // Reset view to center the graph
    const handleResetView = () => {
        const graphContainer = document.querySelector('.graph-container');
        if (graphContainer) {
            // Trigger a resize event to recenter the graph
            window.dispatchEvent(new Event('resize'));
            setZoom(1);
        }
    };
    
    // Listen for messages from the extension
    React.useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            const message = event.data;
            switch (message.command) {
                case 'updateGraphData':
                    setGraphData(message.data);
                    setIsFullGraph(message.showFullGraph);
                    setZoom(1); // Reset zoom when switching views
                    break;
            }
        };
        
        window.addEventListener('message', messageHandler);
        
        return () => {
            window.removeEventListener('message', messageHandler);
        };
    }, []);
    
    // Detect VS Code theme
    React.useEffect(() => {
        // Check if body has a dark class 
        const isDark = document.body.classList.contains('vscode-dark');
        setTheme(isDark ? 'dark' : 'light');
        
        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const isDarkNow = document.body.classList.contains('vscode-dark');
            setTheme(isDarkNow ? 'dark' : 'light');
        });
        
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <div className="graph-container">
            {fullGraphAvailable && (
                <div className="graph-controls">
                    <button 
                        className="graph-control-button"
                        onClick={handleToggleFullGraph}
                    >
                        {isFullGraph ? 'Show Focused View' : 'Show Complete Graph'}
                    </button>
                    
                    {isFullGraph && (
                        <>
                            <button 
                                className="graph-control-button"
                                onClick={handleResetView}
                                title="Reset View"
                            >
                                Reset View
                            </button>
                            <div className="zoom-controls">
                                <button 
                                    className="graph-control-button zoom-button"
                                    onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                                    title="Zoom Out"
                                >
                                    −
                                </button>
                                <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                                <button 
                                    className="graph-control-button zoom-button"
                                    onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                                    title="Zoom In"
                                >
                                    +
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
            <Graph
                data={graphData}
                width={window.innerWidth}
                height={window.innerHeight}
                autoLayout={(window as any).viewParams?.autoLayout || "circular"}
                nodeSizeScale={(window as any).viewParams?.singleNodeMode ? 1.5 : 1}
                theme={theme}
                onNodeSelect={handleNodeClick}
                onSourceNavigate={handleNavigateToSource}
                showDetailedNode={(window as any).viewParams?.singleNodeMode}
                highlightNodeId={!isFullGraph ? undefined : window.viewParams?.focusedNodeId}
                zoomable={isFullGraph}
                pannable={isFullGraph}
                initialZoom={zoom}
                onZoomChange={handleZoomChange}
                infiniteCanvas={isFullGraph}
                nodeSpacing={isFullGraph ? 120 : 60}
            />
        </div>
    );
};

// Render the application
const root = createRoot(document.getElementById('root')!);
root.render(<Webview />);