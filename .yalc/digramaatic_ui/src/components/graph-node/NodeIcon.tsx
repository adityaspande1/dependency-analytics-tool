import React from 'react';
import { 
  Component, 
  GitFork, 
  Code, 
  Box, 
  Package, 
  FileCode, 
  FileText, 
  Database, 
  FolderTree, 
  File 
} from 'lucide-react';

interface NodeIconProps {
  type: string;
}

/**
 * Component that renders the appropriate icon based on node type
 */
export const NodeIcon: React.FC<NodeIconProps> = ({ type }) => {
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