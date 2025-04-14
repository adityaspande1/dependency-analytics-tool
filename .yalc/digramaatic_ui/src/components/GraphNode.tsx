// src/components/GraphNode.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileCode, Package, Box, Code, MoreHorizontal, Info, GitFork, X, ArrowUpRight, ArrowDownRight, File, FileText, Component, Database, FolderTree } from 'lucide-react';
import { Node } from '../types/graph';

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
  isInteractive?: boolean;  // Supporting zoom/pan context
  zoomScale?: number;       // Adding zoom scale to adjust drag sensitivity
}

// Get the appropriate icon based on node type
const getNodeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'component':
      return <Component className="w-5 h-5" />;
    case 'hook':
      return <GitFork className="w-5 h-5" />;
    case 'service':
      return <Code className="w-5 h-5" />;
    case 'context':
      return <Box className="w-5 h-5" />;
    case 'module':
      return <Package className="w-5 h-5" />;
    case 'class':
      return <FileCode className="w-5 h-5" />;
    case 'file':
      return <FileText className="w-5 h-5" />;
    case 'model':
      return <Database className="w-5 h-5" />;
    case 'app':
      return <FolderTree className="w-5 h-5" />;
    case 'view':
      return <Component className="w-5 h-5" />;
    default:
      return <File className="w-5 h-5" />;
  }
};

