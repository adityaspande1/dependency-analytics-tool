import React from 'react';
import { Node } from '../../types/graph';

interface NodeTooltipProps {
  node: Node;
  position: { x: number; y: number };
  show: boolean;
  theme: 'light' | 'dark';
}

/**
 * Node tooltip component showing detailed information on hover
 */
export const NodeTooltip: React.FC<NodeTooltipProps> = ({ 
  node, 
  position, 
  show, 
  theme 
}) => {
  if (!show) return null;

  return (
    <div
      className={`absolute z-10 rounded-md shadow-lg p-3 pointer-events-none ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: '280px',
        maxHeight: '300px',
        overflow: 'auto',
        display: show ? 'block' : 'none'
      }}
    >
      <div className="font-bold mb-1">{node.title || node.name}</div>
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
}; 