"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactComponentAnalyzer = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ts = __importStar(require("typescript"));
const parser = __importStar(require("@typescript-eslint/parser"));
const traverse = __importStar(require("@babel/traverse"));
const glob_1 = require("glob");
class ReactComponentAnalyzer {
    constructor(projectRoot) {
        this.extensions = ['.tsx', '.jsx', '.ts', '.js'];
        this.projectRoot = path.resolve(projectRoot);
        this.projectStructure = {
            components: {},
            entryPoints: [],
            relationships: {
                parentChild: {},
                imports: {},
            },
        };
    }
    /**
     * Start analysis process
     */
    async analyze() {
        try {
            // Find all React component files
            const files = await this.findComponentFiles();
            // Analyze each file
            for (const file of files) {
                await this.analyzeFile(file);
            }
            // Build relationships between components
            this.buildRelationships();
            return this.projectStructure;
        }
        catch (error) {
            console.error('Error analyzing React project:', error);
            throw error;
        }
    }
    /**
     * Find all potential React component files in the project
     */
    async findComponentFiles() {
        const patterns = this.extensions.map(ext => `${this.projectRoot}/**/*${ext}`);
        const files = await (0, glob_1.glob)(patterns, {
            ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/*.test.*', '**/*.spec.*']
        });
        return files;
    }
    /**
     * Analyze a single file to extract component information
     */
    async analyzeFile(filePath) {
        // Read file content
        const content = fs.readFileSync(filePath, 'utf-8');
        // Parse the file using TypeScript parser
        const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
        // Parse the file with ESLint parser to get AST
        const parserOptions = {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
            project: './tsconfig.json',
        };
        try {
            const ast = parser.parse(content, parserOptions);
            // Extract component information from AST
            this.extractComponentInfo(ast, filePath);
        }
        catch (error) {
            console.warn(`Error parsing file ${filePath}:`, error);
        }
    }
    /**
     * Extract component information from an AST
     */
    extractComponentInfo(ast, filePath) {
        // Track components found in this file
        const componentsInFile = [];
        // Use Babel traverse to walk the AST
        traverse.default(ast, {
            // Function component declarations
            FunctionDeclaration: (path) => {
                const node = path.node;
                if (node.id && this.isReactComponent(node)) {
                    const componentName = node.id.name;
                    componentsInFile.push(componentName);
                    const componentInfo = this.createComponentInfo(componentName, filePath, node);
                    this.projectStructure.components[componentName] = componentInfo;
                }
            },
            // Arrow function components
            VariableDeclarator: (path) => {
                const node = path.node;
                if (node.id && node.init && this.isReactComponent(node.init)) {
                    if (node.id.type === 'Identifier') {
                        const componentName = node.id.name;
                        componentsInFile.push(componentName);
                        const componentInfo = this.createComponentInfo(componentName, filePath, node.init);
                        this.projectStructure.components[componentName] = componentInfo;
                    }
                }
            },
            // Class components
            ClassDeclaration: (path) => {
                const node = path.node;
                if (node.id && this.isReactClassComponent(node)) {
                    const componentName = node.id.name;
                    componentsInFile.push(componentName);
                    const componentInfo = this.createComponentInfo(componentName, filePath, node);
                    this.projectStructure.components[componentName] = componentInfo;
                }
            },
            // Import declarations to track dependencies
            ImportDeclaration: (path) => {
                const node = path.node;
                this.processImport(node, filePath, componentsInFile);
            },
            // JSX elements to find child components
            JSXElement: (path) => {
                const node = path.node;
                this.processJSXElement(node, componentsInFile);
            },
            // React hooks
            CallExpression: (path) => {
                const node = path.node;
                this.processHooks(node, componentsInFile);
            }
        });
    }
    /**
     * Check if a node represents a React component
     */
    isReactComponent(node) {
        // Check if the function returns JSX
        // This is a simplified check - in a real implementation, would need to walk the AST
        return node && ((node.body && node.body.type === 'JSXElement') ||
            (node.body && node.body.body && node.body.body.some((stmt) => stmt.type === 'ReturnStatement' &&
                stmt.argument &&
                (stmt.argument.type === 'JSXElement' || stmt.argument.type === 'JSXFragment'))));
    }
    /**
     * Check if a node represents a React class component
     */
    isReactClassComponent(node) {
        // Check if it extends React.Component or Component
        if (!node.superClass)
            return false;
        const superClass = node.superClass;
        return ((superClass.type === 'MemberExpression' &&
            superClass.object.name === 'React' &&
            superClass.property.name === 'Component') ||
            (superClass.type === 'Identifier' &&
                superClass.name === 'Component'));
    }
    /**
     * Create a component info object from a node
     */
    createComponentInfo(name, filePath, node) {
        const relativeFilePath = path.relative(this.projectRoot, filePath);
        const componentInfo = {
            name,
            filePath: relativeFilePath,
            props: this.extractProps(node),
            state: this.extractState(node),
            hooks: [],
            dependencies: [],
            children: [],
        };
        return componentInfo;
    }
    /**
     * Extract props information from a component node
     */
    extractProps(node) {
        const props = [];
        // Function component props (parameter destructuring)
        if (node.params && node.params[0]) {
            const propsParam = node.params[0];
            // For TypeScript prop type (interface or type)
            if (propsParam.typeAnnotation) {
                const typeNode = propsParam.typeAnnotation.typeAnnotation;
                if (typeNode.type === 'TSTypeLiteral') {
                    typeNode.members.forEach((member) => {
                        if (member.key && member.key.name) {
                            props.push({
                                name: member.key.name,
                                type: this.getTypeFromAnnotation(member.typeAnnotation),
                                required: !member.optional,
                            });
                        }
                    });
                }
                else if (typeNode.type === 'TSTypeReference' && typeNode.typeName) {
                    // Reference to a defined interface/type
                    props.push({
                        name: 'props',
                        type: typeNode.typeName.name,
                        required: true
                    });
                }
            }
            // For destructured props
            if (propsParam.type === 'ObjectPattern') {
                propsParam.properties.forEach((property) => {
                    if (property.key && property.key.name) {
                        props.push({
                            name: property.key.name,
                            type: property.value.typeAnnotation ?
                                this.getTypeFromAnnotation(property.value.typeAnnotation) : 'any',
                            required: !property.optional,
                        });
                    }
                });
            }
        }
        // Class component props
        if (node.type === 'ClassDeclaration') {
            // Look for propTypes static property
            node.body.body.forEach((classElement) => {
                if (classElement.type === 'ClassProperty' &&
                    classElement.static &&
                    classElement.key.name === 'propTypes') {
                    // Extract from propTypes
                    if (classElement.value && classElement.value.type === 'ObjectExpression') {
                        classElement.value.properties.forEach((prop) => {
                            if (prop.key && prop.key.name) {
                                props.push({
                                    name: prop.key.name,
                                    type: 'PropTypes', // Simplified, would need more analysis
                                    required: prop.value.type === 'MemberExpression' &&
                                        prop.value.property.name === 'isRequired',
                                });
                            }
                        });
                    }
                }
            });
        }
        return props;
    }
    /**
     * Extract state information from a component node
     */
    extractState(node) {
        const states = [];
        // Class component state
        if (node.type === 'ClassDeclaration') {
            node.body.body.forEach((classElement) => {
                if (classElement.type === 'ClassProperty' &&
                    !classElement.static &&
                    classElement.key.name === 'state') {
                    // Extract from state object initialization
                    if (classElement.value && classElement.value.type === 'ObjectExpression') {
                        classElement.value.properties.forEach((prop) => {
                            if (prop.key && prop.key.name) {
                                states.push({
                                    name: prop.key.name,
                                    type: 'any', // Without TypeScript definitions, we can't know
                                    initialValue: this.getStringifiedValue(prop.value),
                                });
                            }
                        });
                    }
                }
            });
        }
        // Function component state via useState is handled in processHooks
        return states;
    }
    /**
     * Process import declarations to track dependencies
     */
    processImport(node, filePath, componentsInFile) {
        const source = node.source.value;
        const isExternal = !source.startsWith('.') && !source.startsWith('/');
        node.specifiers.forEach((specifier) => {
            if (specifier.type === 'ImportSpecifier' || specifier.type === 'ImportDefaultSpecifier') {
                const importedName = specifier.local.name;
                // For each component in this file, add this import as a dependency
                componentsInFile.forEach(componentName => {
                    if (!this.projectStructure.components[componentName]) {
                        this.projectStructure.components[componentName] = {
                            name: componentName,
                            filePath: path.relative(this.projectRoot, filePath),
                            props: [],
                            state: [],
                            hooks: [],
                            dependencies: [],
                            children: [],
                        };
                    }
                    this.projectStructure.components[componentName].dependencies.push({
                        name: importedName,
                        path: source,
                        isExternal,
                    });
                });
            }
        });
    }
    /**
     * Process JSX elements to find child components
     */
    processJSXElement(node, componentsInFile) {
        if (!node.openingElement || !node.openingElement.name)
            return;
        const elementName = node.openingElement.name.name;
        // Only consider capitalized names as potential components
        if (elementName && elementName[0] && elementName[0] === elementName[0].toUpperCase()) {
            componentsInFile.forEach(componentName => {
                if (!this.projectStructure.components[componentName].children.includes(elementName)) {
                    this.projectStructure.components[componentName].children.push(elementName);
                }
            });
        }
        // Recurse into children
        if (node.children && node.children.length) {
            node.children.forEach((child) => {
                if (child.type === 'JSXElement') {
                    this.processJSXElement(child, componentsInFile);
                }
            });
        }
    }
    /**
     * Process React hooks in function components
     */
    processHooks(node, componentsInFile) {
        if (node.callee && node.callee.type === 'Identifier') {
            const hookName = node.callee.name;
            // Check if this is a hook call (starts with 'use')
            if (hookName.startsWith('use')) {
                const hookInfo = {
                    type: hookName,
                    customHook: !['useState', 'useEffect', 'useContext', 'useReducer', 'useCallback',
                        'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect',
                        'useDebugValue'].includes(hookName),
                };
                // For useEffect and useMemo, get dependencies
                if ((hookName === 'useEffect' || hookName === 'useMemo' || hookName === 'useCallback') &&
                    node.arguments && node.arguments[1]) {
                    const depsArg = node.arguments[1];
                    if (depsArg.type === 'ArrayExpression') {
                        hookInfo.dependencies = depsArg.elements
                            .filter((el) => el && el.type === 'Identifier')
                            .map((el) => el.name);
                    }
                }
                // For useState, track state name and type
                if (hookName === 'useState' && componentsInFile.length > 0) {
                    const stateVarName = this.findStateVariableName(node);
                    if (stateVarName) {
                        const stateInfo = {
                            name: stateVarName,
                            type: this.inferTypeFromSetState(node),
                            initialValue: node.arguments && node.arguments[0] ?
                                this.getStringifiedValue(node.arguments[0]) : undefined,
                        };
                        // Add state info to each component in this file
                        componentsInFile.forEach(componentName => {
                            if (this.projectStructure.components[componentName]) {
                                this.projectStructure.components[componentName].state.push(stateInfo);
                            }
                        });
                    }
                }
                // Add hook info to each component in this file
                componentsInFile.forEach(componentName => {
                    if (this.projectStructure.components[componentName]) {
                        this.projectStructure.components[componentName].hooks.push(hookInfo);
                    }
                });
            }
        }
    }
    /**
     * Find the state variable name from a useState call destructuring
     */
    findStateVariableName(node) {
        // Look for parent VariableDeclarator node
        let current = node;
        while (current && current.type !== 'VariableDeclarator') {
            current = current.parent;
        }
        if (current && current.id && current.id.type === 'ArrayPattern' &&
            current.id.elements && current.id.elements[0]) {
            return current.id.elements[0].name;
        }
        return undefined;
    }
    /**
     * Try to infer the type of a state from useState initialization
     */
    inferTypeFromSetState(node) {
        if (!node.arguments || !node.arguments[0])
            return 'any';
        const initializer = node.arguments[0];
        switch (initializer.type) {
            case 'StringLiteral':
                return 'string';
            case 'NumericLiteral':
                return 'number';
            case 'BooleanLiteral':
                return 'boolean';
            case 'ArrayExpression':
                return 'array';
            case 'ObjectExpression':
                return 'object';
            case 'NullLiteral':
                return 'null';
            case 'Identifier':
                return initializer.name;
            default:
                return 'any';
        }
    }
    /**
     * Get a string representation of a value node
     */
    getStringifiedValue(valueNode) {
        if (!valueNode)
            return undefined;
        switch (valueNode.type) {
            case 'StringLiteral':
                return `"${valueNode.value}"`;
            case 'NumericLiteral':
                return valueNode.value.toString();
            case 'BooleanLiteral':
                return valueNode.value.toString();
            case 'NullLiteral':
                return 'null';
            case 'ArrayExpression':
                return '[]';
            case 'ObjectExpression':
                return '{}';
            default:
                return undefined;
        }
    }
    /**
     * Get a type string from a TypeScript type annotation
     */
    getTypeFromAnnotation(annotation) {
        if (!annotation || !annotation.typeAnnotation)
            return 'any';
        const typeNode = annotation.typeAnnotation;
        switch (typeNode.type) {
            case 'TSStringKeyword':
                return 'string';
            case 'TSNumberKeyword':
                return 'number';
            case 'TSBooleanKeyword':
                return 'boolean';
            case 'TSArrayType':
                return `Array<${this.getTypeFromAnnotation({ typeAnnotation: typeNode.elementType })}>`;
            case 'TSTypeReference':
                return typeNode.typeName.name;
            case 'TSUnionType':
                return typeNode.types.map((t) => this.getTypeFromAnnotation({ typeAnnotation: t })).join(' | ');
            case 'TSLiteralType':
                if (typeNode.literal.type === 'StringLiteral') {
                    return `"${typeNode.literal.value}"`;
                }
                else if (typeNode.literal.type === 'NumericLiteral') {
                    return typeNode.literal.value.toString();
                }
                return 'literal';
            default:
                return 'any';
        }
    }
    /**
     * Build relationships between components based on collected data
     */
    buildRelationships() {
        // Build parent-child relationships
        Object.keys(this.projectStructure.components).forEach(componentName => {
            const component = this.projectStructure.components[componentName];
            component.children.forEach(childName => {
                if (!this.projectStructure.relationships.parentChild[componentName]) {
                    this.projectStructure.relationships.parentChild[componentName] = [];
                }
                if (!this.projectStructure.relationships.parentChild[componentName].includes(childName)) {
                    this.projectStructure.relationships.parentChild[componentName].push(childName);
                }
            });
            // Build import relationships
            component.dependencies.forEach(dependency => {
                if (!dependency.isExternal && !dependency.path.includes('node_modules')) {
                    if (!this.projectStructure.relationships.imports[componentName]) {
                        this.projectStructure.relationships.imports[componentName] = [];
                    }
                    if (!this.projectStructure.relationships.imports[componentName].includes(dependency.name)) {
                        this.projectStructure.relationships.imports[componentName].push(dependency.name);
                    }
                }
            });
        });
        // Find entry points (components that are not children of any other component)
        const allChildren = new Set();
        Object.values(this.projectStructure.relationships.parentChild).forEach(children => {
            children.forEach(child => allChildren.add(child));
        });
        this.projectStructure.entryPoints = Object.keys(this.projectStructure.components)
            .filter(component => !allChildren.has(component));
    }
    /**
     * Generate output JSON file
     */
    generateOutput(outputPath = './react-project-analysis.json') {
        const outputFilePath = path.resolve(outputPath);
        fs.writeFileSync(outputFilePath, JSON.stringify(this.projectStructure, null, 2));
        console.log(`Analysis complete! Output written to ${outputFilePath}`);
    }
}
exports.ReactComponentAnalyzer = ReactComponentAnalyzer;
/**
 * CLI entry point
 */
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: node react-analyzer.js <path-to-react-project-src-dir> [output-path]');
        process.exit(1);
    }
    const projectPath = args[0];
    const outputPath = args[1] || './react-project-analysis.json';
    try {
        const analyzer = new ReactComponentAnalyzer(projectPath);
        await analyzer.analyze();
        analyzer.generateOutput(outputPath);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
// Execute main function if this file is run directly
if (require.main === module) {
    main();
}
