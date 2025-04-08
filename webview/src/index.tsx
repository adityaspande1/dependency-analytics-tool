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
    const graphData = window.diagramData;
    
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
            <Graph
                data={graphData}
                width={window.innerWidth}
                height={window.innerHeight}
                autoLayout="circular"
                nodeSizeScale={1}
                theme={theme}
                onNodeSelect={handleNodeClick}
                onSourceNavigate={handleNavigateToSource}
            />
        </div>
    );
};

// Render the application
const root = createRoot(document.getElementById('root')!);
root.render(<Webview />);