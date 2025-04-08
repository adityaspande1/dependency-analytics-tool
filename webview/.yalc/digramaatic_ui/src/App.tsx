// src/App.tsx
import { useState, useEffect } from 'react';
import { Graph } from './components/Graph';
import { sampleData, typescriptProjectSample, javaProjectSample, djangoProjectSample } from './lib/data';
import { Sun, Moon, Info, Search, ChevronDown, ChevronUp, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Node, Edge, GraphData } from './types/graph';

// Define proper type for data source
type DataSourceType = 'react' | 'typescript' | 'java' | 'django';

// To change data source, modify this line:
const DATA_SOURCE: DataSourceType = 'react'; // Options: 'react', 'typescript', 'java', 'django'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayMode, setDisplayMode] = useState<'list' | 'dependencies' | 'dependents'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'type'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({});
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Get the data based on the constant
  const getGraphData = (): GraphData => {
    switch (DATA_SOURCE) {
      case 'typescript': return typescriptProjectSample;
      case 'java': return javaProjectSample;
      case 'django': return djangoProjectSample;
      default: return sampleData;
    }
  };
  
  // Get the data
  const graphData = getGraphData();

  // Group nodes by type
  const nodesByType: Record<string, Node[]> = graphData.nodes.reduce((acc, node) => {
    const type = node.type || 'unknown';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(node);
    return acc;
  }, {} as Record<string, Node[]>);

  // Toggle expanded state for node types
  const toggleExpandedType = (type: string) => {
    setExpandedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Filter and sort nodes
  const filteredNodes = graphData.nodes.filter(node => 
    node.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort nodes
  const sortedNodesByType: Record<string, Node[]> = {};
  Object.keys(nodesByType).forEach(type => {
    sortedNodesByType[type] = [...nodesByType[type]].sort((a, b) => {
      const aValue = sortBy === 'name' ? a.title || '' : a.type || '';
      const bValue = sortBy === 'name' ? b.title || '' : b.type || '';
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  });

  // Find related nodes and edges based on the selected node
  const getFilteredGraphData = (): GraphData => {
    if (!selectedNode) return { nodes: [], edges: [], metadata: graphData.metadata };

    const nodeIds = new Set<string>([selectedNode.id]);
    const filteredEdges: Edge[] = [];

    if (displayMode === 'dependencies' || displayMode === 'dependents') {
      graphData.edges.forEach(edge => {
        if (displayMode === 'dependencies' && edge.source === selectedNode.id) {
          nodeIds.add(edge.target);
          filteredEdges.push(edge);
        } else if (displayMode === 'dependents' && edge.target === selectedNode.id) {
          nodeIds.add(edge.source);
          filteredEdges.push(edge);
        }
      });
    }

    const filteredNodes = graphData.nodes.filter(node => nodeIds.has(node.id));
    
    return {
      nodes: filteredNodes,
      edges: filteredEdges,
      metadata: graphData.metadata
    };
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Graph UI Library</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Visualize project dependencies and structures
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-sm transition-colors`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Info button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-sm transition-colors ${showInfo ? 'text-blue-500' : ''}`}
              aria-label="Show information"
            >
              <Info size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Project Info */}
          <div className={`mb-4 p-4 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Project Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Project:</span>
                <div className="font-medium">{graphData.projectName || 'Unnamed Project'}</div>
              </div>
              <div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Language:</span>
                <div className="font-medium">{graphData.language || 'Unknown'}</div>
              </div>
              <div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Nodes:</span>
                <div className="font-medium">{graphData.nodes.length}</div>
              </div>
              <div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Relationships:</span>
                <div className="font-medium">{graphData.edges.length}</div>
              </div>
            </div>
          </div>

          {/* Main display area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Node list sidebar */}
            <div className={`rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Nodes</h3>
                
                {/* Search box */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search nodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-md border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <Search 
                    size={18} 
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} 
                  />
                </div>
                
                {/* Sort controls */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'type')}
                      className={`text-sm px-2 py-1 rounded-md border ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="name">Name</option>
                      <option value="type">Type</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={toggleSortOrder}
                    className={`p-1 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    {sortOrder === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Node list */}
              <div className="p-2 overflow-auto" style={{ maxHeight: 'calc(700px - 180px)' }}>
                {searchQuery ? (
                  // Show flat list when searching
                  <div>
                    <h4 className="text-sm font-medium p-2">
                      Search Results: {filteredNodes.length} nodes
                    </h4>
                    <ul className="space-y-1">
                      {filteredNodes.map(node => (
                        <li key={node.id}>
                          <button
                            onClick={() => {
                              setSelectedNode(node);
                              setDisplayMode('dependencies');
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md ${
                              selectedNode?.id === node.id
                                ? theme === 'dark' ? 'bg-blue-700' : 'bg-blue-100'
                                : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{node.title}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                              }`}>
                                {node.type}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Show grouped by type when not searching
                  <div className="space-y-2">
                    {Object.keys(sortedNodesByType).map(type => (
                      <div key={type} className="mb-2">
                        <button
                          onClick={() => toggleExpandedType(type)}
                          className={`w-full flex items-center justify-between p-2 rounded-md font-medium ${
                            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          <span>{type} ({sortedNodesByType[type].length})</span>
                          {expandedTypes[type] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        {expandedTypes[type] && (
                          <ul className="pl-2 mt-1 space-y-1">
                            {sortedNodesByType[type].map(node => (
                              <li key={node.id}>
                                <button
                                  onClick={() => {
                                    setSelectedNode(node);
                                    setDisplayMode('dependencies');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md ${
                                    selectedNode?.id === node.id
                                      ? theme === 'dark' ? 'bg-blue-700' : 'bg-blue-100' 
                                      : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                  }`}
                                >
                                  {node.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Graph container */}
            <div className="md:col-span-2">
              <div className={`h-[700px] rounded-lg shadow-sm overflow-hidden relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                {selectedNode ? (
                  <>
                    {/* Display mode selector */}
                    <div className="absolute top-4 right-4 z-10 flex items-center bg-gray-800 bg-opacity-80 rounded-md shadow-md">
                      <button
                        onClick={() => setDisplayMode('dependencies')}
                        className={`px-3 py-1 rounded-l-md flex items-center space-x-1 ${displayMode === 'dependencies' 
                          ? theme === 'dark' ? 'bg-blue-700' : 'bg-blue-500 text-white' 
                          : ''}`}
                      >
                        <ArrowUpRight size={16} />
                        <span>Dependencies</span>
                      </button>
                      <button
                        onClick={() => setDisplayMode('dependents')}
                        className={`px-3 py-1 rounded-r-md flex items-center space-x-1 ${displayMode === 'dependents' 
                          ? theme === 'dark' ? 'bg-blue-700' : 'bg-blue-500 text-white' 
                          : ''}`}
                      >
                        <ArrowDownRight size={16} />
                        <span>Dependents</span>
                      </button>
                    </div>
                    
                    {/* Back button */}
                    <button
                      onClick={() => {
                        setSelectedNode(null);
                        setDisplayMode('list');
                      }}
                      className="absolute top-4 left-4 z-10 flex items-center space-x-1 px-3 py-1 bg-gray-800 bg-opacity-80 rounded-md shadow-md"
                    >
                      <X size={16} />
                      <span>Close</span>
                    </button>
                  
                    <Graph 
                      data={getFilteredGraphData()} 
                      width={800} 
                      height={700} 
                      autoLayout="circular"
                      nodeSizeScale={1}
                      theme={theme}
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Select a node from the list to visualize its dependencies
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Node details if a node is selected */}
              {selectedNode && (
                <div className={`mt-4 p-4 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedNode.title}
                    <span className={`ml-2 text-sm px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {selectedNode.type}
                    </span>
                  </h3>
                  
                  {selectedNode.sections && selectedNode.sections.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Sections:</h4>
                      <ul className={`space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedNode.sections.map(section => (
                          <li key={section.id} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="font-medium">{section.name}</div>
                            <div className="text-sm pl-4 mt-1">
                              Items: {section.items.length}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-1">Metadata:</h4>
                      <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {Object.entries(selectedNode.metadata).map(([key, value]) => (
                          typeof value !== 'object' ? (
                            <div key={key} className="grid grid-cols-3 gap-2 text-sm">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{key}:</span>
                              <span className="col-span-2">{String(value)}</span>
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Info modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4">About Graph UI Library</h2>
            <p className="mb-4">
              This library provides interactive visualization of different project structures including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>React/TypeScript Projects</strong> - Components, hooks, and their relationships</li>
              <li><strong>Java Projects</strong> - Classes, interfaces, and their inheritance/dependency structure</li>
              <li><strong>Django Projects</strong> - Models, views, and app structure</li>
            </ul>
            <p className="mb-4">
              The focused view shows only a selected node and its direct connections, making it easier to understand specific dependencies.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowInfo(false)}
                className={`px-4 py-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;