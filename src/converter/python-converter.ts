// src/converter/python-converter.ts

import { Graph, Node, Edge, Section, Item } from './types';
import { generateId, createSection, createItem, determineNodeType } from './utils';

interface PythonField {
  name: string;
  type: string;
  attributes: Record<string, any>;
}

interface PythonMethod {
  name: string;
  parameters: string[];
  returns?: string;
  is_static?: boolean;
  is_classmethod?: boolean;
  is_abstract?: boolean;
}

interface PythonRelationship {
  field_name: string;
  type: string;
  related_model: string;
  related_name: string | null;
}

interface PythonModel {
  name: string;
  module: string;
  fields: PythonField[];
  methods: PythonMethod[];
  meta: Record<string, any>;
  relationships: PythonRelationship[];
  bases?: string[];
  file_path?: string;
}

interface PythonModule {
  name: string;
  path: string;
  is_package: boolean;
  exports: string[];
  imports: {
    module: string;
    names: string[];
  }[];
}

interface PythonDependencies {
  metadata: {
    projectName: string;
    totalModules: number;
    totalModels: number;
    analyzedAt: string;
    python: {
      version: string;
    };
  };
  modules: PythonModule[];
  models: PythonModel[];
}

export function convertPythonDependencies(pythonDependencies: PythonDependencies | any): Graph {
  // Check if this is a Django format (which has specific structure)
  if (pythonDependencies.apps && pythonDependencies.models && pythonDependencies.views) {
    return convertDjangoDependencies(pythonDependencies);
  }
  
  // Regular Python project
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeMap = new Map<string, string>();
  
  // Process modules first
  if (pythonDependencies.modules) {
    pythonDependencies.modules.forEach((module: PythonModule) => {
      const nodeId = generateId('python_module', module.name);
      nodeMap.set(module.name, nodeId);
      
      const sections: Section[] = [];
      
      // Add imports section
      if (module.imports && module.imports.length > 0) {
        const importItems = module.imports.map(imp => {
          return createItem(
            generateId('import', `${module.name}_${imp.module}`),
            `from ${imp.module} import ${imp.names.join(', ')}`,
            'import'
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_imports`),
          'Imports',
          importItems
        ));
      }
      
      // Add exports section
      if (module.exports && module.exports.length > 0) {
        const exportItems = module.exports.map(exp => {
          return createItem(
            generateId('export', `${module.name}_${exp}`),
            exp,
            'export'
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_exports`),
          'Exports',
          exportItems
        ));
      }
      
      nodes.push({
        id: nodeId,
        title: module.name,
        type: module.is_package ? 'package' : 'module',
        sections,
        metadata: {
          path: module.path,
          is_package: module.is_package
        }
      });
    });
  }
  
  // Process models
  if (pythonDependencies.models) {
    pythonDependencies.models.forEach((model: PythonModel) => {
      const nodeId = generateId('python_model', model.name);
      nodeMap.set(model.name, nodeId);
      
      const sections: Section[] = [];
      
      // Class inheritance info
      if (model.bases && model.bases.length > 0) {
        const baseItems = model.bases.map(base => {
          return createItem(
            generateId('base', `${model.name}_${base}`),
            base,
            'inheritance'
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_bases`),
          'Inheritance',
          baseItems
        ));
      }
      
      // Add fields section
      if (model.fields && model.fields.length > 0) {
        const fieldItems = model.fields.map(field => {
          const attributesStr = Object.entries(field.attributes || {})
            .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
            .join(', ');
          
          return createItem(
            generateId('field', `${model.name}_${field.name}`),
            `${field.name}: ${field.type}${attributesStr ? ` (${attributesStr})` : ''}`,
            'field',
            field.attributes
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_fields`),
          'Fields',
          fieldItems
        ));
      }
      
      // Add methods section
      if (model.methods && model.methods.length > 0) {
        const methodItems = model.methods.map(method => {
          const modifiers: string[] = [];
          if (method.is_static) modifiers.push('staticmethod');
          if (method.is_classmethod) modifiers.push('classmethod');
          if (method.is_abstract) modifiers.push('abstractmethod');
          
          const params = method.parameters.join(', ');
          const returns = method.returns ? ` -> ${method.returns}` : '';
          
          return createItem(
            generateId('method', `${model.name}_${method.name}`),
            `${modifiers.length > 0 ? '@' + modifiers.join(' @') + ' ' : ''}${method.name}(${params})${returns}`,
            'method'
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_methods`),
          'Methods',
          methodItems
        ));
      }
      
      // Add relationships section
      if (model.relationships && model.relationships.length > 0) {
        const relationshipItems = model.relationships.map(rel => {
          const relName = rel.related_name ? ` (as ${rel.related_name})` : '';
          
          return createItem(
            generateId('rel', `${model.name}_${rel.field_name}`),
            `${rel.field_name} → ${rel.related_model}${relName} (${rel.type})`,
            'relationship',
            { 
              type: rel.type,
              related_model: rel.related_model,
              related_name: rel.related_name
            }
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_relationships`),
          'Relationships',
          relationshipItems
        ));
      }
      
      nodes.push({
        id: nodeId,
        title: model.name,
        type: 'class',
        sections,
        metadata: {
          module: model.module,
          file_path: model.file_path,
          meta: model.meta,
          bases: model.bases
        }
      });
      
      // Add edge from module to model
      const moduleNodeId = nodeMap.get(model.module);
      if (moduleNodeId) {
        edges.push({
          source: moduleNodeId,
          target: nodeId,
          type: 'contains',
          metadata: {
            relationship: 'module_class'
          }
        });
      }
    });
  }
  
  // Create inheritance edges
  if (pythonDependencies.models) {
    pythonDependencies.models.forEach((model: PythonModel) => {
      if (!model.bases) return;
      
      const sourceNodeId = nodeMap.get(model.name);
      if (!sourceNodeId) return;
      
      model.bases.forEach(base => {
        const targetNodeId = nodeMap.get(base);
        if (targetNodeId) {
          edges.push({
            source: sourceNodeId,
            target: targetNodeId,
            type: 'inheritance',
            metadata: {
              relationship: 'extends'
            }
          });
        }
      });
    });
  }
  
  // Create relationship edges
  if (pythonDependencies.models) {
    pythonDependencies.models.forEach((model: PythonModel) => {
      if (!model.relationships) return;
      
      const sourceNodeId = nodeMap.get(model.name);
      if (!sourceNodeId) return;
      
      model.relationships.forEach(rel => {
        const targetNodeId = nodeMap.get(rel.related_model);
        if (targetNodeId) {
          edges.push({
            source: sourceNodeId,
            target: targetNodeId,
            type: rel.type.toLowerCase(),
            metadata: {
              field_name: rel.field_name,
              related_name: rel.related_name
            }
          });
        }
      });
    });
  }
  
  return {
    nodes,
    edges,
    metadata: {
      projectType: 'python',
      projectName: pythonDependencies.metadata?.projectName || 'Python Project',
      convertedAt: new Date().toISOString(),
      originalFormat: pythonDependencies.metadata || {}
    }
  };
}

