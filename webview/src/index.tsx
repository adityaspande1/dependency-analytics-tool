/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// webview/src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Graph, GraphData } from 'digramaatic_ui';
import './index.css';

// Component for displaying detailed node information in a card format
const NodeDetailCard: React.FC<{ node: any, onClose: () => void }> = ({ node, onClose }) => {
    const [sections, setSections] = React.useState<Record<string, boolean>>({});
    
    // Initialize all sections as expanded
    React.useEffect(() => {
        if (node && node.sections) {
            const initialSections: Record<string, boolean> = {};
            node.sections.forEach((section: any) => {
                initialSections[section.name] = true; // true means expanded
            });
            setSections(initialSections);
        }
    }, [node]);
    
    const toggleSection = (sectionName: string) => {
        setSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName]
        }));
    };
    
    const handleCloseCard = () => {
        const detailElement = document.querySelector('.component-detail');
        if (detailElement) {
            detailElement.classList.add('closing');
            setTimeout(() => {
                detailElement.remove();
            }, 300);
        }
        onClose();
    };
    
    const navigateToSource = (filePath: string) => {
        if (window.vscode) {
            window.vscode.postMessage({
                command: 'navigateToSource',
                filePath
            });
        }
    };
    
    // Custom card styling with inline styles
    const cardStyle: React.CSSProperties = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        maxWidth: '360px',
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '12px',
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000,
        padding: '1.5rem',
        animation: 'slideIn 0.3s ease-out',
        transition: 'all 0.3s ease',
        color: '#e0e0e0'
    };
    
    const headingStyle: React.CSSProperties = {
        marginBottom: '1.5rem',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };
    
    const filePathStyle: React.CSSProperties = {
        fontSize: '0.7rem',
        opacity: 0.6,
        marginTop: '0.25rem',
        fontWeight: 'normal'
    };
    
    const closeButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        color: 'rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: 0,
        lineHeight: 1
    };
    
    const sectionStyle = (isCollapsed: boolean): React.CSSProperties => ({
        marginBottom: '1rem',
        borderRadius: '8px',
        backgroundColor: 'rgba(45, 45, 45, 0.5)',
        transition: 'all 0.2s ease',
        overflow: 'hidden'
    });
    
    const sectionHeadingStyle: React.CSSProperties = {
        fontWeight: 'bold',
        padding: '0.75rem 1rem',
        color: '#64D2FF',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(35, 35, 35, 0.7)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    };
    
    const countStyle: React.CSSProperties = {
        backgroundColor: 'rgba(100, 210, 255, 0.15)',
        padding: '0.15rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        color: '#64D2FF'
    };
    
    const sectionItemsStyle: React.CSSProperties = {
        padding: '0.5rem 1rem'
    };
    
    const sectionItemStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'baseline',
        padding: '0.4rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    };
    
    const itemNameStyle = (itemType: string): React.CSSProperties => {
        const colorMap: Record<string, string> = {
            prop: '#F8C555',
            state: '#FC9AD9',
            hook: '#56D364',
            method: '#71B7FF',
            default: '#e0e0e0'
        };
        
        return {
            fontWeight: 'bold',
            marginRight: '0.5rem',
            minWidth: '40%',
            color: colorMap[itemType] || colorMap.default
        };
    };
    
    const itemValueStyle: React.CSSProperties = {
        opacity: 0.85,
        wordBreak: 'break-word'
    };
    
    const buttonStyle: React.CSSProperties = {
        backgroundColor: 'rgba(100, 210, 255, 0.15)',
        border: 'none',
        color: '#64D2FF',
        borderRadius: '4px',
        padding: '0.3rem 0.6rem',
        fontSize: '0.8rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: '0.5rem'
    };
    
    const getArrowStyle = (isExpanded: boolean): React.CSSProperties => ({
        fontSize: '0.8rem',
        transition: 'transform 0.2s ease',
        transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
        display: 'inline-block',
        marginLeft: '5px'
    });
    
    if (!node) return null;
    
    return (
        <div style={cardStyle}>
            <div style={headingStyle}>
                <div>
                    {node.title}
                    {node.metadata?.filePath && (
                        <div style={filePathStyle}>{node.metadata.filePath}</div>
                    )}
                </div>
                <button style={closeButtonStyle} onClick={handleCloseCard}>×</button>
            </div>
            
            {node.sections?.map((section: any) => (
                <div 
                    key={section.name} 
                    style={sectionStyle(!sections[section.name])}
                >
                    <div 
                        style={sectionHeadingStyle}
                        onClick={() => toggleSection(section.name)}
                    >
                        {section.name}
                        <span style={countStyle}>
                            {section.items?.length || 0}
                            <span style={getArrowStyle(sections[section.name])}> ▼</span>
                        </span>
                    </div>
                    
                    {sections[section.name] && (
                        <div style={sectionItemsStyle}>
                            {section.items?.map((item: any) => (
                                <div 
                                    key={item.id} 
                                    style={sectionItemStyle}
                                >
                                    <div style={itemNameStyle(item.icon || 'default')}>{item.id}</div>
                                    <div style={itemValueStyle}>{item.value}</div>
                                </div>
                            ))}
                            
                            {section.name.toLowerCase() === 'actions' && node.metadata?.filePath && (
                                <button 
                                    style={buttonStyle}
                                    onClick={() => navigateToSource(node.metadata.filePath)}
                                >
                                    Open in Editor
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Main Webview component
const Webview: React.FC = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
    const [selectedNode, setSelectedNode] = React.useState<any>(null);
    const graphData = window.diagramData;
    
    // Handle node selection
    const handleNodeClick = (nodeId: string) => {
        // Find the node in the graph data
        const node = graphData.nodes.find((n: any) => n.id === nodeId);
        setSelectedNode(node);
        
        // Also notify VSCode
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
                autoLayout={(window as any).viewParams?.autoLayout || "circular"}
                nodeSizeScale={(window as any).viewParams?.singleNodeMode ? 1.5 : 1}
                theme={theme}
                onNodeSelect={handleNodeClick}
                onSourceNavigate={handleNavigateToSource}
                showDetailedNode={(window as any).viewParams?.singleNodeMode}
            />
            {selectedNode && <NodeDetailCard node={selectedNode} onClose={() => setSelectedNode(null)} />}
        </div>
    );
};

// Render the application
const root = createRoot(document.getElementById('root')!);
root.render(<Webview />);