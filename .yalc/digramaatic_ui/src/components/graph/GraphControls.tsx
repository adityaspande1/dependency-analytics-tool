import React from 'react';
import { ZoomIn, ZoomOut, Minimize } from 'lucide-react';

interface GraphControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  theme: 'light' | 'dark';
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  theme
}) => {
  const colorStyles = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700 backdrop-blur-sm' 
    : 'bg-white border-gray-100 backdrop-blur-sm';
    
  const hoverStyles = theme === 'dark' 
    ? 'hover:bg-gray-700' 
    : 'hover:bg-gray-100';

  return (
    <div className={`fixed top-4 right-4 ${colorStyles} rounded-lg shadow-sm border p-2 flex flex-col gap-2`}>
      <button 
        onClick={onZoomIn}
        className={`p-1.5 rounded ${hoverStyles}`}
        title="Zoom in"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button 
        onClick={onZoomOut}
        className={`p-1.5 rounded ${hoverStyles}`}
        title="Zoom out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      <button 
        onClick={onResetView}
        className={`p-1.5 rounded ${hoverStyles}`}
        title="Reset view"
      >
        <Minimize className="w-5 h-5" />
      </button>
    </div>
  );
}; 