// Get the node color scheme based on its type
const getNodeColor = (type: string, theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  
  switch (type.toLowerCase()) {
    case 'component':
      return isDark 
        ? 'bg-blue-900/40 border-blue-600 text-blue-50' 
        : 'bg-blue-50 border-blue-500 text-blue-800';
    case 'hook':
      return isDark 
        ? 'bg-purple-900/40 border-purple-600 text-purple-50' 
        : 'bg-purple-50 border-purple-500 text-purple-800';
    case 'service':
      return isDark 
        ? 'bg-green-900/40 border-green-600 text-green-50' 
        : 'bg-green-50 border-green-500 text-green-800';
    case 'context':
      return isDark 
        ? 'bg-yellow-900/40 border-yellow-600 text-yellow-50' 
        : 'bg-yellow-50 border-yellow-500 text-yellow-800';
    case 'module':
      return isDark 
        ? 'bg-orange-900/40 border-orange-600 text-orange-50' 
        : 'bg-orange-50 border-orange-500 text-orange-800';
    case 'class':
      return isDark 
        ? 'bg-green-900/40 border-green-600 text-green-50' 
        : 'bg-green-50 border-green-500 text-green-800';
    case 'file':
      return isDark 
        ? 'bg-orange-900/40 border-orange-600 text-orange-50'
        : 'bg-orange-50 border-orange-500 text-orange-800';
    case 'model':
      return isDark 
        ? 'bg-indigo-900/40 border-indigo-600 text-indigo-50' 
        : 'bg-indigo-50 border-indigo-500 text-indigo-800';
    case 'app':
      return isDark 
        ? 'bg-red-900/40 border-red-600 text-red-50' 
        : 'bg-red-50 border-red-500 text-red-800';
    case 'view':
      return isDark 
        ? 'bg-sky-900/40 border-sky-600 text-sky-50' 
        : 'bg-sky-50 border-sky-500 text-sky-800';
    default:
      return isDark 
        ? 'bg-gray-900/40 border-gray-600 text-gray-50' 
        : 'bg-gray-50 border-gray-500 text-gray-800';
  }
};

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
  // State management
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragStartNodePos, setDragStartNodePos] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Refs
  const nodeRef = useRef<HTMLDivElement>(null);
  const tooltipTimeoutRef = useRef<number | undefined>(undefined);
  const dragThresholdRef = useRef(5); // Minimum pixel movement to start drag
  const dragStartedRef = useRef(false);

  // Handle cleanup of tooltip timeout
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        window.clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging && isInteractive) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!dragStartedRef.current) {
          // Check if we've moved enough to start a drag
          const deltaX = Math.abs(e.clientX - dragStartPos.x) / zoomScale;
          const deltaY = Math.abs(e.clientY - dragStartPos.y) / zoomScale;
          
          if (deltaX > dragThresholdRef.current || deltaY > dragThresholdRef.current) {
            dragStartedRef.current = true;
          } else {
            return; // Don't start dragging yet
          }
        }
        
        // Calculate new position based on starting positions and current mouse position
        const newX = dragStartNodePos.x + (e.clientX - dragStartPos.x) / zoomScale;
        const newY = dragStartNodePos.y + (e.clientY - dragStartPos.y) / zoomScale;
        
        // Update node position
        onPositionChange(node.id, { x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        dragStartedRef.current = false;
        document.body.classList.remove('cursor-grabbing');
      };

      // Add global event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      // Change cursor
      document.body.classList.add('cursor-grabbing');

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.classList.remove('cursor-grabbing');
      };
    }
  }, [isDragging, dragStartPos, dragStartNodePos, node.id, onPositionChange, isInteractive, zoomScale]);

  // Node drag start handler
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start dragging if clicked on a menu element or if not interactive
    if ((e.target as HTMLElement).closest('.node-menu') || !isInteractive) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    // Store starting positions
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setDragStartNodePos({ x: position.x, y: position.y });
    setIsDragging(true);
    dragStartedRef.current = false;
  };

  // Handle node click (when not dragging)
  const handleNodeClick = (e: React.MouseEvent) => {
    if (!dragStartedRef.current && onNodeClick) {
      e.preventDefault();
      e.stopPropagation();
      onNodeClick(node);
    }
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

  // Determine if we're in dark mode
  const isDark = theme === 'dark';

  // Calculate the node size based on scale and adjust for very large graphs
  const baseNodeWidth = 180;
  // Scale nodes down for very large graphs, but not too small
  const sizeAdjustment = totalNodesInView > 50 ? Math.max(0.7, 1 - (totalNodesInView / 300)) : 1;
  const nodeWidth = baseNodeWidth * sizeScale * sizeAdjustment;
  
  // Get display values from node
  const displayName = node.name || node.title || `Node ${node.id}`;
  const displayType = node.type || 'unknown';
  
  // Process filepath for display
  const displayPath = (() => {
    const path = node.filepath || '';
    if (!path) return '';
    
    // Limit path length for display
    return path.length > 25 ? '...' + path.substring(path.length - 25) : path;
  })();

  // Generate highlight styles based on state
  const highlightStyle = isHighlighted
    ? `ring-4 ${isDark ? 'ring-blue-500/70' : 'ring-blue-500'} scale-110 z-20`
    : isPathHighlighted
    ? `ring-2 ${isDark ? 'ring-green-500/70' : 'ring-green-500'} z-10`
    : '';

  // Generate node color based on type and theme
  const nodeColor = getNodeColor(displayType, theme);

  // Get shadow based on theme and state
  const shadowStyle = isDark 
    ? isDragging 
      ? 'shadow-lg shadow-black/40' 
      : 'shadow-md shadow-black/30' 
    : isDragging 
      ? 'shadow-lg' 
      : 'shadow-md';

  // Animation style for dragging
  const dragStyle = isDragging ? 'opacity-80 scale-105' : 'opacity-100';

  // Update position state when props change
  useEffect(() => {
    setTooltipPosition({ x: position.x + nodeWidth / 2, y: position.y - 20 });
  }, [position.x, position.y, nodeWidth]);

  // Render node sections inside the node if there are <= 3 nodes in view
  const renderInlineDetails = () => {
    if (totalNodesInView > 3 || !node.sections || node.sections.length === 0) return null;
    
    return (
      <foreignObject
        x={-nodeWidth / 2}
        y={nodeWidth / 2 + 10}
        width={nodeWidth}
        height={nodeWidth * 3}
        overflow="visible"
        className="pointer-events-none"
      >
        <div 
          className={`rounded-md border overflow-auto max-h-60 text-xs p-2 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 text-gray-200' 
              : 'bg-white border-gray-300 text-gray-700'
          }`}
        >
          {node.sections.map((section, index) => (
            <div key={section.id} className={index > 0 ? 'mt-2' : ''}>
              <div className="font-semibold">{section.name}</div>
              {section.items.length > 0 && (
                <ul className="pl-2 mt-1">
                  {section.items.slice(0, 3).map(item => (
                    <li key={item.id} className="truncate">{item.value}</li>
                  ))}
                  {section.items.length > 3 && (
                    <li className="text-gray-500">+{section.items.length - 3} more...</li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </foreignObject>
    );
  };

  // Create tooltip content for hover
  const tooltipContent = (
    <div
      className={`absolute z-10 rounded-md shadow-lg p-3 pointer-events-none ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
      style={{
        transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)`,
        width: '280px',
        maxHeight: '300px',
        overflow: 'auto',
        display: showTooltip ? 'block' : 'none'
      }}
    >
      <div className="font-bold mb-1">{node.title || displayName}</div>
      <div className={`text-xs inline-block px-2 py-0.5 rounded-full mb-2 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        {node.type}
      </div>
        
      {node.sections && node.sections.map((section, index) => (
        <div key={section.id} className={index > 0 ? 'mt-2' : ''}>
          <div className="font-semibold text-sm border-b border-gray-600 mb-1">{section.name}</div>
          {section.items.length > 0 && (
            <ul className="pl-2">
              {section.items.slice(0, 5).map(item => (
                <li key={item.id} className="text-xs truncate">{item.value}</li>
              ))}
              {section.items.length > 5 && (
                <li className="text-xs text-gray-500">+{section.items.length - 5} more...</li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

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
          {getNodeIcon(displayType)}
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
      {showMenu && (
        <div 
          className={`absolute right-0 top-full mt-1 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-lg shadow-lg border py-1 w-48 z-50 node-menu`}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className={`w-full px-3 py-2 text-left text-sm ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              if (onNodeClick) onNodeClick(node);
              setShowMenu(false);
            }}
          >
            <Info className="w-4 h-4" />
            View Details
          </button>
          <button 
            className={`w-full px-3 py-2 text-left text-sm ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              if (onShowDependencies) onShowDependencies(node);
              setShowMenu(false);
            }}
          >
            <ArrowDownRight className="w-4 h-4" />
            Show Dependencies
          </button>
          <button 
            className={`w-full px-3 py-2 text-left text-sm ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              if (onShowDependents) onShowDependents(node);
              setShowMenu(false);
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
            Show Dependents
          </button>
          <button 
            className={`w-full px-3 py-2 text-left text-sm ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
          >
            <X className="w-4 h-4" />
            Close Menu
          </button>
        </div>
      )}

      {/* Render inline details if applicable */}
      {renderInlineDetails()}

      {/* Render tooltip for hovering when many nodes are present */}
      {showTooltip && totalNodesInView > 3 && tooltipContent}
    </div>
  );
};