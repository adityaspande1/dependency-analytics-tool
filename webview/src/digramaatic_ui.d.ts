declare module 'digramaatic_ui' {
  export interface GraphData {
    nodes: any[];
    edges: any[];
    [key: string]: any;
  }

  export interface GraphProps {
    data: GraphData;
    width: number;
    height: number;
    autoLayout?: string;
    nodeSizeScale?: number;
    theme?: 'light' | 'dark';
    onNodeSelect?: (nodeId: string) => void;
    onSourceNavigate?: (filePath: string) => void;
  }

  export const Graph: React.FC<GraphProps>;
} 