// src/components/Graph.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
// Import our Node type, with explicit renaming to avoid collision with DOM Node type
import { GraphData, Node as GraphNode, Edge } from '../types/graph';

// Import extracted components
import { GraphNode as GraphNodeComponent } from './graph-node/GraphNode';
import { GraphControls } from './graph/GraphControls';
import { GraphStats } from './graph/GraphStats';
import { NodeDetailsPanel } from './graph/NodeDetailsPanel';
import { GraphEdges } from './graph/GraphEdges';
import { GraphDefs } from './graph/GraphDefs';

// Import layout utilities
import {
  createSpiralLayout,
  createDonutLayout,
  createCircularLayout,
  createForceLayout,
  getInitialZoomScale
} from '../utils/graphLayout';

interface GraphProps {
  data: GraphData;
  width?: number;
  height?: number;
  autoLayout?: 'circular' | 'force' | 'tree' | 'spiral' | 'donut';
  nodeSizeScale?: number;
  theme?: 'light' | 'dark';
}

/**
 * Main Graph component for visualizing nodes and their relationships
 */
export const Graph: React.FC<GraphProps> = ({
  data,
  width = 800,
  height = 600,
  autoLayout = 'circular',
  nodeSizeScale = 1,
  theme = 'light'
}) => {
  // Process incoming data
  const processedData = React.useMemo(() => {
    if (!data || !data.nodes || !Array.isArray(data.nodes)) {
      console.error('Invalid graph data format');
      return { nodes: [], edges: [], metadata: {} } as GraphData;
    }
    return data;
  }, [data]);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<SVGSVGElement>(null);
  const transformGroupRef = useRef<SVGGElement>(null);

  // State
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<{
    nodes: Set<string>;
    edges: Set<string>;
  }>({ nodes: new Set(), edges: new Set() });
  const [containerSize, setContainerSize] = useState({ width, height });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 5000, height: 5000 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = rect.width || width;
        const newHeight = rect.height || height;

        setContainerSize({
          width: newWidth,
          height: newHeight
        });

        // Significantly increase the viewport size to allow for nodes dragged far away
        setViewportSize({
          width: Math.max(newWidth * 5, 5000),
          height: Math.max(newHeight * 5, 5000)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  // Handle node position changes
  const handleNodePositionChange = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setNodePositions(prev => ({
      ...prev,
      [id]: newPosition
    }));
  }, []);

  // Find connected nodes
  const findConnectedNodes = useCallback((nodeId: string) => {
    const connectedNodes = new Set<string>();
    const connectedEdges = new Set<string>();

    connectedNodes.add(nodeId);

    processedData.edges.forEach((edge) => {
      if (edge.source === nodeId || edge.target === nodeId) {
        connectedEdges.add(`${edge.source}-${edge.target}`);
        connectedNodes.add(edge.source);
        connectedNodes.add(edge.target);
      }
    });

    return { nodes: connectedNodes, edges: connectedEdges };
  }, [processedData.edges]);

  // Node click handler
  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
    const { nodes, edges } = findConnectedNodes(node.id);
    setHighlightedPath({ nodes, edges });
  }, [findConnectedNodes]);

  // Show node dependencies
  const handleShowDependencies = useCallback((node: GraphNode) => {
    const dependencies = new Set<string>();
    const dependencyEdges = new Set<string>();

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

  // Show node dependents
  const handleShowDependents = useCallback((node: GraphNode) => {
    const dependents = new Set<string>();
    const dependentEdges = new Set<string>();

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

  // Edge click handler
  const handleEdgeClick = useCallback((edge: Edge) => {
    setHighlightedPath({
      nodes: new Set([edge.source, edge.target]),
      edges: new Set([`${edge.source}-${edge.target}`]),
    });
  }, []);

  // Background click handler
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
      setHighlightedPath({ nodes: new Set(), edges: new Set() });
    }
  }, []);

  // Node display utilities
  const getNodeDisplayName = useCallback((node: GraphNode) => {
    return node.name || node.title || `Node ${node.id}`;
  }, []);

  const getNodeDisplayType = useCallback((node: GraphNode) => {
    return node.type || 'unknown';
  }, []);

  const getNodeDisplayPath = useCallback((node: GraphNode) => {
    return node.filepath || node.metadata?.filePath || node.metadata?.path || '';
  }, []);

  // Calculate node statistics
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

  // Handle section toggle in node details panel
  const toggleSection = useCallback((sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  // Zoom and pan handlers
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();

    const svgRect = graphRef.current?.getBoundingClientRect();
    if (!svgRect) return;

    const pointerX = e.clientX - svgRect.left;
    const pointerY = e.clientY - svgRect.top;

    // Make zooming more gradual
    const delta = e.deltaY * -0.005;
    const newScale = Math.min(Math.max(transform.scale + delta, 0.1), 5);
    const scaleFactor = newScale / transform.scale;

    const tx = pointerX - (pointerX - transform.x) * scaleFactor;
    const ty = pointerY - (pointerY - transform.y) * scaleFactor;

    setTransform({
      x: tx,
      y: ty,
      scale: newScale
    });
  }, [transform]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg' || 
        (e.target as HTMLElement).classList.contains('graph-background')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  }, [transform]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      }));
    }
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleResetView = useCallback(() => {
    const resetScale = getInitialZoomScale(processedData.nodes.length);
    const translateX = (containerSize.width / 2) - ((viewportSize.width / 2) * resetScale);
    const translateY = (containerSize.height / 2) - ((viewportSize.height / 2) * resetScale);
    
    setTransform({
      x: translateX,
      y: translateY,
      scale: resetScale
    });
  }, [containerSize, viewportSize, processedData.nodes.length]);

  const handleZoomIn = useCallback(() => {
    setTransform(prev => {
      const newScale = Math.min(prev.scale + 0.2, 5);
      return {
        ...prev,
        scale: newScale
      };
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setTransform(prev => {
      const newScale = Math.max(prev.scale - 0.2, 0.1);
      return {
        ...prev,
        scale: newScale
      };
    });
  }, []);

  // Layout calculation for nodes
  useEffect(() => {
    if (!processedData.nodes || processedData.nodes.length === 0) return;
  
    const nodeCount = processedData.nodes.length;
  
    // Calculate available space and center
    const availableWidth = viewportSize.width * 0.6;
    const availableHeight = viewportSize.height * 0.6;
    const center = { 
      x: viewportSize.width / 2, 
      y: viewportSize.height / 2
    };
  
    let positions: Record<string, { x: number; y: number }> = {};
    const actualLayout = nodeCount > 50 && autoLayout === 'circular' ? 'donut' : autoLayout;
  
    // Choose layout algorithm based on configuration
    if (actualLayout === 'circular') {
      positions = createCircularLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );
    } else if (actualLayout === 'tree') {
      // Fall back to circular layout
      positions = createCircularLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );
    } else if (actualLayout === 'spiral') {
      positions = createSpiralLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );
    } else if (actualLayout === 'donut') {
      positions = createDonutLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );
    } else {
      positions = createForceLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );
    }
  
    setNodePositions(positions);
  
    // Set initial transform to show all nodes at once
    if (transformGroupRef.current) {
      const initialScale = getInitialZoomScale(nodeCount);
      
      // FIXED TRANSFORM CALCULATION:
      // We need to calculate how much to translate the viewport so that the center
      // of the graph (viewportSize/2) is positioned at the center of the container
      const translateX = (containerSize.width / 2) - ((viewportSize.width / 2) * initialScale);
      const translateY = (containerSize.height / 2) - ((viewportSize.height / 2) * initialScale);
                      
      setTransform({
        x: translateX,
        y: translateY,
        scale: initialScale
      });
    }
  }, [processedData.nodes, processedData.edges, viewportSize, autoLayout, containerSize]);
  
  // Also fix the handleResetView function to use the same calculation
  

  // Background styles
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg 
        ref={graphRef}
        className="absolute top-0 left-0 w-full h-full cursor-grab"
        style={{ 
          cursor: isPanning ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
        onWheel={handleWheel}
        onClick={handleBackgroundClick}
      >
        <GraphDefs theme={theme} />
        
        <rect 
          className="graph-background"
          x="0" 
          y="0" 
          width={viewportSize.width} 
          height={viewportSize.height} 
          fill="url(#grid-pattern)" 
          transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}
        />
        
        <g 
          ref={transformGroupRef}
          transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}
        >
          {/* Render graph edges */}
          <GraphEdges 
            edges={processedData.edges}
            nodePositions={nodePositions}
            nodeSizeScale={nodeSizeScale}
            selectedNode={selectedNode}
            highlightedPath={highlightedPath}
            theme={theme}
            transform={transform}
            onEdgeClick={handleEdgeClick}
          />

          {/* Render graph nodes */}
          {processedData.nodes.map((node) => {
            const position = nodePositions[node.id] || { x: 0, y: 0 };

            if (position.x === 0 && position.y === 0) return null;

            // Remove position culling to allow nodes to be visible even when outside the viewport
            // When scrolling back to these areas, nodes will be visible again

            const isHighlighted = selectedNode?.id === node.id;
            const isPathHighlighted = highlightedPath.nodes.has(node.id);

            const displayName = getNodeDisplayName(node);
            const displayType = getNodeDisplayType(node);
            const displayPath = getNodeDisplayPath(node);

            return (
              <foreignObject
                key={`node-${node.id}`}
                x={position.x - (180 * nodeSizeScale / 2)}
                y={position.y - (180 * nodeSizeScale / 2)}
                width={180 * nodeSizeScale}
                height={180 * nodeSizeScale}
                className="overflow-visible"
              >
                <GraphNodeComponent
                  node={{
                    ...node,
                    name: displayName,
                    type: displayType,
                    filepath: displayPath
                  }}
                  position={{ x: 180 * nodeSizeScale / 2, y: 180 * nodeSizeScale / 2 }}
                  onPositionChange={(id, newPos) => {
                    const graphPos = {
                      x: position.x + (newPos.x - (180 * nodeSizeScale / 2)),
                      y: position.y + (newPos.y - (180 * nodeSizeScale / 2))
                    };
                    handleNodePositionChange(id, graphPos);
                  }}
                  isHighlighted={isHighlighted}
                  isPathHighlighted={isPathHighlighted}
                  onNodeClick={handleNodeClick}
                  onShowDependencies={handleShowDependencies}
                  onShowDependents={handleShowDependents}
                  sizeScale={nodeSizeScale}
                  theme={theme}
                  totalNodesInView={processedData.nodes.length}
                  isInteractive={true}
                  zoomScale={transform.scale}
                />
              </foreignObject>
            );
          })}
        </g>
      </svg>

      {/* Control panel */}
      <GraphControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        theme={theme}
      />

      {/* Stats panel */}
      <GraphStats
        nodeStats={nodeStats}
        data={processedData}
        transform={transform}
        theme={theme}
      />

      {/* Node details panel */}
      <NodeDetailsPanel
        node={selectedNode}
        position={selectedNode && nodePositions[selectedNode.id] 
          ? nodePositions[selectedNode.id] 
          : null}
        containerSize={containerSize}
        theme={theme}
        expandedSections={expandedSections}
        onToggleSection={toggleSection}
        onShowDependencies={handleShowDependencies}
        onShowDependents={handleShowDependents}
        onClose={() => setSelectedNode(null)}
        getNodeDisplayName={getNodeDisplayName}
        getNodeDisplayType={getNodeDisplayType}
        getNodeDisplayPath={getNodeDisplayPath}
      />
    </div>
  );
};

export default Graph;