import React from 'react';
import { Info, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { Node } from '../../types/graph';

interface NodeMenuProps {
  node: Node;
  show: boolean;
  theme: 'light' | 'dark';
  onShowDetails: (node: Node) => void;
  onShowDependencies: (node: Node) => void;
  onShowDependents: (node: Node) => void;
  onClose: () => void;
}

/**
 * Node context menu component for showing options when clicking menu button
 */
export const NodeMenu: React.FC<NodeMenuProps> = ({ 
  node, 
  show, 
  theme, 
  onShowDetails,
  onShowDependencies,
  onShowDependents,
  onClose 
}) => {
  if (!show) return null;
  
  const isDark = theme === 'dark';
  
  return (
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
          onShowDetails(node);
          onClose();
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
          onShowDependencies(node);
          onClose();
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
          onShowDependents(node);
          onClose();
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
          onClose();
        }}
      >
        <X className="w-4 h-4" />
        Close Menu
      </button>
    </div>
  );
}; 