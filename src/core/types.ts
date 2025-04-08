// src/core/types.ts

/**
 * Represents a detected project type
 */
export interface ProjectType {
    /** Unique identifier for the project type */
    id: string;
    
    /** Human-readable name of the project type */
    name: string;
    
    /** Language associated with the project type */
    language: string;
    
    /** Root directory of the project */
    rootPath: string;
    
    /** Any additional project-specific metadata */
    metadata?: Record<string, any>;
}

/**
 * Represents a dependency in the project
 */
export interface Dependency {
    /** Unique identifier/name of the dependency */
    name: string;
    
    /** Source file path */
    sourceFile: string;
    
    /** Whether this is a class (as opposed to a package, module, etc.) */
    isClass: boolean;
    
    /** Whether this is a package */
    isPackage: boolean;
    
    /** Whether this is abstract */
    isAbstract: boolean;
    
    /** Whether this is an interface */
    isInterface: boolean;
    
    /** Whether this is final */
    isFinal: boolean;
    
    /** Child elements */
    elements: Dependency[];
    
    /** Fields (for classes) */
    fields: Field[];
    
    /** Methods (for classes) */
    methods: Method[];
    
    /** Outgoing dependencies (things this depends on) */
    outgoingDependencies: string[];
    
    /** Incoming dependencies (things that depend on this) */
    incomingDependencies: string[];
    
    /** Parent classes */
    superClasses: string[];
    
    /** Implemented interfaces */
    interfaces: string[];
    
    /** Imported packages */
    imports: string[];
}

/**
 * Represents a field in a class
 */
export interface Field {
    /** Field name */
    name: string;
    
    /** Field type */
    type: string;
    
    /** Whether this is static */
    isStatic: boolean;
    
    /** Whether this is final */
    isFinal: boolean;
    
    /** Access modifier (public, private, etc.) */
    accessModifier: string;
}

/**
 * Represents a method in a class
 */
export interface Method {
    /** Method name */
    name: string;
    
    /** Return type */
    returnType: string;
    
    /** Method parameters */
    parameters: string[];
    
    /** Whether this is static */
    isStatic: boolean;
    
    /** Whether this is final */
    isFinal: boolean;
    
    /** Whether this is abstract */
    isAbstract: boolean;
    
    /** Access modifier (public, private, etc.) */
    accessModifier: string;
}

/**
 * Complete project dependency tree
 */
export interface DependencyTree {
    /** Root of the dependency tree */
    root: Dependency;
    
    /** Project type information */
    projectType: ProjectType;
    
    /** When the tree was generated */
    generatedAt: Date;
}