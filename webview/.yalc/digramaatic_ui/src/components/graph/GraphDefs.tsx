import React from 'react';

interface GraphDefsProps {
  theme: 'light' | 'dark';
}

export const GraphDefs: React.FC<GraphDefsProps> = ({ theme }) => {
  return (
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
      
      <marker
        id="arrowhead-default"
        markerWidth="10"
        markerHeight="7"
        refX="8"
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
        refX="8"
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
        refX="8"
        refY="3.5"
        orient="auto"
      >
        <polygon
          points="0 0, 10 3.5, 0 7"
          className="fill-green-500"
        />
      </marker>
    </defs>
  );
}; 