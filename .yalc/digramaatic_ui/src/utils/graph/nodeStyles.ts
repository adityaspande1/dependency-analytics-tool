/**
 * Get the node color scheme based on its type
 */
export function getNodeColor(type: string, theme: 'light' | 'dark'): string {
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
}

/**
 * Get the node type color for indicators and decorations
 */
export function getNodeTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'component': return '#3b82f6'; // blue
    case 'hook': return '#8b5cf6'; // purple
    case 'context': return '#eab308'; // yellow
    case 'class': return '#22c55e'; // green
    case 'file': return '#f97316'; // orange
    case 'service': return '#10b981'; // emerald
    case 'module': return '#f59e0b'; // amber
    case 'model': return '#6366f1'; // indigo
    case 'app': return '#ef4444'; // red
    case 'view': return '#0ea5e9'; // sky
    default: return '#6b7280'; // gray
  }
} 