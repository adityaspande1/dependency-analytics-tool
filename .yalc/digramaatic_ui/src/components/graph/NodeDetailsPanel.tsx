import React from 'react';
import { X, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Node } from '../../types/graph';

interface NodeDetailsPanelProps {
  node: Node | null;
  position: { x: number; y: number } | null;
  containerSize: { width: number; height: number };
  theme: 'light' | 'dark';
  expandedSections: Set<string>;
  onToggleSection: (sectionId: string, e: React.MouseEvent) => void;
  onShowDependencies: (node: Node) => void;
  onShowDependents: (node: Node) => void;
  onClose: () => void;
  getNodeDisplayName: (node: Node) => string;
  getNodeDisplayType: (node: Node) => string;
  getNodeDisplayPath: (node: Node) => string;
}

export const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({
  node,
  position,
  containerSize,
  theme,
  expandedSections,
  onToggleSection,
  onShowDependencies,
  onShowDependents,
  onClose,
  getNodeDisplayName,
  getNodeDisplayType,
  getNodeDisplayPath
}) => {
  if (!node || !position) return null;

  const colors = theme === 'dark' 
    ? {
        panel: 'bg-gray-800 border-gray-700',
        text: 'text-white',
        secondaryBg: 'bg-gray-700',
        hoverBg: 'hover:bg-gray-700',
        sectionBg: 'bg-gray-700/50',
        sectionContentBg: 'bg-gray-800/50',
        itemBg: 'bg-gray-700/30',
        itemHoverBg: 'hover:bg-gray-700/50',
        border: 'border-gray-700'
      }
    : {
        panel: 'bg-white border-gray-200',
        text: 'text-gray-900',
        secondaryBg: 'bg-gray-100',
        hoverBg: 'hover:bg-gray-100',
        sectionBg: 'bg-gray-50',
        sectionContentBg: 'bg-white/50',
        itemBg: 'bg-gray-50/70',
        itemHoverBg: 'hover:bg-gray-100',
        border: 'border-gray-200'
      };

  return (
    <div 
      className={`fixed z-50 ${colors.panel} backdrop-blur-md rounded-lg shadow-xl border max-h-[80vh] overflow-hidden flex flex-col w-[350px] transition-all duration-300`}
      style={{
        left: position ? 
              Math.min(Math.max(position.x + 100, 20), containerSize.width - 370) : 20,
        top: position ? 
             Math.min(Math.max(position.y - 100, 20), containerSize.height - 300) : 20,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`p-3 flex items-center justify-between border-b ${colors.border}`}>
        <div className="flex items-center gap-2">
          {node.type && (
            <span className={`inline-block w-3 h-3 rounded-full`} 
              style={{ 
                backgroundColor: node.type === 'component' ? '#3b82f6' : 
                                node.type === 'hook' ? '#8b5cf6' : 
                                node.type === 'context' ? '#eab308' :
                                node.type === 'class' ? '#22c55e' :
                                node.type === 'file' ? '#f97316' :
                                '#6b7280'
              }} />
          )}
          <h3 className="font-medium text-base">{getNodeDisplayName(node)}</h3>
        </div>
        <button 
          onClick={onClose}
          className={`p-1 rounded-full ${colors.hoverBg}`}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="px-3 py-2">
        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
          theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
        }`}>
          {getNodeDisplayType(node)}
        </div>
        
        {getNodeDisplayPath(node) && (
          <div className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} break-words`}>
            {getNodeDisplayPath(node)}
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 pt-1">
        {node.sections && node.sections.length > 0 ? (
          node.sections.map(section => (
            <div 
              key={section.id} 
              className={`mb-2 rounded-lg ${colors.sectionBg} overflow-hidden`}
            >
              <button
                className={`w-full text-left p-2 flex items-center justify-between ${colors.itemHoverBg}`}
                onClick={(e) => onToggleSection(section.id, e)}
              >
                <span className="font-medium text-sm">{section.name}</span>
                {expandedSections.has(section.id) ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {expandedSections.has(section.id) && section.items.length > 0 && (
                <div className={`px-2 pb-2 ${colors.sectionContentBg}`}>
                  {section.items.map(item => (
                    <div 
                      key={item.id} 
                      className={`p-1.5 text-xs rounded my-1 flex items-start ${colors.itemBg} ${colors.itemHoverBg}`}
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
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} italic p-2`}>
            No additional details available
          </div>
        )}
      </div>
      
      <div className={`p-3 border-t ${colors.border}`}>
        <div className="flex gap-2 justify-between">
          <button 
            onClick={() => onShowDependencies(node)}
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
            onClick={() => onShowDependents(node)}
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
  );
}; 