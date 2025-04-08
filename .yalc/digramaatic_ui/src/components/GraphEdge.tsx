// src/components/GraphEdge.tsx
'use client';

import React, { useState } from 'react';
import { Edge } from '../types/graph';

interface GraphEdgeProps {
  edge: Edge;
  sourcePos: { x: number; y: number };
  targetPos: { x: number; y: number };
  isHighlighted?: boolean;
  isPathHighlighted?: boolean;
  onClick?: (edge: Edge) => void;
  theme?: 'light' | 'dark';
}

export const GraphEdge: React.FC<GraphEdgeProps> = ({ 
  edge, 
  sourcePos, 
  targetPos,
  isHighlighted = false,
  isPathHighlighted = false,
  onClick,
  theme = 'light'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Calculate the angle for the arrow
  const angle = Math.atan2(targetPos.y - sourcePos.y, targetPos.x - sourcePos.x);
  const distance = Math.sqrt(
    Math.pow(targetPos.x - sourcePos.x, 2) + Math.pow(targetPos.y - sourcePos.y, 2)
  );

  // Adjust start and end points to account for node size
  const nodeRadius = 45; // Approximate half of node width
  const startX = sourcePos.x + Math.cos(angle) * nodeRadius;
  const startY = sourcePos.y + Math.sin(angle) * nodeRadius;
  const endX = targetPos.x - Math.cos(angle) * nodeRadius;
  const endY = targetPos.y - Math.sin(angle) * nodeRadius;

  // Calculate middle point for tooltip
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  // Determine if we're in dark mode
  const isDark = theme === 'dark';

  // Get edge color and style based on state
  const getEdgeStyles = () => {
    if (isPathHighlighted) {
      return {
        stroke: isDark ? 'stroke-green-500' : 'stroke-green-500',
        strokeWidth: 2.5,
        markerEnd: 'url(#arrowhead-path)',
        textColor: isDark ? 'fill-green-300' : 'fill-green-600'
      };
    }
    
    if (isHighlighted) {
      return {
        stroke: isDark ? 'stroke-blue-500' : 'stroke-blue-500',
        strokeWidth: 2,
        markerEnd: 'url(#arrowhead-highlighted)',
        textColor: isDark ? 'fill-blue-300' : 'fill-blue-600'
      };
    }
    
    return {
      stroke: isDark ? 'stroke-gray-600' : 'stroke-gray-300',
      strokeWidth: 1.5,
      markerEnd: 'url(#arrowhead-default)',
      textColor: isDark ? 'fill-gray-400' : 'fill-gray-500'
    };
  };

  const edgeStyles = getEdgeStyles();
  
  // Get a display name for the edge type
  const edgeType = edge.type || 'relates to';

  // Handle edge click
  const handleEdgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(edge);
    }
  };

  // Extract relevant metadata for tooltip
  const getMetadataEntries = () => {
    if (!edge.metadata) return [];
    
    // Get the most important metadata entries for display
    const entries = [];
    
    // Most common fields across different data formats
    if (edge.metadata.usage) entries.push({ key: 'Usage', value: edge.metadata.usage });
    if (edge.metadata.functions) entries.push({ 
      key: 'Functions', 
      value: Array.isArray(edge.metadata.functions) 
        ? edge.metadata.functions.join(', ') 
        : edge.metadata.functions 
    });
    if (edge.metadata.location) entries.push({ key: 'Location', value: edge.metadata.location });
    if (edge.metadata.related_name) entries.push({ key: 'Related Name', value: edge.metadata.related_name });
    if (edge.metadata.field_name) entries.push({ key: 'Field Name', value: edge.metadata.field_name });
    
    // Add any remaining entries up to a max of 5
    const remainingKeys = Object.keys(edge.metadata).filter(
      key => !['usage', 'functions', 'location', 'related_name', 'field_name'].includes(key)
    );
    
    for (const key of remainingKeys) {
      if (entries.length >= 5) break;
      
      const value = edge.metadata[key];
      if (value !== undefined && value !== null) {
        entries.push({ 
          key: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: Array.isArray(value) ? value.join(', ') : String(value)
        });
      }
    }
    
    return entries;
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: isHighlighted || isPathHighlighted ? 2 : 1 }}
    >
      {/* Edge line */}
      <g>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          className={`${edgeStyles.stroke} transition-all duration-200 pointer-events-auto`}
          strokeWidth={edgeStyles.strokeWidth}
          markerEnd={edgeStyles.markerEnd}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleEdgeClick}
        />
        
        {/* Invisible wider line for better hover */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          className="stroke-transparent pointer-events-auto cursor-pointer"
          strokeWidth="10"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleEdgeClick}
        />
      </g>

      {/* Edge label - only shown when highlighted or path highlighted */}
      {(isHighlighted || isPathHighlighted) && (
        <text
          x={midX}
          y={midY}
          dy="-5"
          textAnchor="middle"
          className={`text-xs ${edgeStyles.textColor} pointer-events-none select-none`}
        >
          {edgeType}
        </text>
      )}

      {/* Edge Tooltip */}
      {showTooltip && (
        <foreignObject
          x={midX - 100}
          y={midY - 60}
          width="200"
          height="auto"
          style={{ pointerEvents: 'none' }}
        >
          <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-800'} text-white px-3 py-2 rounded-lg text-sm max-w-xs shadow-lg`}>
            <div className="font-medium">{edgeType.charAt(0).toUpperCase() + edgeType.slice(1)} Relationship</div>
            
            {getMetadataEntries().map((entry, index) => (
              <div key={`metadata-${index}`} className="text-xs text-gray-300 mt-1">
                <span className="font-medium">{entry.key}:</span> {entry.value}
              </div>
            ))}
            
            {getMetadataEntries().length === 0 && (
              <div className="text-xs text-gray-300">
                Connection from {edge.source} to {edge.target}
              </div>
            )}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};