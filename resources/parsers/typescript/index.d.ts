interface ComponentInfo {
    name: string;
    filePath: string;
    props: PropInfo[];
    state: StateInfo[];
    hooks: HookInfo[];
    dependencies: DependencyInfo[];
    children: string[];
}
interface PropInfo {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
}
interface StateInfo {
    name: string;
    type: string;
    initialValue?: string;
}
interface HookInfo {
    type: string;
    dependencies?: string[];
    customHook?: boolean;
}
interface DependencyInfo {
    name: string;
    path: string;
    isExternal: boolean;
}
interface ProjectStructure {
    components: {
        [key: string]: ComponentInfo;
    };
    entryPoints: string[];
    relationships: {
        parentChild: {
            [parent: string]: string[];
        };
        imports: {
            [component: string]: string[];
        };
    };
}
declare class ReactComponentAnalyzer {
    private projectRoot;
    private projectStructure;
    private readonly extensions;
    constructor(projectRoot: string);
    /**
     * Start analysis process
     */
    analyze(): Promise<ProjectStructure>;
    /**
     * Find all potential React component files in the project
     */
    private findComponentFiles;
    /**
     * Analyze a single file to extract component information
     */
    private analyzeFile;
    /**
     * Extract component information from an AST
     */
    private extractComponentInfo;
    /**
     * Check if a node represents a React component
     */
    private isReactComponent;
    /**
     * Check if a node represents a React class component
     */
    private isReactClassComponent;
    /**
     * Create a component info object from a node
     */
    private createComponentInfo;
    /**
     * Extract props information from a component node
     */
    private extractProps;
    /**
     * Extract state information from a component node
     */
    private extractState;
    /**
     * Process import declarations to track dependencies
     */
    private processImport;
    /**
     * Process JSX elements to find child components
     */
    private processJSXElement;
    /**
     * Process React hooks in function components
     */
    private processHooks;
    /**
     * Find the state variable name from a useState call destructuring
     */
    private findStateVariableName;
    /**
     * Try to infer the type of a state from useState initialization
     */
    private inferTypeFromSetState;
    /**
     * Get a string representation of a value node
     */
    private getStringifiedValue;
    /**
     * Get a type string from a TypeScript type annotation
     */
    private getTypeFromAnnotation;
    /**
     * Build relationships between components based on collected data
     */
    private buildRelationships;
    /**
     * Generate output JSON file
     */
    generateOutput(outputPath?: string): void;
}
export { ReactComponentAnalyzer, ProjectStructure };
