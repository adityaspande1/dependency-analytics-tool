import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Node } from '../../types/graph';
import { useDragHandler } from '../../hooks/useDragHandler';
import { getNodeColor } from '../../utils/graph/nodeStyles';
import { NodeIcon } from './NodeIcon';
import { NodeTooltip } from './NodeTooltip';
import { NodeMenu } from './NodeMenu';
import { NodeInlineDetails } from './NodeInlineDetails';

interface GraphNodeProps {
  node: Node;
  position: { x: number; y: number };
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  isHighlighted?: boolean;
  isPathHighlighted?: boolean;
  onNodeClick?: (node: Node) => void;
  onShowDependencies?: (node: Node) => void;
  onShowDependents?: (node: Node) => void;
  sizeScale?: number;
  theme?: 'light' | 'dark';
  totalNodesInView: number;
  isInteractive?: boolean;
  zoomScale?: number;
}

/**
 * Main Graph Node component that represents a node in the graph visualization
 */
export const GraphNode: React.FC<GraphNodeProps> = ({ 
  node, 
  position, 
  onPositionChange,
  isHighlighted = false,
  isPathHighlighted = false,
  onNodeClick,
  onShowDependencies,
  onShowDependents,
  sizeScale = 1,
  theme = 'light',
  totalNodesInView,
  isInteractive = true,
  zoomScale = 1,
}) => {
  // State
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Refs
  const nodeRef = useRef<HTMLDivElement>(null);
  const tooltipTimeoutRef = useRef<number | undefined>(undefined);

  // Use the drag handler hook
  const { isDragging, startDrag } = useDragHandler(
    isInteractive,
    zoomScale,
    onPositionChange,
    node.id
  );

  // Handle node click (when not dragging)
  const handleNodeClick = (e: React.MouseEvent) => {
    if (!isDragging && onNodeClick) {
      e.preventDefault();
      e.stopPropagation();
      onNodeClick(node);
    }
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-menu') || !isInteractive) {
      return;
    }
    startDrag(e, position);
  };

  // Handle menu toggle
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
    setShowTooltip(false);
  };

  // Tooltip show/hide handlers
  const handleMouseEnter = () => {
    if (totalNodesInView > 3) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Cleanup tooltip timeout
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        window.clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  // Update tooltip position when node position changes
  useEffect(() => {
    const baseNodeWidth = 180;
    const sizeAdjustment = totalNodesInView > 50 ? Math.max(0.7, 1 - (totalNodesInView / 300)) : 1;
    const nodeWidth = baseNodeWidth * sizeScale * sizeAdjustment;
    
    setTooltipPosition({ x: position.x + nodeWidth / 2, y: position.y - 20 });
  }, [position.x, position.y, sizeScale, totalNodesInView]);

  // Calculate visual properties
  const isDark = theme === 'dark';
  const baseNodeWidth = 180;
  const sizeAdjustment = totalNodesInView > 50 ? Math.max(0.7, 1 - (totalNodesInView / 300)) : 1;
  const nodeWidth = baseNodeWidth * sizeScale * sizeAdjustment;
  
  // Get display values from node
  const displayName = node.name || node.title || `Node ${node.id}`;
  const displayType = node.type || 'unknown';
  
  // Process filepath for display
  const displayPath = (() => {
    const path = node.filepath || '';
    if (!path) return '';
    return path.length > 25 ? '...' + path.substring(path.length - 25) : path;
  })();

  // Generate styles
  const highlightStyle = isHighlighted
    ? `ring-4 ${isDark ? 'ring-blue-500/70' : 'ring-blue-500'} scale-110 z-20`
    : isPathHighlighted
    ? `ring-2 ${isDark ? 'ring-green-500/70' : 'ring-green-500'} z-10`
    : '';

  const nodeColor = getNodeColor(displayType, theme);
  const shadowStyle = isDark 
    ? isDragging 
      ? 'shadow-lg shadow-black/40' 
      : 'shadow-md shadow-black/30' 
    : isDragging 
      ? 'shadow-lg' 
      : 'shadow-md';
  const dragStyle = isDragging ? 'opacity-80 scale-105' : 'opacity-100';

  return (
    <div
      ref={nodeRef}
      className={`absolute p-3 rounded-lg border-2 ${nodeColor} ${shadowStyle} transition-all duration-200 ${isInteractive ? 'cursor-pointer' : 'cursor-default'} select-none
      ${highlightStyle} ${dragStyle} pointer-events-auto`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: `${nodeWidth}px`,
        zIndex: isDragging || showMenu || isHighlighted ? 50 : isPathHighlighted ? 5 : 1,
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleNodeClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <NodeIcon type={displayType} />
          <span className="font-medium text-sm truncate">{displayName}</span>
        </div>
        {isInteractive && (
          <button
            className={`p-1 rounded-full transition-colors node-menu
              ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            onClick={handleMenuClick}
            aria-label="Node options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {displayPath && (
        <div className="text-xs opacity-70 mt-1 truncate">
          {displayPath}
        </div>
      )}
      
      <div className={`text-xs ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} rounded px-2 py-1 mt-1`}>
        {displayType}
      </div>

      {/* Context Menu */}
      <NodeMenu 
        node={node}
        show={showMenu}
        theme={theme}
        onShowDetails={onNodeClick || (() => {})}
        onShowDependencies={onShowDependencies || (() => {})}
        onShowDependents={onShowDependents || (() => {})}
        onClose={() => setShowMenu(false)}
      />

      {/* Inline Details for small graphs */}
      <NodeInlineDetails
        node={node}
        nodeWidth={nodeWidth}
        theme={theme}
        show={totalNodesInView <= 3}
      />

      {/* Tooltip for hovering on larger graphs */}
      <NodeTooltip
        node={node}
        position={tooltipPosition}
        show={showTooltip && totalNodesInView > 3}
        theme={theme}
      />
    </div>
  );
}; 