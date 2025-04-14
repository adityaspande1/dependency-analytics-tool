import React from 'react';
import { Node } from '../../types/graph';

interface NodeInlineDetailsProps {
  node: Node;
  nodeWidth: number;
  theme: 'light' | 'dark';
  show: boolean;
}

/**
 * Node inline details component shown for small graphs with few nodes
 */
export const NodeInlineDetails: React.FC<NodeInlineDetailsProps> = ({ 
  node, 
  nodeWidth, 
  theme, 
  show 
}) => {
  if (!show || !node.sections || node.sections.length === 0) return null;
  
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