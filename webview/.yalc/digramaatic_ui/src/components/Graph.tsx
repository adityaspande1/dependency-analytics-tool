// src/components/Graph.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { GraphData, Node, Edge } from '../types/graph';

interface GraphProps {
  data: GraphData;
  width?: number;
  height?: number;
  autoLayout?: 'circular' | 'force' | 'tree';
  nodeSizeScale?: number;
  theme?: 'light' | 'dark';
}

export const Graph: React.FC<GraphProps> = ({
  data,
  width = 800,
  height = 600,
  autoLayout = 'circular',
  nodeSizeScale = 1,
  theme = 'light'
}) => {
  // Use the data directly since it's already in the GraphData format
  const processedData = React.useMemo(() => {
    if (!data || !data.nodes || !Array.isArray(data.nodes)) {
      console.error('Invalid graph data format');
      return { nodes: [], edges: [], metadata: {} } as GraphData;
    }
    return data;
  }, [data]);

  // Get container ref to calculate available space
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for node positions and selection
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<{
    nodes: Set<string>;
    edges: Set<string>;
  }>({ nodes: new Set(), edges: new Set() });
  const [isDragging, setIsDragging] = useState(false);
  const [containerSize, setContainerSize] = useState({ width, height });

  // Force directed layout simulation
  const simulation = useRef<any>(null);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: rect.width || width,
          height: rect.height || height
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);
  
  // Initialize node positions based on layout type
  useEffect(() => {
    if (!processedData.nodes || processedData.nodes.length === 0) return;
    
    const nodeCount = processedData.nodes.length;
    
    // Calculate available space
    const availableWidth = containerSize.width * 0.8;
    const availableHeight = containerSize.height * 0.8;
    const center = { 
      x: containerSize.width / 2, 
      y: containerSize.height / 2
    };
    
    if (autoLayout === 'circular') {
      // Circular layout
      const radius = Math.min(availableWidth, availableHeight) / 2;
      const angleStep = (2 * Math.PI) / nodeCount;
      
      const positions = processedData.nodes.reduce((acc, node, index) => {
        const angle = index * angleStep;
        acc[node.id] = {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
        };
        return acc;
      }, {} as Record<string, { x: number; y: number }>);
      
      setNodePositions(positions);
    } else if (autoLayout === 'tree') {
      // Simple tree layout (for hierarchical data)
      const levels: Record<number, string[]> = { 0: [] };
      const nodeLevel: Record<string, number> = {};
      const processed = new Set<string>();
      
      // Find root nodes (nodes with no incoming edges)
      const incomingEdges: Record<string, string[]> = {};
      
      processedData.edges.forEach(edge => {
        if (!incomingEdges[edge.target]) {
          incomingEdges[edge.target] = [];
        }
        incomingEdges[edge.target].push(edge.source);
      });
      
      processedData.nodes.forEach(node => {
        if (!incomingEdges[node.id] || incomingEdges[node.id].length === 0) {
          levels[0].push(node.id);
          nodeLevel[node.id] = 0;
          processed.add(node.id);
        }
      });
      
      // If no root nodes found, use first node as root
      if (levels[0].length === 0) {
        levels[0].push(processedData.nodes[0].id);
        nodeLevel[processedData.nodes[0].id] = 0;
        processed.add(processedData.nodes[0].id);
      }
      
      // BFS to assign levels
      let currentLevel = 0;
      while (processed.size < processedData.nodes.length) {
        levels[currentLevel + 1] = [];
        
        levels[currentLevel].forEach(sourceId => {
          processedData.edges.forEach(edge => {
            if (edge.source === sourceId && !processed.has(edge.target)) {
              levels[currentLevel + 1].push(edge.target);
              nodeLevel[edge.target] = currentLevel + 1;
              processed.add(edge.target);
            }
          });
        });
        
        // If no new nodes were added and we still have unprocessed nodes,
        // find an unprocessed node and make it a root for a new tree
        if (levels[currentLevel + 1].length === 0 && processed.size < processedData.nodes.length) {
          const unprocessedNode = processedData.nodes.find(node => !processed.has(node.id));
          if (unprocessedNode) {
            levels[currentLevel + 1].push(unprocessedNode.id);
            nodeLevel[unprocessedNode.id] = currentLevel + 1;
            processed.add(unprocessedNode.id);
          }
        }
        
        currentLevel++;
      }
      
      // Calculate positions
      const maxLevel = currentLevel;
      const levelHeight = availableHeight / (maxLevel + 1);
      
      const positions = {} as Record<string, { x: number; y: number }>;
      
      Object.entries(levels).forEach(([level, nodeIds]) => {
        const lvl = parseInt(level);
        const nodeWidth = availableWidth / (nodeIds.length + 1);
        
        nodeIds.forEach((nodeId, index) => {
          positions[nodeId] = {
            x: center.x - availableWidth/2 + nodeWidth * (index + 1),
            y: center.y - availableHeight/2 + levelHeight * (lvl + 0.5)
          };
        });
      });
      
      setNodePositions(positions);
    } else {
      // Default: random positions for force layout
      const positions = processedData.nodes.reduce((acc, node) => {
        acc[node.id] = {
          x: center.x + (Math.random() - 0.5) * availableWidth,
          y: center.y + (Math.random() - 0.5) * availableHeight,
        };
        return acc;
      }, {} as Record<string, { x: number; y: number }>);
      
      setNodePositions(positions);
    }
  }, [processedData.nodes, processedData.edges, containerSize, autoLayout]);

  // Function to handle node position updates
  const handleNodePositionChange = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setNodePositions((prev) => ({
      ...prev,
      [id]: newPosition,
    }));
    setIsDragging(true);
  }, []);

  // Function to find connected nodes and edges
  const findConnectedNodes = useCallback((nodeId: string) => {
    const connectedNodes = new Set<string>();
    const connectedEdges = new Set<string>();

    // Add the selected node
    connectedNodes.add(nodeId);

    // Find all edges connected to this node
    processedData.edges.forEach((edge) => {
      if (edge.source === nodeId || edge.target === nodeId) {
        connectedEdges.add(`${edge.source}-${edge.target}`);
        connectedNodes.add(edge.source);
        connectedNodes.add(edge.target);
      }
    });

    return { nodes: connectedNodes, edges: connectedEdges };
  }, [processedData.edges]);

  // Handle node click
  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node);
    const { nodes, edges } = findConnectedNodes(node.id);
    setHighlightedPath({ nodes, edges });
  }, [findConnectedNodes]);

  // Handle showing direct dependencies (incoming edges)
  const handleShowDependencies = useCallback((node: Node) => {
    const dependencies = new Set<string>();
    const dependencyEdges = new Set<string>();

    // Find all nodes that this node depends on
    processedData.edges.forEach((edge) => {
      if (edge.target === node.id) {
        dependencies.add(edge.source);
        dependencyEdges.add(`${edge.source}-${edge.target}`);
      }
    });

    setHighlightedPath({
      nodes: new Set([node.id, ...dependencies]),
      edges: dependencyEdges,
    });
  }, [processedData.edges]);

  // Handle showing dependents (outgoing edges)
  const handleShowDependents = useCallback((node: Node) => {
    const dependents = new Set<string>();
    const dependentEdges = new Set<string>();

    // Find all nodes that depend on this node
    processedData.edges.forEach((edge) => {
      if (edge.source === node.id) {
        dependents.add(edge.target);
        dependentEdges.add(`${edge.source}-${edge.target}`);
      }
    });

    setHighlightedPath({
      nodes: new Set([node.id, ...dependents]),
      edges: dependentEdges,
    });
  }, [processedData.edges]);

  // Handle edge click
  const handleEdgeClick = useCallback((edge: Edge) => {
    setHighlightedPath({
      nodes: new Set([edge.source, edge.target]),
      edges: new Set([`${edge.source}-${edge.target}`]),
    });
  }, []);

  // Handle background click to clear selection
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    // Only clear if it's a direct background click, not a propagated event
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
      setHighlightedPath({ nodes: new Set(), edges: new Set() });
    }
  }, []);

  // Handle dragging end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Get node name for display, handling different data formats
  const getNodeDisplayName = useCallback((node: Node) => {
    return node.name || node.title || `Node ${node.id}`;
  }, []);

  // Get node type for display
  const getNodeDisplayType = useCallback((node: Node) => {
    return node.type || 'unknown';
  }, []);

  // Get node file path or location
  const getNodeDisplayPath = useCallback((node: Node) => {
    return node.filepath || node.metadata?.filePath || node.metadata?.path || '';
  }, []);

  // Get node description
  const getNodeDescription = useCallback((node: Node) => {
    if (node.metadata?.description) return node.metadata.description;
    
    const typeName = getNodeDisplayType(node);
    const path = getNodeDisplayPath(node);
    
    return path ? `${typeName} at ${path}` : typeName;
  }, [getNodeDisplayType, getNodeDisplayPath]);

  // Calculate edge path statistics
  const edgeStats = React.useMemo(() => {
    const types = new Map<string, number>();
    
    processedData.edges.forEach(edge => {
      const type = edge.type || 'unknown';
      types.set(type, (types.get(type) || 0) + 1);
    });
    
    return {
      total: processedData.edges.length,
      types: Object.fromEntries(types.entries())
    };
  }, [processedData.edges]);

  // Calculate node type statistics
  const nodeStats = React.useMemo(() => {
    const types = new Map<string, number>();
    
    processedData.nodes.forEach(node => {
      const type = getNodeDisplayType(node);
      types.set(type, (types.get(type) || 0) + 1);
    });
    
    return {
      total: processedData.nodes.length,
      types: Object.fromEntries(types.entries())
    };
  }, [processedData.nodes, getNodeDisplayType]);
  
  // Get color scheme based on theme
  const colors = theme === 'dark' 
    ? {
        background: 'bg-gray-900',
        backgroundPattern: 'radial-gradient(circle, #333 1px, transparent 1px)',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        panel: 'bg-gray-800/90 border-gray-700',
      }
    : {
        background: 'bg-white',
        backgroundPattern: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        text: 'text-gray-900',
        textSecondary: 'text-gray-600',
        panel: 'bg-white/90 border-gray-100',
      };

  return (
    <div 
      ref={containerRef}
      className={`${colors.background} relative overflow-hidden w-full h-full rounded-lg`}
      style={{ minHeight: `${height}px` }}
      onClick={handleBackgroundClick}
      onMouseUp={handleDragEnd}
    >
      {/* Dotted background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: colors.backgroundPattern,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      />

      {/* Render edges */}
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <marker
            id="arrowhead-default"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className={`${theme === 'dark' ? 'fill-gray-400' : 'fill-gray-400'}`}
            />
          </marker>
          <marker
            id="arrowhead-highlighted"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-blue-500"
            />
          </marker>
          <marker
            id="arrowhead-path"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-green-500"
            />
          </marker>
        </defs>
        
        {/* Render all edges */}
        {processedData.edges.map((edge) => {
          const sourcePos = nodePositions[edge.source] || { x: 0, y: 0 };
          const targetPos = nodePositions[edge.target] || { x: 0, y: 0 };
          
          // Skip edges where either node position is not yet calculated
          if (sourcePos.x === 0 && sourcePos.y === 0) return null;
          if (targetPos.x === 0 && targetPos.y === 0) return null;
          
          const isHighlighted = selectedNode && 
            (selectedNode.id === edge.source || selectedNode.id === edge.target);
          const isPathHighlighted = highlightedPath.edges.has(`${edge.source}-${edge.target}`);
          
          // Calculate the angle for arrow placement
          const angle = Math.atan2(targetPos.y - sourcePos.y, targetPos.x - sourcePos.x);
          
          // Adjust start and end points to account for node radius
          const nodeRadius = 45 * nodeSizeScale; // Half of typical node width
          const startX = sourcePos.x + Math.cos(angle) * nodeRadius;
          const startY = sourcePos.y + Math.sin(angle) * nodeRadius;
          const endX = targetPos.x - Math.cos(angle) * nodeRadius;
          const endY = targetPos.y - Math.sin(angle) * nodeRadius;
          
          // Get marker and style based on highlight state
          let markerEnd = "url(#arrowhead-default)";
          let strokeClass = theme === 'dark' ? 'stroke-gray-600' : 'stroke-gray-300';
          let strokeWidth = 1.5;
          
          if (isPathHighlighted) {
            markerEnd = "url(#arrowhead-path)";
            strokeClass = 'stroke-green-500';
            strokeWidth = 2.5;
          } else if (isHighlighted) {
            markerEnd = "url(#arrowhead-highlighted)";
            strokeClass = 'stroke-blue-500';
            strokeWidth = 2;
          }
          
          return (
            <g key={`edge-${edge.source}-${edge.target}`} 
               onClick={(e) => {
                 e.stopPropagation();
                 handleEdgeClick(edge);
               }}>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className={`${strokeClass} cursor-pointer transition-all duration-200`}
                strokeWidth={strokeWidth}
                markerEnd={markerEnd}
              />
              
              {/* Edge label */}
              {(isHighlighted || isPathHighlighted) && edge.type && (
                <text
                  x={(startX + endX) / 2}
                  y={(startY + endY) / 2}
                  dy="-5"
                  textAnchor="middle"
                  className={`text-xs select-none pointer-events-none
                    ${isPathHighlighted ? 'fill-green-500' : 'fill-blue-500'}`}
                >
                  {edge.type}
                </text>
              )}
              
              {/* Invisible wider line for better hover target */}
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                strokeWidth="10"
                className="stroke-transparent cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* Render nodes */}
      {processedData.nodes.map((node) => {
        const position = nodePositions[node.id] || { x: 0, y: 0 };
        
        // Skip nodes without position (should not happen after layout)
        if (position.x === 0 && position.y === 0) return null;
        
        const isHighlighted = selectedNode?.id === node.id;
        const isPathHighlighted = highlightedPath.nodes.has(node.id);
        
        // Get node data for display
        const displayName = getNodeDisplayName(node);
        const displayType = getNodeDisplayType(node);
        const displayPath = getNodeDisplayPath(node);
        
        return (
          <GraphNode
            key={`node-${node.id}`}
            node={{
              ...node,
              name: displayName,
              type: displayType,
              filepath: displayPath
            }}
            position={position}
            onPositionChange={handleNodePositionChange}
            isHighlighted={isHighlighted}
            isPathHighlighted={isPathHighlighted}
            onNodeClick={handleNodeClick}
            onShowDependencies={handleShowDependencies}
            onShowDependents={handleShowDependents}
            sizeScale={nodeSizeScale}
            theme={theme}
            totalNodesInView={processedData.nodes.length}
          />
        );
      })}

      {/* Stats panel */}
      <div className={`fixed bottom-4 right-4 ${colors.panel} backdrop-blur-sm rounded-lg shadow-sm border p-2 text-xs ${colors.text}`}>
        <div className="flex gap-3 items-center flex-wrap">
          {Object.entries(nodeStats.types).map(([type, count], index) => (
            <div key={`stat-${type}`} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" 
                  style={{ 
                    backgroundColor: type === 'component' ? '#3b82f6' : 
                                    type === 'hook' ? '#8b5cf6' : 
                                    type === 'context' ? '#eab308' :
                                    type === 'class' ? '#22c55e' :
                                    type === 'file' ? '#f97316' :
                                    '#6b7280'
                  }} />
              <span className={colors.textSecondary}>{type}s: {count}</span>
            </div>
          ))}
          {nodeStats.types && Object.keys(nodeStats.types).length > 0 && (
            <div className="h-4 w-px bg-gray-200 mx-1" />
          )}
          <div className={colors.textSecondary}>
            Total: {nodeStats.total}
          </div>
        </div>
        <div className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Project: {processedData.projectName || 'Unknown'} | 
          Language: {processedData.language || 'Unknown'} |
          {processedData.metadata?.generatedBy ? ` Generated by ${processedData.metadata.generatedBy}` : ''}
        </div>
      </div>

      {/* Selected node details panel */}
      {selectedNode && (
        <div 
          className={`fixed top-4 left-4 ${colors.panel} backdrop-blur-sm rounded-lg p-3 text-sm max-w-xs shadow-lg border ${colors.text}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-medium mb-2">{getNodeDisplayName(selectedNode)}</div>
          <div className={`text-xs ${colors.textSecondary}`}>{getNodeDisplayPath(selectedNode)}</div>
          <div className={`text-xs ${colors.textSecondary} mt-1`}>Type: {getNodeDisplayType(selectedNode)}</div>
          
          {selectedNode.sections && selectedNode.sections.length > 0 && (
            <div className="mt-2">
              {selectedNode.sections.map(section => (
                <div key={section.id} className="mt-1">
                  <div className="text-xs font-medium">{section.name}</div>
                  {section.items.slice(0, 3).map(item => (
                    <div key={item.id} className={`text-xs ${colors.textSecondary} truncate`}>
                      • {item.value}
                    </div>
                  ))}
                  {section.items.length > 3 && (
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      + {section.items.length - 3} more...
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {selectedNode.metadata?.description && (
            <div className={`text-xs ${colors.textSecondary} mt-1`}>{selectedNode.metadata.description}</div>
          )}
          
          {/* Show dependency info */}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex gap-2">
              <button 
                onClick={() => handleShowDependencies(selectedNode)}
                className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Show Dependencies
              </button>
              <button 
                onClick={() => handleShowDependents(selectedNode)}
                className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Show Dependents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Graph;