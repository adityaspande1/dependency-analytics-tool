// src/components/Graph.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GraphNode } from './GraphNode';
import { GraphData, Node, Edge } from '../types/graph';
import { ChevronDown, ChevronRight, X, ArrowDownRight, ArrowUpRight, ZoomIn, ZoomOut, Minimize } from 'lucide-react';

interface GraphProps {
  data: GraphData;
  width?: number;
  height?: number;
  autoLayout?: 'circular' | 'force' | 'tree' | 'spiral' | 'donut';
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
  const processedData = React.useMemo(() => {
    if (!data || !data.nodes || !Array.isArray(data.nodes)) {
      console.error('Invalid graph data format');
      return { nodes: [], edges: [], metadata: {} } as GraphData;
    }
    return data;
  }, [data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<SVGSVGElement>(null);
  const transformGroupRef = useRef<SVGGElement>(null);

  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<{
    nodes: Set<string>;
    edges: Set<string>;
  }>({ nodes: new Set(), edges: new Set() });
  const [containerSize, setContainerSize] = useState({ width, height });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 2000, height: 2000 });

  const detailsPanelRef = useRef<HTMLDivElement>(null);

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

        setViewportSize({
          width: Math.max(newWidth * 3, 2000),
          height: Math.max(newHeight * 3, 2000)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  const getLayoutScalingFactor = useCallback((nodeCount: number) => {
    // Reduce scaling factors to keep nodes closer together
    if (nodeCount <= 5) return 0.4;
    if (nodeCount <= 10) return 0.6;
    if (nodeCount <= 20) return 0.8;
    if (nodeCount <= 50) return 1.2;
    if (nodeCount <= 100) return 1.5;
    return 2;
  }, []);

  const createSpiralLayout = useCallback((nodes: Node[], center: { x: number, y: number }, availableSpace: { width: number, height: number }) => {
    const nodeCount = nodes.length;
    const minDimension = Math.min(availableSpace.width, availableSpace.height);
    const scaleFactor = getLayoutScalingFactor(nodeCount);

    // Smaller values create tighter spirals
    const a = minDimension / 40 * scaleFactor;
    const b = minDimension / 40 * scaleFactor;

    return nodes.reduce((acc, node, index) => {
      const theta = index * 0.5;
      const r = a + b * theta;
      acc[node.id] = {
        x: center.x + r * Math.cos(theta),
        y: center.y + r * Math.sin(theta)
      };
      return acc;
    }, {} as Record<string, { x: number; y: number }>);
  }, [getLayoutScalingFactor]);

  const createDonutLayout = useCallback((nodes: Node[], center: { x: number, y: number }, availableSpace: { width: number, height: number }) => {
    const nodeCount = nodes.length;
    const minDimension = Math.min(availableSpace.width, availableSpace.height);
    
    // Significantly reduce the spacing for smaller graphs
    let scaleFactor = getLayoutScalingFactor(nodeCount);
    if (nodeCount <= 5) {
      scaleFactor = 0.3;  // Very tight grouping for very small graphs
    } else if (nodeCount < 10) {
      scaleFactor = 0.4;  // Tighter grouping for small graphs
    } else if (nodeCount < 20) {
      scaleFactor = 0.55;
    }

    const innerRadius = minDimension / 10 * scaleFactor;
    const outerRadius = minDimension / 4 * scaleFactor;

    const nodesByType: Record<string, Node[]> = {};
    nodes.forEach(node => {
      const type = node.type || 'unknown';
      if (!nodesByType[type]) {
        nodesByType[type] = [];
      }
      nodesByType[type].push(node);
    });

    const positions = {} as Record<string, { x: number; y: number }>;
    let ringIndex = 0;

    Object.entries(nodesByType).forEach(([, typeNodes]) => {
      // For single-type graphs with few nodes, place them in a circle
      const ringRadius = innerRadius + (outerRadius - innerRadius) * (ringIndex / Math.max(Object.keys(nodesByType).length - 1, 1));

      typeNodes.forEach((node, i) => {
        const angle = (i / typeNodes.length) * 2 * Math.PI;
        positions[node.id] = {
          x: center.x + ringRadius * Math.cos(angle),
          y: center.y + ringRadius * Math.sin(angle)
        };
      });

      ringIndex++;
    });

    return positions;
  }, [getLayoutScalingFactor]);

  useEffect(() => {
    if (!processedData.nodes || processedData.nodes.length === 0) return;

    const nodeCount = processedData.nodes.length;

    const availableWidth = viewportSize.width * 0.8;
    const availableHeight = viewportSize.height * 0.8;
    const center = { 
      x: viewportSize.width / 2, 
      y: viewportSize.height / 2
    };

    const actualLayout = nodeCount > 50 && autoLayout === 'circular' ? 'donut' : autoLayout;

    if (actualLayout === 'circular') {
      const radius = Math.min(availableWidth, availableHeight) / 2;
      const scaleFactor = getLayoutScalingFactor(nodeCount);
      const angleStep = (2 * Math.PI) / nodeCount;

      const positions = processedData.nodes.reduce((acc, node, index) => {
        const angle = index * angleStep;
        acc[node.id] = {
          x: center.x + (radius * scaleFactor) * Math.cos(angle),
          y: center.y + (radius * scaleFactor) * Math.sin(angle),
        };
        return acc;
      }, {} as Record<string, { x: number; y: number }>);

      setNodePositions(positions);
    } else if (actualLayout === 'tree') {
      const levels: Record<number, string[]> = { 0: [] };
      const nodeLevel: Record<string, number> = {};
      const processed = new Set<string>();

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

      if (levels[0].length === 0) {
        levels[0].push(processedData.nodes[0].id);
        nodeLevel[processedData.nodes[0].id] = 0;
        processed.add(processedData.nodes[0].id);
      }

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

      const maxLevel = currentLevel;
      const scaleFactor = getLayoutScalingFactor(nodeCount);
      const levelHeight = availableHeight / (maxLevel + 1) * scaleFactor;

      const positions = {} as Record<string, { x: number; y: number }>;

      Object.entries(levels).forEach(([level, nodeIds]) => {
        const lvl = parseInt(level);
        const levelWidth = Math.max(availableWidth * scaleFactor, nodeIds.length * 200);

        nodeIds.forEach((nodeId, index) => {
          const horizontalSpacing = levelWidth / (nodeIds.length + 1);
          positions[nodeId] = {
            x: center.x - levelWidth/2 + horizontalSpacing * (index + 1),
            y: center.y - availableHeight/2 + levelHeight * (lvl + 0.5)
          };
        });
      });

      setNodePositions(positions);
    } else if (actualLayout === 'spiral') {
      const positions = createSpiralLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );

      setNodePositions(positions);
    } else if (actualLayout === 'donut') {
      const positions = createDonutLayout(
        processedData.nodes,
        center,
        { width: availableWidth, height: availableHeight }
      );

      setNodePositions(positions);
    } else {
      const scaleFactor = getLayoutScalingFactor(nodeCount);
      const positions = processedData.nodes.reduce((acc, node, index) => {
        const angle = (index / nodeCount) * 2 * Math.PI;
        const radius = Math.min(availableWidth, availableHeight) / 4 * scaleFactor;
        const jitter = Math.random() * 100;

        acc[node.id] = {
          x: center.x + (radius + jitter) * Math.cos(angle),
          y: center.y + (radius + jitter) * Math.sin(angle),
        };
        return acc;
      }, {} as Record<string, { x: number; y: number }>);

      setNodePositions(positions);
    }

    if (transformGroupRef.current) {
      setTransform({
        x: (containerSize.width / 2) - (viewportSize.width / 2),
        y: (containerSize.height / 2) - (viewportSize.height / 2),
        scale: 1
      });
    }
  }, [processedData.nodes, processedData.edges, viewportSize, autoLayout, containerSize, getLayoutScalingFactor, createSpiralLayout, createDonutLayout]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();

    const svgRect = graphRef.current?.getBoundingClientRect();
    if (!svgRect) return;

    const pointerX = e.clientX - svgRect.left;
    const pointerY = e.clientY - svgRect.top;

    const delta = e.deltaY * -0.01;
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
  }, [transform.x, transform.y]);

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
    setTransform({
      x: (containerSize.width / 2) - (viewportSize.width / 2),
      y: (containerSize.height / 2) - (viewportSize.height / 2),
      scale: 1
    });
  }, [containerSize, viewportSize]);

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

  const handleNodePositionChange = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setNodePositions((prev) => ({
      ...prev,
      [id]: newPosition,
    }));
  }, []);

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

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node);
    const { nodes, edges } = findConnectedNodes(node.id);
    setHighlightedPath({ nodes, edges });
  }, [findConnectedNodes]);

  const handleShowDependencies = useCallback((node: Node) => {
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

  const handleShowDependents = useCallback((node: Node) => {
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

  const handleEdgeClick = useCallback((edge: Edge) => {
    setHighlightedPath({
      nodes: new Set([edge.source, edge.target]),
      edges: new Set([`${edge.source}-${edge.target}`]),
    });
  }, []);

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
      setHighlightedPath({ nodes: new Set(), edges: new Set() });
    }
  }, []);

  const getNodeDisplayName = useCallback((node: Node) => {
    return node.name || node.title || `Node ${node.id}`;
  }, []);

  const getNodeDisplayType = useCallback((node: Node) => {
    return node.type || 'unknown';
  }, []);

  const getNodeDisplayPath = useCallback((node: Node) => {
    return node.filepath || node.metadata?.filePath || node.metadata?.path || '';
  }, []);

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
        <defs>
          <pattern 
            id="grid-pattern" 
            width="20" 
            height="20" 
            patternUnits="userSpaceOnUse"
          >
            <circle 
              cx="1" 
              cy="1" 
              r="1" 
              fill={theme === 'dark' ? '#333' : '#e5e7eb'} 
            />
          </pattern>
        </defs>
        
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
          
          {processedData.edges.map((edge) => {
            const sourcePos = nodePositions[edge.source] || { x: 0, y: 0 };
            const targetPos = nodePositions[edge.target] || { x: 0, y: 0 };

            if (sourcePos.x === 0 && sourcePos.y === 0) return null;
            if (targetPos.x === 0 && targetPos.y === 0) return null;

            const isHighlighted = selectedNode && 
              (selectedNode.id === edge.source || selectedNode.id === edge.target);
            const isPathHighlighted = highlightedPath.edges.has(`${edge.source}-${edge.target}`);

            const angle = Math.atan2(targetPos.y - sourcePos.y, targetPos.x - sourcePos.x);

            const nodeRadius = 45 * nodeSizeScale;
            const startX = sourcePos.x + Math.cos(angle) * nodeRadius;
            const startY = sourcePos.y + Math.sin(angle) * nodeRadius;
            const endX = targetPos.x - Math.cos(angle) * nodeRadius;
            const endY = targetPos.y - Math.sin(angle) * nodeRadius;

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
                  strokeWidth={strokeWidth / transform.scale}
                  markerEnd={markerEnd}
                />
                
                {(isHighlighted || isPathHighlighted) && edge.type && (
                  <text
                    x={(startX + endX) / 2}
                    y={(startY + endY) / 2}
                    dy="-5"
                    textAnchor="middle"
                    className={`text-xs select-none pointer-events-none
                      ${isPathHighlighted ? 'fill-green-500' : 'fill-blue-500'}`}
                    style={{ fontSize: `${12 / transform.scale}px` }}
                  >
                    {edge.type}
                  </text>
                )}
                
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  strokeWidth={10 / transform.scale}
                  className="stroke-transparent cursor-pointer"
                />
              </g>
            );
          })}

          {processedData.nodes.map((node) => {
            const position = nodePositions[node.id] || { x: 0, y: 0 };

            if (position.x === 0 && position.y === 0) return null;

            if (position.x < -200 / transform.scale || 
                position.x > (viewportSize.width + 200) / transform.scale ||
                position.y < -200 / transform.scale || 
                position.y > (viewportSize.height + 200) / transform.scale) {
              return null;
            }

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
                <GraphNode
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

      <div className={`fixed top-4 right-4 ${colors.panel} backdrop-blur-sm rounded-lg shadow-sm border p-2 flex flex-col gap-2`}>
        <button 
          onClick={handleZoomIn}
          className={`p-1.5 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          title="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button 
          onClick={handleZoomOut}
          className={`p-1.5 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          title="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button 
          onClick={handleResetView}
          className={`p-1.5 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          title="Reset view"
        >
          <Minimize className="w-5 h-5" />
        </button>
      </div>

      <div className={`fixed bottom-4 right-4 ${colors.panel} backdrop-blur-sm rounded-lg shadow-sm border p-2 text-xs ${colors.text}`}>
        <div className="flex gap-3 items-center flex-wrap">
          {Object.entries(nodeStats.types).map(([type, count]) => (
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
          {processedData.metadata?.generatedBy ? ` Generated by ${processedData.metadata.generatedBy}` : ''} |
          Zoom: {Math.round(transform.scale * 100)}%
        </div>
      </div>

      {selectedNode && (
        <div 
          ref={detailsPanelRef}
          className={`fixed z-50 ${colors.panel} backdrop-blur-md rounded-lg shadow-xl border max-h-[80vh] overflow-hidden flex flex-col w-[350px] transition-all duration-300`}
          style={{
            left: selectedNode && nodePositions[selectedNode.id] ? 
                  Math.min(Math.max(nodePositions[selectedNode.id].x + 100, 20), containerSize.width - 370) : 20,
            top: selectedNode && nodePositions[selectedNode.id] ? 
                 Math.min(Math.max(nodePositions[selectedNode.id].y - 100, 20), containerSize.height - 300) : 20,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-3 flex items-center justify-between border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              {selectedNode.type && (
                <span className={`inline-block w-3 h-3 rounded-full`} 
                  style={{ 
                    backgroundColor: selectedNode.type === 'component' ? '#3b82f6' : 
                                    selectedNode.type === 'hook' ? '#8b5cf6' : 
                                    selectedNode.type === 'context' ? '#eab308' :
                                    selectedNode.type === 'class' ? '#22c55e' :
                                    selectedNode.type === 'file' ? '#f97316' :
                                    '#6b7280'
                  }} />
              )}
              <h3 className="font-medium text-base">{getNodeDisplayName(selectedNode)}</h3>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="px-3 py-2">
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
            }`}>
              {getNodeDisplayType(selectedNode)}
            </div>
            
            {getNodeDisplayPath(selectedNode) && (
              <div className={`text-xs mt-2 ${colors.textSecondary} break-words`}>
                {getNodeDisplayPath(selectedNode)}
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 pt-1">
            {selectedNode.sections && selectedNode.sections.length > 0 ? (
              selectedNode.sections.map(section => (
                <div 
                  key={section.id} 
                  className={`mb-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  } overflow-hidden`}
                >
                  <button
                    className={`w-full text-left p-2 flex items-center justify-between ${
                      theme === 'dark' ? 'hover:bg-gray-600/50' : 'hover:bg-gray-100/50'
                    }`}
                    onClick={(e) => toggleSection(section.id, e)}
                  >
                    <span className="font-medium text-sm">{section.name}</span>
                    {expandedSections.has(section.id) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                  
                  {expandedSections.has(section.id) && section.items.length > 0 && (
                    <div className={`px-2 pb-2 ${
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
                    }`}>
                      {section.items.map(item => (
                        <div 
                          key={item.id} 
                          className={`p-1.5 text-xs rounded my-1 flex items-start ${
                            theme === 'dark' ? 
                              'hover:bg-gray-700/50 bg-gray-700/30' : 
                              'hover:bg-gray-100 bg-gray-50/70'
                          }`}
                        >
                          <div className={`rounded-full w-1.5 h-1.5 mt-1.5 mr-2 ${
                            theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="break-words">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={`text-sm ${colors.textSecondary} italic p-2`}>
                No additional details available
              </div>
            )}
          </div>
          
          <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex gap-2 justify-between">
              <button 
                onClick={() => handleShowDependencies(selectedNode)}
                className={`text-xs flex-1 px-3 py-2 rounded flex items-center justify-center gap-1 ${
                  theme === 'dark' ? 
                    'bg-gray-700 hover:bg-gray-600 text-white' : 
                    'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <ArrowDownRight className="w-3.5 h-3.5" />
                Dependencies
              </button>
              <button 
                onClick={() => handleShowDependents(selectedNode)}
                className={`text-xs flex-1 px-3 py-2 rounded flex items-center justify-center gap-1 ${
                  theme === 'dark' ? 
                    'bg-gray-700 hover:bg-gray-600 text-white' : 
                    'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Dependents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Graph;