function convertDjangoDependencies(djangoDependencies: any): Graph {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeMap = new Map<string, string>(); // Maps model/view names to node IDs
  
  // Create app nodes
  djangoDependencies.apps.forEach((app: any) => {
    const nodeId = generateId('django_app', app.name);
    nodeMap.set(`app_${app.name}`, nodeId);
    
    nodes.push({
      id: nodeId,
      title: app.name,
      type: 'app',
      sections: [
        createSection(
          generateId('sec', `${nodeId}_info`),
          'App Info',
          [
            createItem(
              generateId('path', `${app.name}_path`),
              `Path: ${app.path}`,
              'path'
            ),
            createItem(
              generateId('project_app', `${app.name}_project_app`),
              `Project app: ${app.is_project_app}`,
              'info'
            )
          ]
        )
      ],
      metadata: {
        path: app.path,
        is_project_app: app.is_project_app,
        note: app.note
      }
    });
  });
  
  // Create model nodes
  djangoDependencies.models.forEach((model: any) => {
    const nodeId = generateId('django_model', `${model.app}_${model.name}`);
    nodeMap.set(`model_${model.name}`, nodeId);
    
    const sections: Section[] = [];
    
    // Create fields section
    if (model.fields && model.fields.length > 0) {
      const fieldItems = model.fields.map((field: any) => {
        const attributesStr = Object.entries(field.attributes || {})
          .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
          .join(', ');
        
        return createItem(
          generateId('field', `${model.name}_${field.name}`),
          `${field.name}: ${field.type}${attributesStr ? ` (${attributesStr})` : ''}`,
          'field',
          field.attributes
        );
      });
      
      sections.push(createSection(
        generateId('sec', `${nodeId}_fields`),
        'Fields',
        fieldItems
      ));
    }
    
    // Create methods section
    if (model.methods && model.methods.length > 0) {
      const methodItems = model.methods.map((method: any) => {
        return createItem(
          generateId('method', `${model.name}_${method.name}`),
          `${method.name}(${method.parameters.join(', ')})`,
          'method'
        );
      });
      
      sections.push(createSection(
        generateId('sec', `${nodeId}_methods`),
        'Methods',
        methodItems
      ));
    }
    
    // Create relationships section
    if (model.relationships && model.relationships.length > 0) {
      const relationshipItems = model.relationships.map((rel: any) => {
        const relName = rel.related_name ? ` (as ${rel.related_name})` : '';
        
        return createItem(
          generateId('rel', `${model.name}_${rel.field_name}`),
          `${rel.field_name} → ${rel.related_model}${relName} (${rel.type})`,
          'relationship',
          { 
            type: rel.type,
            related_model: rel.related_model,
            related_name: rel.related_name
          }
        );
      });
      
      sections.push(createSection(
        generateId('sec', `${nodeId}_relationships`),
        'Relationships',
        relationshipItems
      ));
    }
    
    nodes.push({
      id: nodeId,
      title: model.name,
      type: 'model',
      sections,
      metadata: {
        app: model.app,
        meta: model.meta
      }
    });
    
    // Add edge from app to model
    const appNodeId = nodeMap.get(`app_${model.app}`);
    if (appNodeId) {
      edges.push({
        source: appNodeId,
        target: nodeId,
        type: 'contains',
        metadata: {
          relationship: 'app_model'
        }
      });
    }
  });
  
  // Create view nodes if they exist
  if (djangoDependencies.views) {
    djangoDependencies.views.forEach((view: any) => {
      const nodeId = generateId('django_view', `${view.app}_${view.name}`);
      nodeMap.set(`view_${view.name}`, nodeId);
      
      const sections: Section[] = [];
      
      // Create view info section
      const infoItems: Item[] = [
        createItem(
          generateId('type', `${view.name}_type`),
          `Type: ${view.type}`,
          'info'
        )
      ];
      
      if (view.path) {
        infoItems.push(createItem(
          generateId('path', `${view.name}_path`),
          `Path: ${view.path}`,
          'path'
        ));
      }
      
      if (view.http_methods && view.http_methods.length > 0) {
        infoItems.push(createItem(
          generateId('methods', `${view.name}_http_methods`),
          `HTTP Methods: ${view.http_methods.join(', ')}`,
          'method'
        ));
      }
      
      if (view.template) {
        infoItems.push(createItem(
          generateId('template', `${view.name}_template`),
          `Template: ${view.template}`,
          'template'
        ));
      }
      
      sections.push(createSection(
        generateId('sec', `${nodeId}_info`),
        'View Info',
        infoItems
      ));
      
      // Add model usages
      if (view.uses_models && view.uses_models.length > 0) {
        const modelItems = view.uses_models.map((model: string) => {
          return createItem(
            generateId('uses', `${view.name}_uses_${model}`),
            model,
            'model'
          );
        });
        
        sections.push(createSection(
          generateId('sec', `${nodeId}_models`),
          'Uses Models',
          modelItems
        ));
      }
      
      nodes.push({
        id: nodeId,
        title: view.name,
        type: 'view',
        sections,
        metadata: {
          app: view.app,
          type: view.type,
          path: view.path,
          http_methods: view.http_methods,
          template: view.template
        }
      });
      
      // Add edge from app to view
      const appNodeId = nodeMap.get(`app_${view.app}`);
      if (appNodeId) {
        edges.push({
          source: appNodeId,
          target: nodeId,
          type: 'contains',
          metadata: {
            relationship: 'app_view'
          }
        });
      }
      
      // Add edges from view to models
      if (view.uses_models) {
        view.uses_models.forEach((model: string) => {
          const modelNodeId = nodeMap.get(`model_${model}`);
          if (modelNodeId) {
            edges.push({
              source: nodeId,
              target: modelNodeId,
              type: 'uses',
              metadata: {
                relationship: 'view_model'
              }
            });
          }
        });
      }
    });
  }
  
  // Create edges for model relationships
  if (djangoDependencies.models) {
    djangoDependencies.models.forEach((model: any) => {
      if (!model.relationships) return;
      
      const sourceNodeId = nodeMap.get(`model_${model.name}`);
      if (!sourceNodeId) return;
      
      model.relationships.forEach((rel: any) => {
        const targetNodeId = nodeMap.get(`model_${rel.related_model}`);
        
        if (targetNodeId) {
          edges.push({
            source: sourceNodeId,
            target: targetNodeId,
            type: rel.type.toLowerCase(),
            metadata: {
              field_name: rel.field_name,
              related_name: rel.related_name
            }
          });
        }
      });
    });
  }
  
  return {
    nodes,
    edges,
    metadata: {
      projectType: 'django',
      projectName: djangoDependencies.metadata?.projectName || 'Django Project',
      convertedAt: new Date().toISOString(),
      originalFormat: djangoDependencies.metadata || {}
    }
  };
}