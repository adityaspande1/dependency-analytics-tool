/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1), exports);


/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
// src/core/extension.ts
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const fs = __importStar(__webpack_require__(4));
const project_detector_1 = __webpack_require__(5);
const parser_registry_1 = __webpack_require__(8);
const java_1 = __webpack_require__(9);
const typescript_1 = __webpack_require__(27);
const dependency_tree_1 = __webpack_require__(14);
const structure_tree_1 = __webpack_require__(15);
const mermaid_generator_1 = __webpack_require__(18);
const utils_1 = __webpack_require__(19);
const converter_1 = __webpack_require__(22);
function activate(context) {
    console.log('Dependency Analytics Extension is now active');
    // Create output channel for logs
    const outputChannel = vscode.window.createOutputChannel('Dependency Analytics');
    // Create tree view providers
    const dependencyTreeProvider = new dependency_tree_1.DependencyTreeProvider();
    const structureTreeProvider = new structure_tree_1.StructureTreeProvider();
    // Register tree data providers
    vscode.window.registerTreeDataProvider('dependencyView', dependencyTreeProvider);
    vscode.window.registerTreeDataProvider('classStructure', structureTreeProvider);
    // Create parser registry and register parsers
    const parserRegistry = new parser_registry_1.ParserRegistry();
    parserRegistry.registerParser(new java_1.JavaParser());
    // parserRegistry.registerParser(new PythonParser());
    parserRegistry.registerParser(new typescript_1.TypeScriptParser());
    // Create project detector
    const projectDetector = new project_detector_1.ProjectDetector();
    // Create diagram generator
    const diagramGenerator = new mermaid_generator_1.MermaidGenerator();
    // Store the current dependency graph
    let currentDependencyGraph = null;
    // Store all nodes for quick lookup
    let allNodes = [];
    // Check if dependencies.json exists in the workspace and load it
    async function loadExistingDependencies() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            return false;
        }
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        // First check for standardized dependencies (from previous run)
        const standardDepsPath = path.join(workspaceRoot, '.vscode', 'standard-dependencies.json');
        if (fs.existsSync(standardDepsPath)) {
            try {
                outputChannel.appendLine(`Loading existing standardized dependencies from ${standardDepsPath}`);
                const dependenciesData = utils_1.FileUtils.readJsonFile(standardDepsPath);
                if (dependenciesData) {
                    currentDependencyGraph = dependenciesData;
                    // Collect all nodes for reference
                    allNodes = currentDependencyGraph.nodes;
                    // Update the tree views
                    dependencyTreeProvider.setGraph(currentDependencyGraph);
                    outputChannel.appendLine(`Successfully loaded standardized dependencies with ${allNodes.length} nodes`);
                    return true;
                }
            }
            catch (error) {
                outputChannel.appendLine(`Error loading standardized dependencies: ${error}`);
            }
        }
        // If no standardized dependencies, check for language-specific dependencies
        const languageDepsPath = path.join(workspaceRoot, '.vscode', 'language-dependencies.json');
        if (fs.existsSync(languageDepsPath)) {
            try {
                outputChannel.appendLine(`Loading existing language-specific dependencies from ${languageDepsPath}`);
                const dependenciesData = utils_1.FileUtils.readJsonFile(languageDepsPath);
                if (dependenciesData) {
                    // Convert to standardized format
                    currentDependencyGraph = (0, converter_1.convertDependencies)(dependenciesData);
                    // Save the standardized format for future use
                    fs.writeFileSync(standardDepsPath, JSON.stringify(currentDependencyGraph, null, 2));
                    // Collect all nodes for reference
                    allNodes = currentDependencyGraph.nodes;
                    // Update the tree views
                    dependencyTreeProvider.setGraph(currentDependencyGraph);
                    outputChannel.appendLine(`Successfully converted and loaded dependencies with ${allNodes.length} nodes`);
                    return true;
                }
            }
            catch (error) {
                outputChannel.appendLine(`Error converting dependencies: ${error}`);
            }
        }
        // Finally, check for legacy java dependencies.json
        const javaDepsPath = path.join(workspaceRoot, '.vscode', 'dependencies.json');
        if (fs.existsSync(javaDepsPath)) {
            try {
                outputChannel.appendLine(`Loading legacy Java dependencies from ${javaDepsPath}`);
                const dependenciesData = utils_1.FileUtils.readJsonFile(javaDepsPath);
                if (dependenciesData) {
                    // Convert to standardized format
                    currentDependencyGraph = (0, converter_1.convertDependencies)(dependenciesData);
                    // Save the standardized format for future use
                    fs.writeFileSync(standardDepsPath, JSON.stringify(currentDependencyGraph, null, 2));
                    // Collect all nodes for reference
                    allNodes = currentDependencyGraph.nodes;
                    // Update the tree views
                    dependencyTreeProvider.setGraph(currentDependencyGraph);
                    outputChannel.appendLine(`Successfully converted and loaded legacy dependencies with ${allNodes.length} nodes`);
                    return true;
                }
            }
            catch (error) {
                outputChannel.appendLine(`Error converting legacy dependencies: ${error}`);
            }
        }
        return false;
    }
    // Start the analysis process
    async function startAnalysis() {
        // Check if dependencies already exist
        if (await loadExistingDependencies()) {
            vscode.window.showInformationMessage('Loaded existing dependency analysis.');
            return;
        }
        // Select the root folder
        const rootFolder = await projectDetector.selectRootFolder();
        if (!rootFolder) {
            vscode.window.showErrorMessage('No folder selected for analysis.');
            return;
        }
        // Detect the project type
        const projectType = await projectDetector.detectProjectType(rootFolder);
        if (!projectType) {
            vscode.window.showErrorMessage('Could not detect project type. Please make sure your project structure is supported.');
            return;
        }
        vscode.window.showInformationMessage(`Detected ${projectType.name} project. Analyzing dependencies...`);
        try {
            // Parse the project and get standardized graph
            currentDependencyGraph = await parserRegistry.parse(projectType);
            // Save the standardized graph
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders && workspaceFolders.length > 0) {
                const workspaceRoot = workspaceFolders[0].uri.fsPath;
                const outputDir = path.join(workspaceRoot, '.vscode');
                // Ensure output directory exists
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }
                const standardDepsPath = path.join(outputDir, 'standard-dependencies.json');
                fs.writeFileSync(standardDepsPath, JSON.stringify(currentDependencyGraph, null, 2));
            }
            // Collect all nodes for reference
            allNodes = currentDependencyGraph.nodes;
            // Update the tree views
            dependencyTreeProvider.setGraph(currentDependencyGraph);
            vscode.window.showInformationMessage('Dependency analysis completed successfully.');
        }
        catch (error) {
            outputChannel.appendLine(`Error analyzing dependencies: ${error}`);
            vscode.window.showErrorMessage(`Error analyzing dependencies: ${error}`);
        }
    }
    // Register commands
    context.subscriptions.push(
    // Start analysis command
    vscode.commands.registerCommand('dependencyAnalytics.startAnalysis', startAnalysis), 
    // Show node details command
    vscode.commands.registerCommand('dependencyAnalytics.showNodeDetails', (node) => {
        // Update the structure tree view
        structureTreeProvider.setNode(node);
    }), 
    // Show diagram command
    vscode.commands.registerCommand('dependencyAnalytics.showDiagram', async (node) => {
        if (!node) {
            vscode.window.showErrorMessage('Please select a node to show its diagram');
            return;
        }
        try {
            // First update the structure view
            structureTreeProvider.setNode(node);
            // Log to help debug
            outputChannel.appendLine(`Showing diagram for node: ${node.title}`);
            // Show the diagram
            await diagramGenerator.showDiagram(context, node, allNodes, 'mermaid');
        }
        catch (error) {
            outputChannel.appendLine(`Error showing diagram: ${error}`);
            vscode.window.showErrorMessage(`Error showing diagram: ${error}`);
        }
    }), 
    // Navigate to source command
    vscode.commands.registerCommand('dependencyAnalytics.navigateToSource', async (node) => {
        if (!node || !node.metadata?.sourceFile) {
            vscode.window.showErrorMessage('Source file information not available');
            return;
        }
        try {
            const sourceFile = node.metadata.sourceFile;
            // Find the source file
            const files = await vscode.workspace.findFiles(`**/${sourceFile}`);
            if (files.length === 0) {
                vscode.window.showErrorMessage(`File not found: ${sourceFile}`);
                return;
            }
            // Open the document
            const document = await vscode.workspace.openTextDocument(files[0]);
            await vscode.window.showTextDocument(document);
        }
        catch (error) {
            outputChannel.appendLine(`Error navigating to source: ${error}`);
            vscode.window.showErrorMessage(`Error navigating to source: ${error}`);
        }
    }), 
    // Refresh analysis command
    vscode.commands.registerCommand('dependencyAnalytics.refreshAnalysis', startAnalysis));
    // Set up file watcher to refresh analysis when files change
    const fileWatcher = vscode.workspace.createFileSystemWatcher('/*.{java,py,ts,js}');
    // Debounce the refresh to avoid too many updates
    let refreshTimeout = null;
    const refreshAnalysis = () => {
        if (refreshTimeout) {
            clearTimeout(refreshTimeout);
        }
        refreshTimeout = setTimeout(async () => {
            await startAnalysis();
        }, 2000);
    };
    fileWatcher.onDidChange(refreshAnalysis);
    fileWatcher.onDidCreate(refreshAnalysis);
    fileWatcher.onDidDelete(refreshAnalysis);
    context.subscriptions.push(fileWatcher);
    // Auto-start analysis when the extension is activated
    startAnalysis();
}
function deactivate() {
    // Cleanup
}


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectDetector = void 0;
const fs = __importStar(__webpack_require__(4));
const path = __importStar(__webpack_require__(3));
const vscode = __importStar(__webpack_require__(2));
const project_config_1 = __webpack_require__(7);
/**
 * Detects the type of project in the given folder
 */
class ProjectDetector {
    /**
     * Attempts to detect the project type from the given root folder
     * @param rootFolder The root folder to detect the project type from
     * @returns A promise that resolves to the detected project type, or null if none could be detected
     */
    async detectProjectType(rootFolder) {
        for (const [projectTypeId, config] of Object.entries(project_config_1.PROJECT_CONFIGS)) {
            const { requiredFiles, matchAny, language } = config;
            let allFilesExist;
            if (matchAny) {
                // Any of the files should exist
                allFilesExist = requiredFiles.some(file => fs.existsSync(path.join(rootFolder, file)));
            }
            else {
                // All of the files should exist
                allFilesExist = requiredFiles.every(file => fs.existsSync(path.join(rootFolder, file)));
            }
            if (allFilesExist) {
                // Project type detected
                const projectType = {
                    id: projectTypeId,
                    name: this.formatProjectTypeName(projectTypeId),
                    language,
                    rootPath: rootFolder
                };
                // For Android projects, add the app directory to metadata
                if (projectTypeId === 'android') {
                    projectType.metadata = {
                        appDir: path.join(rootFolder, 'app')
                    };
                }
                return projectType;
            }
        }
        // No project type detected
        return null;
    }
    /**
     * Selects a root folder for analysis
     * @returns A promise that resolves to the selected folder path, or null if none was selected
     */
    async selectRootFolder() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        // If there's a workspace open, use that
        if (workspaceFolders && workspaceFolders.length > 0) {
            // If there's only one workspace folder, use that
            if (workspaceFolders.length === 1) {
                return workspaceFolders[0].uri.fsPath;
            }
            // If there are multiple workspace folders, ask the user to select one
            const selectedFolder = await vscode.window.showQuickPick(workspaceFolders.map(folder => ({
                label: folder.name,
                description: folder.uri.fsPath,
                folder
            })), {
                placeHolder: 'Select a workspace folder to analyze'
            });
            if (selectedFolder) {
                return selectedFolder.folder.uri.fsPath;
            }
            return null;
        }
        // No workspace open, ask the user to select a folder
        const selectedFolders = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: 'Select Folder'
        });
        if (selectedFolders && selectedFolders.length > 0) {
            return selectedFolders[0].fsPath;
        }
        return null;
    }
    /**
     * Formats a project type ID into a human-readable name
     */
    formatProjectTypeName(id) {
        return id.charAt(0).toUpperCase() + id.slice(1);
    }
}
exports.ProjectDetector = ProjectDetector;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PROJECT_CONFIGS = void 0;
/**
 * Mapping of project type ID to its detection configuration
 */
exports.PROJECT_CONFIGS = {
    "android": {
        requiredFiles: [
            "build.gradle",
            "build.gradle.kts",
            "app/src/main/AndroidManifest.xml"
        ],
        matchAny: false,
        language: "java"
    },
    "maven": {
        requiredFiles: [
            "pom.xml"
        ],
        language: "java"
    },
    "gradle": {
        requiredFiles: [
            "build.gradle",
            "build.gradle.kts"
        ],
        matchAny: true,
        language: "java"
    },
    "java": {
        requiredFiles: [
            "src/main/java",
            "src/"
        ],
        matchAny: true,
        language: "java"
    },
    "python": {
        requiredFiles: [
            "setup.py",
            "pyproject.toml",
            "requirements.txt"
        ],
        matchAny: true,
        language: "python"
    },
    "nodejs": {
        requiredFiles: [
            "package.json"
        ],
        language: "typescript" // or javascript, depending on detection
    }
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParserRegistry = void 0;
/**
 * Registry of all available parsers
 */
class ParserRegistry {
    parsers = [];
    /**
     * Register a parser
     * @param parser The parser to register
     */
    registerParser(parser) {
        this.parsers.push(parser);
    }
    /**
     * Get a parser that can handle the given project type
     * @param projectType The project type to get a parser for
     * @returns The parser, or null if no suitable parser was found
     */
    getParser(projectType) {
        for (const parser of this.parsers) {
            if (parser.canHandle(projectType)) {
                return parser;
            }
        }
        return null;
    }
    /**
     * Parse the project with an appropriate parser
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the standardized dependency graph
     * @throws Error if no suitable parser was found
     */
    async parse(projectType) {
        const parser = this.getParser(projectType);
        if (!parser) {
            throw new Error(`No parser available for project type: ${projectType.name}`);
        }
        return await parser.parse(projectType);
    }
}
exports.ParserRegistry = ParserRegistry;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(10), exports);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JavaParser = void 0;
// src/parsers/java/java-parser.ts
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(4));
const path = __importStar(__webpack_require__(3));
const cp = __importStar(__webpack_require__(11));
const base_parser_1 = __webpack_require__(12);
/**
 * Parser for Java projects
 */
class JavaParser extends base_parser_1.BaseParser {
    language = 'java';
    /**
     * Parse the Java project and generate language-specific dependencies
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the Java-specific dependencies
     */
    async parseToLanguageSpecific(projectType) {
        // Determine the actual root folder to parse
        let rootFolder = projectType.rootPath;
        // For Android projects, we want to parse the app directory
        if (projectType.id === 'android' && projectType.metadata?.appDir) {
            rootFolder = projectType.metadata.appDir;
        }
        // Ensure output directory exists
        const outputDir = path.join(rootFolder, '.vscode');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputFilePath = path.join(outputDir, 'language-dependencies.json');
        // Delete existing output file if it exists
        if (fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
        }
        // Path to the Java parser JAR (shipped with the extension)
        const javaParserPath = this.getJavaParserPath();
        // Build command to run the Java parser
        const command = `java -jar "${javaParserPath}" "${rootFolder}" "${outputFilePath}"`;
        // Show progress notification
        vscode.window.showInformationMessage(`Analyzing Java project in ${rootFolder}...`);
        // Run Java parser
        await this.executeCommand(command, outputDir);
        // Check if output file was generated
        if (!fs.existsSync(outputFilePath)) {
            throw new Error('Failed to generate Java dependencies');
        }
        // Parse the output file
        const javaOutputJson = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));
        // Return the Java-specific dependencies
        return javaOutputJson;
    }
    /**
     * Get the path to the Java parser JAR
     * @returns The path to the Java parser JAR
     */
    getJavaParserPath() {
        // The extension context provides the path to the extension's installation directory
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.dependency-analytics')?.extensionPath;
        if (!extensionPath) {
            throw new Error('Could not determine extension path');
        }
        // The Java parser JAR is in the extension's resources/parsers/java directory
        const javaParserPath = path.join(extensionPath, 'resources', 'parsers', 'java', 'Java-parser.jar');
        // Verify that the parser exists
        if (!fs.existsSync(javaParserPath)) {
            throw new Error(`Java parser not found at ${javaParserPath}`);
        }
        return javaParserPath;
    }
    /**
     * Execute a command as a Promise
     * @param command The command to execute
     * @param cwd The working directory for the command
     * @returns A promise that resolves when the command completes
     */
    executeCommand(command, cwd) {
        return new Promise((resolve, reject) => {
            cp.exec(command, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Command execution error: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.warn(`Command stderr: ${stderr}`);
                }
                console.log(`Command stdout: ${stdout}`);
                resolve();
            });
        });
    }
}
exports.JavaParser = JavaParser;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseParser = void 0;
const converter_1 = __webpack_require__(22);
/**
 * Base class for language-specific parsers
 */
class BaseParser {
    /**
     * Check if this parser can handle the given project type
     * @param projectType The project type to check
     * @returns Whether this parser can handle the project type
     */
    canHandle(projectType) {
        return projectType.language === this.language;
    }
    /**
     * Parse the project and convert to standardized format
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the standardized dependency graph
     */
    async parse(projectType) {
        // Parse project to get language-specific dependencies
        const languageSpecificDeps = await this.parseToLanguageSpecific(projectType);
        // Convert to standardized format
        return (0, converter_1.convertDependencies)(languageSpecificDeps);
    }
}
exports.BaseParser = BaseParser;


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DependencyTreeItem = exports.DependencyTreeProvider = void 0;
// src/views/tree/dependency-tree.ts
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
/**
 * Tree view provider for displaying the dependency tree
 */
class DependencyTreeProvider {
    _onDidChangeTreeData = new vscode.EventEmitter();
    /**
     * Event fired when the tree data changes
     */
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    /**
     * The current dependency graph, if any
     */
    graph = null;
    /**
     * Map of node IDs to tree items
     */
    nodeMap = new Map();
    constructor() { }
    /**
     * Set the graph for this tree view
     * @param graph The dependency graph
     */
    setGraph(graph) {
        this.graph = graph;
        this.nodeMap.clear();
        this.refresh();
    }
    /**
     * Refresh the tree view
     */
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    /**
     * Get the tree item for the given element
     * @param element The tree item to get
     * @returns The tree item
     */
    getTreeItem(element) {
        return element;
    }
    /**
     * Get the children of the given element
     * @param element The element to get children for
     * @returns A promise that resolves to the children
     */
    getChildren(element) {
        if (!this.graph) {
            return Promise.resolve([]);
        }
        if (!element) {
            // Root level - find top-level nodes (those not targeted by any edge)
            const targetNodeIds = new Set();
            // Collect all nodes that are targets of edges
            for (const edge of this.graph.edges) {
                targetNodeIds.add(edge.target);
            }
            // Filter out nodes that are not targets (these are root nodes)
            const rootNodes = this.graph.nodes.filter(node => !targetNodeIds.has(node.id));
            // If we don't have any root nodes, use all nodes as root
            const nodesToDisplay = rootNodes.length > 0 ? rootNodes : this.graph.nodes;
            return Promise.resolve(nodesToDisplay.map(node => this.createTreeItem(node)));
        }
        // Child nodes - find nodes that have an edge from this node
        const childNodes = [];
        const nodeId = element.node.id;
        // Find edges where this node is the source
        const outgoingEdges = this.graph.edges.filter(edge => edge.source === nodeId);
        // For each outgoing edge, find the target node
        for (const edge of outgoingEdges) {
            const targetNode = this.graph.nodes.find(node => node.id === edge.target);
            if (targetNode) {
                childNodes.push(targetNode);
            }
        }
        return Promise.resolve(childNodes.map(node => this.createTreeItem(node)));
    }
    /**
     * Create a tree item for a node
     * @param node The node to create a tree item for
     * @returns The tree item
     */
    createTreeItem(node) {
        // Check if we already have a tree item for this node
        if (this.nodeMap.has(node.id)) {
            return this.nodeMap.get(node.id);
        }
        // Determine if this node has children
        const hasChildren = this.graph?.edges.some(edge => edge.source === node.id) || false;
        // Create the tree item
        const treeItem = new DependencyTreeItem(node, hasChildren
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None);
        // Cache the tree item
        this.nodeMap.set(node.id, treeItem);
        return treeItem;
    }
}
exports.DependencyTreeProvider = DependencyTreeProvider;
/**
 * Tree item representing a node in the dependency tree
 */
class DependencyTreeItem extends vscode.TreeItem {
    node;
    collapsibleState;
    constructor(node, collapsibleState) {
        super(node.title, collapsibleState);
        this.node = node;
        this.collapsibleState = collapsibleState;
        // Set tooltip to description of node
        this.tooltip = this.createTooltip(node);
        // Set description based on the type of node
        this.description = node.type;
        // Set context value for menus
        this.contextValue = node.type;
        // Add appropriate icon based on the type
        this.iconPath = this.getIconPath(node.type);
        // Add command to show details when clicked
        this.command = {
            command: 'dependencyAnalytics.showNodeDetails',
            title: 'Show Node Details',
            arguments: [node]
        };
    }
    /**
     * Create a tooltip for the node
     * @param node The node to create a tooltip for
     * @returns The tooltip
     */
    createTooltip(node) {
        let tooltip = `${node.title} (${node.type})`;
        // Add metadata if available
        if (node.metadata) {
            if (node.metadata.fullName) {
                tooltip += `\nFull name: ${node.metadata.fullName}`;
            }
            if (node.metadata.filePath || node.metadata.sourceFile) {
                tooltip += `\nSource: ${node.metadata.filePath || node.metadata.sourceFile}`;
            }
            if (node.metadata.packageName) {
                tooltip += `\nPackage: ${node.metadata.packageName}`;
            }
            if (node.metadata.module) {
                tooltip += `\nModule: ${node.metadata.module}`;
            }
        }
        return tooltip;
    }
    /**
     * Get the icon path for a node type
     * @param nodeType The node type
     * @returns The icon path
     */
    getIconPath(nodeType) {
        // Map node types to icon names
        let iconName = 'default';
        switch (nodeType.toLowerCase()) {
            case 'class':
                iconName = 'class';
                break;
            case 'interface':
                iconName = 'interface';
                break;
            case 'component':
                iconName = 'component';
                break;
            case 'function':
                iconName = 'function';
                break;
            case 'module':
            case 'package':
                iconName = 'package';
                break;
            case 'file':
                iconName = 'file';
                break;
            case 'model':
                iconName = 'model';
                break;
            case 'view':
                iconName = 'view';
                break;
            case 'app':
                iconName = 'app';
                break;
            default:
                iconName = 'default';
        }
        // Get the extension path using VS Code API
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.dependency-analytics')?.extensionPath || '';
        return {
            light: vscode.Uri.file(path.join(extensionPath, 'resources', 'icons', 'light', `${iconName}.svg`)),
            dark: vscode.Uri.file(path.join(extensionPath, 'resources', 'icons', 'dark', `${iconName}.svg`))
        };
    }
}
exports.DependencyTreeItem = DependencyTreeItem;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StructureTreeProvider = void 0;
// src/views/tree/structure-tree.ts
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
/**
 * Tree view provider for displaying the structure of a node
 */
class StructureTreeProvider {
    _onDidChangeTreeData = new vscode.EventEmitter();
    /**
     * Event fired when the tree data changes
     */
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    /**
     * The node to show the structure of, if any
     */
    currentNode = null;
    constructor() { }
    /**
     * Set the node to show the structure of
     * @param node The node
     */
    setNode(node) {
        this.currentNode = node;
        this.refresh();
    }
    /**
     * Refresh the tree view
     */
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    /**
     * Get the tree item for the given element
     * @param element The tree item to get
     * @returns The tree item
     */
    getTreeItem(element) {
        return element;
    }
    /**
     * Get the children of the given element
     * @param element The element to get children for
     * @returns A promise that resolves to the children
     */
    getChildren(element) {
        if (!this.currentNode) {
            return Promise.resolve([]);
        }
        if (!element) {
            // Root level - show sections
            const sections = this.currentNode.sections || [];
            return Promise.resolve(sections.map(section => new SectionTreeItem(section)));
        }
        else if (element instanceof SectionTreeItem) {
            // Section level - show items
            const items = element.section.items || [];
            return Promise.resolve(items.map(item => new ItemTreeItem(item, this.currentNode)));
        }
        // No more children
        return Promise.resolve([]);
    }
}
exports.StructureTreeProvider = StructureTreeProvider;
/**
 * Base tree item for the structure tree
 */
class BaseStructureTreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
    }
    /**
     * Get the icon path for an icon name
     * @param iconName The icon name
     * @returns The icon path
     */
    getIconPath(iconName) {
        // Get the extension path using VS Code API
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.dependency-analytics')?.extensionPath || '';
        return {
            light: vscode.Uri.file(path.join(extensionPath, 'resources', 'icons', 'light', `${iconName}.svg`)),
            dark: vscode.Uri.file(path.join(extensionPath, 'resources', 'icons', 'dark', `${iconName}.svg`))
        };
    }
}
/**
 * Tree item representing a section in the structure tree
 */
class SectionTreeItem extends BaseStructureTreeItem {
    section;
    constructor(section) {
        super(section.name, section.items && section.items.length > 0
            ? vscode.TreeItemCollapsibleState.Expanded
            : vscode.TreeItemCollapsibleState.None);
        this.section = section;
        this.contextValue = 'section';
        this.iconPath = this.getIconPath('folder');
    }
}
/**
 * Tree item representing an item in the structure tree
 */
class ItemTreeItem extends BaseStructureTreeItem {
    item;
    parentNode;
    constructor(item, parentNode) {
        super(item.value, vscode.TreeItemCollapsibleState.None);
        this.item = item;
        this.parentNode = parentNode;
        // Set context value from icon if available
        this.contextValue = item.icon || 'item';
        // Set icon
        if (item.icon) {
            this.iconPath = this.getIconPath(item.icon);
        }
        // Set command if this is a source navigation item
        if (item.icon === 'field' || item.icon === 'method' || item.icon === 'constructor') {
            const sourceFile = parentNode.metadata?.sourceFile || parentNode.metadata?.filePath;
            if (sourceFile) {
                this.command = {
                    command: 'dependencyAnalytics.navigateToSource',
                    title: 'Navigate to Source',
                    arguments: [{
                            id: item.id,
                            title: item.value,
                            type: item.icon,
                            metadata: {
                                sourceFile,
                                ...item.metadata
                            }
                        }]
                };
            }
        }
    }
}


/***/ }),
/* 16 */,
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagramGenerator = void 0;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(4));
const path = __importStar(__webpack_require__(3));
/**
 * Base class for diagram generators
 */
class DiagramGenerator {
    /**
     * Display the generated diagram in a webview panel
     * @param context The extension context
     * @param classItem The class to show the diagram for
     * @param allClasses All classes in the project
     * @param diagramFormat The format of the diagram (e.g., 'mermaid')
     */
    async showDiagram(context, classItem, allClasses, diagramFormat = 'mermaid') {
        // Create a webview panel
        const panel = vscode.window.createWebviewPanel('classDiagram', `Class Diagram: ${classItem.name.split('.').pop()}`, vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, 'media'))
            ]
        });
        // Generate the diagram
        const diagram = this.generateDiagram(classItem, allClasses);
        // Read HTML template
        let htmlPath = path.join(context.extensionPath, 'media', 'html', 'webview.html');
        // Check if the webview.html file exists
        if (!fs.existsSync(htmlPath)) {
            // Try alternate locations
            const altPath = path.join(context.extensionPath, 'resources', 'templates', 'diagram.html');
            if (fs.existsSync(altPath)) {
                htmlPath = altPath;
            }
        }
        // If the template exists, use it
        let htmlContent;
        if (fs.existsSync(htmlPath)) {
            htmlContent = fs.readFileSync(htmlPath, 'utf8');
            // Replace diagram placeholder with actual diagram
            htmlContent = htmlContent.replace('DIAGRAM_PLACEHOLDER', diagram);
        }
        else {
            // Create a basic HTML template if the file doesn't exist
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Class Diagram</title>
                    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.0.0/dist/mermaid.min.js"></script>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        .diagram-container {
                            overflow: auto;
                        }
                        #zoom-controls {
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background: rgba(255, 255, 255, 0.9);
                            padding: 10px;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                            z-index: 1000;
                            display: flex;
                            gap: 10px;
                        }
                        button {
                            padding: 5px 10px;
                            cursor: pointer;
                            background: #f0f0f0;
                            border: 1px solid #ccc;
                            border-radius: 3px;
                        }
                        button:hover {
                            background: #e0e0e0;
                        }
                        .zoom-level {
                            display: inline-block;
                            min-width: 60px;
                            text-align: center;
                            line-height: 28px;
                        }
                        #scroll-container {
                            width: 100%;
                            height: 100vh;
                            overflow: auto;
                            position: relative;
                        }
                        #content {
                            padding: 20px;
                            transform-origin: 0 0;
                            transition: transform 0.2s ease-out;
                            min-width: fit-content;
                        }
                    </style>
                </head>
                <body>
                    <div id="scroll-container">
                        <div id="content">
                            <pre class="mermaid">
${diagram}
                            </pre>
                        </div>
                    </div>
                    
                    <div id="zoom-controls">
                        <button onclick="zoomOut()">−</button>
                        <span class="zoom-level">100%</span>
                        <button onclick="zoomIn()">+</button>
                        <button onclick="resetZoom()">Reset</button>
                    </div>
                    
                    <script>
                        // Initialize Mermaid
                        mermaid.initialize({
                            startOnLoad: true,
                            theme: 'default',
                            securityLevel: 'loose',
                            classDiagram: {
                                useMaxWidth: false,
                                wrap: false
                            }
                        });
                        
                        // Zoom functionality
                        let zoomScale = 1;
                        const content = document.getElementById('content');
                        const zoomLevel = document.querySelector('.zoom-level');
                        const MIN_ZOOM = 0.5;
                        const MAX_ZOOM = 3;
                        const ZOOM_STEP = 0.1;
                        
                        function updateZoom() {
                            content.style.transform = \`scale(\${zoomScale})\`;
                            zoomLevel.textContent = \`\${Math.round(zoomScale * 100)}%\`;
                        }
                        
                        function zoomIn() {
                            if (zoomScale < MAX_ZOOM) {
                                zoomScale = Math.min(MAX_ZOOM, zoomScale + ZOOM_STEP);
                                updateZoom();
                            }
                        }
                        
                        function zoomOut() {
                            if (zoomScale > MIN_ZOOM) {
                                zoomScale = Math.max(MIN_ZOOM, zoomScale - ZOOM_STEP);
                                updateZoom();
                            }
                        }
                        
                        function resetZoom() {
                            zoomScale = 1;
                            updateZoom();
                        }
                        
                        // Mouse wheel zoom
                        window.addEventListener('wheel', function(event) {
                            if (event.ctrlKey || event.metaKey) {
                                event.preventDefault();
                                
                                if (event.deltaY < 0) {
                                    zoomIn();
                                } else {
                                    zoomOut();
                                }
                            }
                        }, { passive: false });
                    </script>
                </body>
                </html>
            `;
        }
        // Set the HTML content
        panel.webview.html = htmlContent;
    }
}
exports.DiagramGenerator = DiagramGenerator;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MermaidGenerator = void 0;
const graph_generator_1 = __webpack_require__(17);
/**
 * Generates class diagrams using Mermaid syntax from the standard format
 */
class MermaidGenerator extends graph_generator_1.DiagramGenerator {
    /**
     * Generate a Mermaid class diagram
     * @param targetNode The node to generate a diagram for
     * @param allNodes All nodes in the project (for finding relationships)
     * @returns The generated Mermaid diagram as a string
     */
    generateDiagram(targetNode, allNodes) {
        let diagram = 'classDiagram\n';
        // Keep track of processed classes to avoid duplicates
        const processedNodeIds = new Set();
        const processedRelations = new Set();
        // Queue of nodes to process
        const nodeQueue = [targetNode];
        // Process all nodes first to define them
        while (nodeQueue.length > 0) {
            const currentNode = nodeQueue.shift();
            // Skip if already processed
            if (processedNodeIds.has(currentNode.id)) {
                continue;
            }
            processedNodeIds.add(currentNode.id);
            try {
                // Add node definition
                diagram += this.generateNodeDefinition(currentNode);
            }
            catch (error) {
                console.error(`Error generating node definition for ${currentNode.title}: ${error}`);
            }
            // Add related nodes to queue
            this.findRelatedNodes(currentNode, allNodes).forEach(relatedNode => {
                if (!processedNodeIds.has(relatedNode.id)) {
                    nodeQueue.push(relatedNode);
                }
            });
        }
        // Reset processed set for relationship processing
        processedNodeIds.clear();
        // Queue of nodes to process for relationships
        const relationshipQueue = [targetNode];
        // Process all relationships
        while (relationshipQueue.length > 0) {
            const currentNode = relationshipQueue.shift();
            // Skip if already processed
            if (processedNodeIds.has(currentNode.id)) {
                continue;
            }
            processedNodeIds.add(currentNode.id);
            try {
                // Add relationships
                diagram += this.generateRelationships(currentNode, allNodes, processedRelations);
            }
            catch (error) {
                console.error(`Error generating relationships for ${currentNode.title}: ${error}`);
            }
            // Add related nodes to queue
            this.findRelatedNodes(currentNode, allNodes).forEach(relatedNode => {
                if (!processedNodeIds.has(relatedNode.id)) {
                    relationshipQueue.push(relatedNode);
                }
            });
        }
        return diagram;
    }
    /**
     * Generate the Mermaid node definition
     * @param node The node to generate a definition for
     * @returns The Mermaid node definition
     */
    generateNodeDefinition(node) {
        let definition = '';
        const safeName = this.safeMermaidName(node.title);
        definition += `    class ${safeName} {\n`;
        // Add stereotypes based on node type
        const stereotypes = [];
        if (node.type === 'interface')
            stereotypes.push('interface');
        if (node.type === 'abstract' || node.metadata?.isAbstract)
            stereotypes.push('abstract');
        if (stereotypes.length > 0) {
            definition += `        <<${stereotypes.join(' ')}>>\n`;
        }
        // Find fields and methods in sections
        for (const section of node.sections || []) {
            for (const item of section.items || []) {
                try {
                    // If the item has an icon, use it to determine the type
                    if (item.icon === 'field') {
                        // Extract access modifier if available at the start of the value
                        let accessModifier = '~'; // Default to package private
                        let itemValue = item.value;
                        if (itemValue.startsWith('public ')) {
                            accessModifier = '+';
                            itemValue = itemValue.substring(7);
                        }
                        else if (itemValue.startsWith('private ')) {
                            accessModifier = '-';
                            itemValue = itemValue.substring(8);
                        }
                        else if (itemValue.startsWith('protected ')) {
                            accessModifier = '#';
                            itemValue = itemValue.substring(10);
                        }
                        // Check for static
                        let staticPrefix = '';
                        if (itemValue.includes('static ')) {
                            staticPrefix = '$';
                        }
                        // Clean up the field value
                        const cleanedValue = this.cleanFieldValue(itemValue);
                        definition += `        ${accessModifier}${staticPrefix}${cleanedValue}\n`;
                    }
                    else if (item.icon === 'method' || item.icon === 'constructor') {
                        // Extract access modifier if available at the start of the value
                        let accessModifier = '~'; // Default to package private
                        let itemValue = item.value;
                        if (itemValue.startsWith('public ')) {
                            accessModifier = '+';
                            itemValue = itemValue.substring(7);
                        }
                        else if (itemValue.startsWith('private ')) {
                            accessModifier = '-';
                            itemValue = itemValue.substring(8);
                        }
                        else if (itemValue.startsWith('protected ')) {
                            accessModifier = '#';
                            itemValue = itemValue.substring(10);
                        }
                        // Check for static and abstract
                        let staticPrefix = '';
                        let abstractPrefix = '';
                        if (itemValue.includes('static ')) {
                            staticPrefix = '$';
                        }
                        if (itemValue.includes('abstract ')) {
                            abstractPrefix = '*';
                        }
                        // Clean up the method value
                        const cleanedValue = this.cleanMethodValue(itemValue);
                        definition += `        ${accessModifier}${staticPrefix}${abstractPrefix}${cleanedValue}\n`;
                    }
                }
                catch (error) {
                    console.error(`Error processing item ${item.id}: ${error}`);
                }
            }
        }
        definition += '    }\n';
        return definition;
    }
    /**
     * Generate the Mermaid relationships for a node
     * @param node The node to generate relationships for
     * @param allNodes All nodes in the project
     * @param processedRelations Set of already processed relationships
     * @returns The Mermaid relationships
     */
    generateRelationships(node, allNodes, processedRelations) {
        let relationships = '';
        const safeName = this.safeMermaidName(node.title);
        // Look for inheritance in metadata
        if (node.metadata?.superClassName || node.metadata?.superClasses) {
            const superClasses = node.metadata.superClasses ||
                (node.metadata.superClassName ? [node.metadata.superClassName] : []);
            for (const superClass of superClasses) {
                if (superClass && superClass !== 'java.lang.Object') {
                    // Try to find the super class in the node list
                    const superNode = this.findNodeByName(superClass, allNodes);
                    if (superNode) {
                        const superName = this.safeMermaidName(superNode.title);
                        const relation = `    ${superName} <|-- ${safeName}\n`;
                        if (!processedRelations.has(relation)) {
                            relationships += relation;
                            processedRelations.add(relation);
                        }
                    }
                }
            }
        }
        // Look for interface implementations in metadata
        if (node.metadata?.interfaces) {
            for (const interfaceName of node.metadata.interfaces) {
                // Try to find the interface in the node list
                const interfaceNode = this.findNodeByName(interfaceName, allNodes);
                if (interfaceNode) {
                    const interfaceSafeName = this.safeMermaidName(interfaceNode.title);
                    const relation = `    ${interfaceSafeName} <|.. ${safeName}\n`;
                    if (!processedRelations.has(relation)) {
                        relationships += relation;
                        processedRelations.add(relation);
                    }
                }
            }
        }
        // Look for dependencies in the metadata
        if (node.metadata?.outgoingDependencies) {
            for (const depName of node.metadata.outgoingDependencies) {
                // Try to find the dependency in the node list
                const depNode = this.findNodeByName(depName, allNodes);
                if (depNode) {
                    const depSafeName = this.safeMermaidName(depNode.title);
                    // Skip self-dependencies
                    if (depSafeName === safeName) {
                        continue;
                    }
                    const relation = `    ${safeName} --> ${depSafeName}\n`;
                    if (!processedRelations.has(relation)) {
                        relationships += relation;
                        processedRelations.add(relation);
                    }
                }
            }
        }
        return relationships;
    }
    /**
     * Find nodes related to the given node
     * @param node The node to find related nodes for
     * @param allNodes All nodes in the project
     * @returns The related nodes
     */
    findRelatedNodes(node, allNodes) {
        const relatedNodes = [];
        // Look for inheritance
        if (node.metadata?.superClassName || node.metadata?.superClasses) {
            const superClasses = node.metadata.superClasses ||
                (node.metadata.superClassName ? [node.metadata.superClassName] : []);
            for (const superClass of superClasses) {
                if (superClass && superClass !== 'java.lang.Object') {
                    const superNode = this.findNodeByName(superClass, allNodes);
                    if (superNode) {
                        relatedNodes.push(superNode);
                    }
                }
            }
        }
        // Look for interface implementations
        if (node.metadata?.interfaces) {
            for (const interfaceName of node.metadata.interfaces) {
                const interfaceNode = this.findNodeByName(interfaceName, allNodes);
                if (interfaceNode) {
                    relatedNodes.push(interfaceNode);
                }
            }
        }
        // Look for dependencies
        if (node.metadata?.outgoingDependencies) {
            for (const depName of node.metadata.outgoingDependencies) {
                const depNode = this.findNodeByName(depName, allNodes);
                if (depNode) {
                    relatedNodes.push(depNode);
                }
            }
        }
        return relatedNodes;
    }
    /**
     * Find a node by its name or full name
     * @param name The name to look for
     * @param allNodes All nodes in the project
     * @returns The node, or undefined if not found
     */
    findNodeByName(name, allNodes) {
        // Try to find by full name first
        let node = allNodes.find(n => n.metadata?.fullName === name ||
            n.title === name);
        if (!node) {
            // Try to extract simple name and search by that
            const simpleName = name.split('.').pop() || name;
            node = allNodes.find(n => n.title === simpleName);
        }
        return node;
    }
    /**
     * Clean a field value for display in Mermaid
     * @param value The field value
     * @returns The cleaned value
     */
    cleanFieldValue(value) {
        // Replace static, final keywords
        let cleaned = value.replace(/static |final /g, '');
        // Ensure there's a type declaration
        if (!cleaned.includes(':')) {
            // Try to extract type from format "Type name"
            const parts = cleaned.trim().split(' ');
            if (parts.length >= 2) {
                const name = parts.pop();
                const type = parts.join(' ');
                cleaned = `${name} : ${type}`;
            }
        }
        return this.safeMermaidName(cleaned);
    }
    /**
     * Clean a method value for display in Mermaid
     * @param value The method value
     * @returns The cleaned value
     */
    cleanMethodValue(value) {
        // Replace static, final, abstract keywords
        let cleaned = value.replace(/static |final |abstract /g, '');
        // Ensure there's a return type
        if (!cleaned.includes(':') && !cleaned.includes('->')) {
            // Append void return type
            cleaned = `${cleaned} : void`;
        }
        return this.safeMermaidName(cleaned);
    }
    /**
     * Make a name safe for Mermaid syntax
     * @param name The name to make safe
     * @returns The safe name
     */
    safeMermaidName(name) {
        if (!name)
            return 'Unknown';
        // Replace special characters that cause issues in Mermaid syntax
        return name
            .replace(/[<>()[\]{}:;"',.?!@#$%^&*+=|\\\/]/g, '_') // Replace special chars with underscore
            .replace(/^_+|_+$/g, ''); // Trim underscores from start and end
    }
}
exports.MermaidGenerator = MermaidGenerator;
// Export the MermaidGenerator
exports["default"] = MermaidGenerator;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(21), exports);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandUtils = void 0;
const cp = __importStar(__webpack_require__(11));
const vscode = __importStar(__webpack_require__(2));
/**
 * Utility functions for command execution
 */
class CommandUtils {
    /**
     * Execute a command as a Promise
     * @param command The command to execute
     * @param cwd The working directory for the command
     * @returns A promise that resolves to the command output
     */
    static executeCommand(command, cwd) {
        return new Promise((resolve, reject) => {
            cp.exec(command, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Command execution error: ${error.message}\n${stderr}`));
                    return;
                }
                resolve(stdout);
            });
        });
    }
    /**
     * Execute a command with progress reporting
     * @param command The command to execute
     * @param cwd The working directory for the command
     * @param title The title for the progress notification
     * @returns A promise that resolves to the command output
     */
    static async executeCommandWithProgress(command, cwd, title) {
        return await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title,
            cancellable: false
        }, async (progress) => {
            progress.report({ message: 'Executing command...' });
            try {
                const result = await this.executeCommand(command, cwd);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CommandUtils = CommandUtils;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUtils = void 0;
const fs = __importStar(__webpack_require__(4));
const path = __importStar(__webpack_require__(3));
const vscode = __importStar(__webpack_require__(2));
/**
 * Utility functions for file operations
 */
class FileUtils {
    /**
     * Ensure a directory exists, creating it if necessary
     * @param dirPath The directory path
     */
    static ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
    /**
     * Write data to a JSON file
     * @param filePath The file path
     * @param data The data to write
     */
    static writeJsonFile(filePath, data) {
        // Ensure the directory exists
        this.ensureDirectoryExists(path.dirname(filePath));
        // Write the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
    /**
     * Read data from a JSON file
     * @param filePath The file path
     * @returns The data from the file, or null if the file doesn't exist
     */
    static readJsonFile(filePath) {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        }
        catch (error) {
            console.error(`Error reading JSON file ${filePath}:, error`);
            return null;
        }
    }
    /**
     * Find files in the workspace
     * @param globPattern The glob pattern to search for
     * @returns A promise that resolves to the matching files
     */
    static async findFiles(globPattern) {
        return await vscode.workspace.findFiles(globPattern);
    }
    /**
     * Find a file by name in the workspace
     * @param fileName The file name to search for
     * @returns A promise that resolves to the file URI, or null if not found
     */
    static async findFileByName(fileName) {
        const files = await this.findFiles(`**/${fileName}`);
        if (files.length === 0) {
            return null;
        }
        return files[0];
    }
}
exports.FileUtils = FileUtils;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.detectDependencyType = detectDependencyType;
exports.convertDependencies = convertDependencies;
const java_converter_1 = __webpack_require__(23);
const typescript_converter_1 = __webpack_require__(25);
/**
 * Detect the type of dependency data based on file content
 */
function detectDependencyType(data) {
    // Check for React TypeScript component-based dependencies (new format)
    if (!Array.isArray(data) && data.components && typeof data.components === 'object') {
        return 'typescript';
    }
    // Check for TypeScript dependencies (legacy format)
    if (Array.isArray(data) && data.length > 0 && data[0].fileName && data[0].exports) {
        return 'typescript';
    }
    // Check for Java dependencies
    if (!Array.isArray(data) && data.name && data.elements) {
        return 'java';
    }
    // Check for Python dependencies
    if (!Array.isArray(data) && data.metadata && data.apps && data.models) {
        return 'python';
    }
    // Will add more format detection as needed
    return 'unknown';
}
/**
 * Convert dependencies to standardized format
 */
function convertDependencies(data) {
    const type = detectDependencyType(data);
    switch (type) {
        case 'typescript':
            return (0, typescript_converter_1.convertTypeScriptDependencies)(data);
        case 'java':
            return (0, java_converter_1.convertJavaDependencies)(data);
        case 'python':
        default:
            throw new Error(`Unknown dependency data format`);
    }
}
// Export types
__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// src/converter/java-converter.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertJavaDependencies = convertJavaDependencies;
const utils_1 = __webpack_require__(24);
function convertJavaDependencies(javaDependencies) {
    const nodes = [];
    const edges = [];
    const nodeMap = new Map();
    // Process the Java package structure
    processJavaPackage(javaDependencies, nodes, nodeMap);
    // Create edges based on node relationships
    createJavaEdges(nodes, edges, nodeMap);
    return {
        nodes,
        edges,
        metadata: {
            projectType: 'java',
            projectName: javaDependencies.name || 'Java Project',
            convertedAt: new Date().toISOString(),
            originalFormat: {}
        }
    };
}
function processJavaPackage(javaPackage, nodes, nodeMap) {
    if (!javaPackage.elements) {
        return;
    }
    // Process all elements in the package
    javaPackage.elements.forEach(element => {
        if (element.class) {
            // This is a class
            const javaClass = element;
            createJavaClassNode(javaClass, nodes, nodeMap);
        }
        else if (element.package) {
            // This is a package, process it recursively
            processJavaPackage(element, nodes, nodeMap);
        }
    });
}
function createJavaClassNode(javaClass, nodes, nodeMap) {
    const nodeId = (0, utils_1.generateId)('java', javaClass.name);
    nodeMap.set(javaClass.name, nodeId);
    const sections = [];
    // Create class section with basic information
    const classInfoItems = [];
    // Add inheritance info
    if (javaClass.superClassName && javaClass.superClassName !== 'java.lang.Object') {
        classInfoItems.push((0, utils_1.createItem)((0, utils_1.generateId)('extends', `${javaClass.name}_extends`), `extends ${(0, utils_1.getSimpleName)(javaClass.superClassName)}`, 'inheritance'));
    }
    // Add interfaces
    if (javaClass.interfaces && javaClass.interfaces.length > 0) {
        const interfaces = javaClass.interfaces.map(utils_1.getSimpleName).join(', ');
        classInfoItems.push((0, utils_1.createItem)((0, utils_1.generateId)('implements', `${javaClass.name}_implements`), `implements ${interfaces}`, 'interface'));
    }
    if (classInfoItems.length > 0) {
        sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_info`), 'Class Info', classInfoItems));
    }
    // Create fields section
    if (javaClass.fields && javaClass.fields.length > 0) {
        const fieldItems = javaClass.fields.map(field => {
            const modifiers = [];
            if (field.modifier) {
                modifiers.push(field.modifier.toLowerCase());
            }
            if (field.static) {
                modifiers.push('static');
            }
            if (field.final) {
                modifiers.push('final');
            }
            return (0, utils_1.createItem)((0, utils_1.generateId)('field', `${javaClass.name}_${field.name}`), `${modifiers.join(' ')} ${(0, utils_1.getSimpleName)(field.type)} ${field.name}`, 'field', { type: field.type });
        });
        sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_fields`), 'Fields', fieldItems));
    }
    // Create methods section
    if (javaClass.methods && javaClass.methods.length > 0) {
        const methodItems = javaClass.methods.map(method => {
            const modifiers = [];
            if (method.accessModifier) {
                modifiers.push(method.accessModifier.toLowerCase());
            }
            if (method.static) {
                modifiers.push('static');
            }
            if (method.final) {
                modifiers.push('final');
            }
            if (method.abstract) {
                modifiers.push('abstract');
            }
            // For constructors, display name differently
            const isConstructor = method.name === '<init>';
            const displayName = isConstructor ? (0, utils_1.getSimpleName)(javaClass.name) : method.name;
            // Simplify parameter types to just the class name, not the full package
            const params = method.parameters.map(utils_1.getSimpleName).join(', ');
            // Display return type for non-constructors
            const returnTypeStr = isConstructor ? '' : `: ${(0, utils_1.getSimpleName)(method.returnType)}`;
            return (0, utils_1.createItem)((0, utils_1.generateId)('method', `${javaClass.name}_${method.name}`), `${modifiers.join(' ')} ${displayName}(${params})${returnTypeStr}`, isConstructor ? 'constructor' : 'method', {
                returnType: method.returnType,
                isConstructor
            });
        });
        sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_methods`), 'Methods', methodItems));
    }
    // Create imports section if available
    if (javaClass.importedPackages && javaClass.importedPackages.length > 0) {
        const importItems = javaClass.importedPackages.map(pkg => {
            return (0, utils_1.createItem)((0, utils_1.generateId)('import', `${javaClass.name}_${pkg.name}`), pkg.name, 'package');
        });
        sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_imports`), 'Imports', importItems));
    }
    // Create the node
    nodes.push({
        id: nodeId,
        title: (0, utils_1.getSimpleName)(javaClass.name),
        type: javaClass.interface ? 'interface' : 'class',
        sections,
        metadata: {
            fullName: javaClass.name,
            packageName: javaClass.packageName,
            sourceFile: javaClass.sourceFile,
            isAbstract: javaClass.abstract,
            isFinal: javaClass.final,
            superClassName: javaClass.superClassName,
            interfaces: javaClass.interfaces,
            outGoingDependencies: javaClass.outGoingDependencies,
            incomingDependencies: javaClass.incomingDependencies
        }
    });
}
function createJavaEdges(nodes, edges, nodeMap) {
    nodes.forEach(node => {
        const metadata = node.metadata;
        // Skip if no metadata or not a class
        if (!metadata || (node.type !== 'class' && node.type !== 'interface')) {
            return;
        }
        // Create inheritance edge if there's a superclass
        if (metadata.fullName && metadata.superClassName &&
            metadata.superClassName !== 'java.lang.Object') {
            const targetNodeId = nodeMap.get(metadata.superClassName);
            if (targetNodeId) {
                edges.push({
                    source: node.id,
                    target: targetNodeId,
                    type: 'inheritance',
                    metadata: {
                        relationship: 'extends'
                    }
                });
            }
        }
        // Create interface implementation edges
        if (metadata.interfaces) {
            metadata.interfaces.forEach((interfaceName) => {
                const targetNodeId = nodeMap.get(interfaceName);
                if (targetNodeId) {
                    edges.push({
                        source: node.id,
                        target: targetNodeId,
                        type: 'implementation',
                        metadata: {
                            relationship: 'implements'
                        }
                    });
                }
            });
        }
        // Create dependency edges
        if (metadata.outGoingDependencies) {
            metadata.outGoingDependencies.forEach((dependency) => {
                const targetNodeId = nodeMap.get(dependency);
                if (targetNodeId) {
                    edges.push({
                        source: node.id,
                        target: targetNodeId,
                        type: 'dependency',
                        metadata: {
                            direction: 'outgoing'
                        }
                    });
                }
            });
        }
    });
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


// src/converter/utils.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateId = generateId;
exports.getSimpleName = getSimpleName;
exports.createSection = createSection;
exports.createItem = createItem;
exports.determineNodeType = determineNodeType;
/**
 * Generates a unique ID for a node or edge
 */
function generateId(prefix, name) {
    return `${prefix}_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
}
/**
 * Extracts the simple name from a fully qualified Java class name
 * e.g., com.sample.book.Book -> Book
 */
function getSimpleName(fullyQualifiedName) {
    if (!fullyQualifiedName) {
        return '';
    }
    const parts = fullyQualifiedName.split('.');
    return parts[parts.length - 1];
}
/**
 * Creates a section with items
 */
function createSection(id, name, items, metadata) {
    return {
        id,
        name,
        items,
        metadata
    };
}
/**
 * Creates an item for a section
 */
function createItem(id, value, icon, metadata) {
    return {
        id,
        value,
        icon,
        metadata
    };
}
/**
 * Determines the type of import/dependency based on the name pattern
 */
function determineNodeType(name, additionalInfo) {
    if (additionalInfo?.class === true || additionalInfo?.isClass === true) {
        return additionalInfo.interface || additionalInfo.isInterface ? 'interface' : 'class';
    }
    if (additionalInfo?.type === 'function' || name.includes('()') || name.endsWith(')')) {
        return 'function';
    }
    if (additionalInfo?.type === 'model') {
        return 'model';
    }
    if (additionalInfo?.type === 'view') {
        return 'view';
    }
    if (name.endsWith('.ts') || name.endsWith('.js') || name.endsWith('.jsx') || name.endsWith('.tsx')) {
        return 'file';
    }
    // Default to module if we can't determine more specific type
    return 'module';
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// src/converter/typescript-converter.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertTypeScriptDependencies = convertTypeScriptDependencies;
const utils_1 = __webpack_require__(24);
// Helper to format function parameters
function formatParams(params = []) {
    if (!params || params.length === 0) {
        return '()';
    }
    return `(${params.map((p) => p.name).join(', ')})`;
}
// Check if the input data is in the component-based format
function isComponentBasedFormat(data) {
    return !Array.isArray(data) && data.components !== undefined;
}
// Convert TypeScript dependencies to standardized format
function convertTypeScriptDependencies(typescriptData) {
    // Detect data format and use appropriate converter
    if (isComponentBasedFormat(typescriptData)) {
        return convertComponentBasedTypeScript(typescriptData);
    }
    else {
        // Legacy format handling
        return convertLegacyTypeScriptDependencies(typescriptData);
    }
}
// Convert component-based TypeScript format
function convertComponentBasedTypeScript(data) {
    const nodes = [];
    const edges = [];
    const nodeMap = new Map(); // Maps component names to node IDs
    const filePathMap = new Map(); // Maps file paths to node IDs
    // Create nodes for each component
    Object.values(data.components).forEach(component => {
        const nodeId = (0, utils_1.generateId)('comp', component.name);
        nodeMap.set(component.name, nodeId);
        filePathMap.set(component.filePath, nodeId);
        const sections = [];
        // Create props section if available
        if (component.props && component.props.length > 0) {
            const propItems = component.props.map((prop) => {
                const required = prop.required ? ' (required)' : '';
                const type = prop.type ? `: ${prop.type}` : '';
                return (0, utils_1.createItem)((0, utils_1.generateId)('prop', `${component.name}_${prop.name}`), `${prop.name}${type}${required}`, 'prop');
            });
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_props`), 'Props', propItems));
        }
        // Create state section if available
        if (component.state && component.state.length > 0) {
            const stateItems = component.state.map((state) => {
                const type = state.type ? `: ${state.type}` : '';
                const initialValue = state.initialValue ? ` = ${state.initialValue}` : '';
                return (0, utils_1.createItem)((0, utils_1.generateId)('state', `${component.name}_${state.name}`), `${state.name}${type}${initialValue}`, 'state');
            });
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_state`), 'State', stateItems));
        }
        // Create hooks section if available
        if (component.hooks && component.hooks.length > 0) {
            const hookItems = component.hooks.map((hook) => {
                const custom = hook.customHook ? ' (custom)' : '';
                return (0, utils_1.createItem)((0, utils_1.generateId)('hook', `${component.name}_${hook.type}`), `${hook.type}${custom}`, 'hook');
            });
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_hooks`), 'Hooks', hookItems));
        }
        // Create dependencies section if available
        if (component.dependencies && component.dependencies.length > 0) {
            const dependencyItems = component.dependencies.map((dep) => {
                const external = dep.isExternal ? ' (external)' : '';
                return (0, utils_1.createItem)((0, utils_1.generateId)('dep', `${component.name}_${dep.name}`), `${dep.name} from '${dep.path}'${external}`, 'dependency');
            });
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_dependencies`), 'Dependencies', dependencyItems));
        }
        // Create children section if available
        if (component.children && component.children.length > 0) {
            const childrenItems = component.children.map((child) => {
                return (0, utils_1.createItem)((0, utils_1.generateId)('child', `${component.name}_${child}`), child, 'component');
            });
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_children`), 'Children', childrenItems));
        }
        nodes.push({
            id: nodeId,
            title: component.name,
            type: 'component',
            sections,
            metadata: {
                filePath: component.filePath,
                name: component.name
            }
        });
    });
    // Create edges for component dependencies
    Object.values(data.components).forEach(component => {
        const sourceNodeId = nodeMap.get(component.name);
        if (!sourceNodeId) {
            return;
        }
        // Create edges for component dependencies
        if (component.dependencies) {
            component.dependencies.forEach((dep) => {
                const targetNodeId = nodeMap.get(dep.name);
                if (targetNodeId) {
                    edges.push({
                        source: sourceNodeId,
                        target: targetNodeId,
                        type: 'dependency',
                        metadata: {
                            path: dep.path,
                            isExternal: dep.isExternal
                        }
                    });
                }
            });
        }
        // Create edges for component children
        if (component.children) {
            component.children.forEach((child) => {
                const targetNodeId = nodeMap.get(child);
                if (targetNodeId) {
                    edges.push({
                        source: sourceNodeId,
                        target: targetNodeId,
                        type: 'renders',
                        metadata: {
                            relationship: 'parent-child'
                        }
                    });
                }
            });
        }
    });
    return {
        nodes,
        edges,
        metadata: {
            projectType: 'typescript',
            projectName: 'React TypeScript Project',
            convertedAt: new Date().toISOString(),
            originalFormat: {}
        }
    };
}
// Legacy TypeScript converter
function convertLegacyTypeScriptDependencies(dependencies) {
    const nodes = [];
    const edges = [];
    const nodeMap = new Map(); // Maps file paths to node IDs
    // First pass: create nodes and build id map
    dependencies.forEach(dependency => {
        const nodeId = (0, utils_1.generateId)('ts', dependency.filePath);
        nodeMap.set(dependency.filePath, nodeId);
        const sections = [];
        // Create imports section if available
        if (dependency.imports && dependency.imports.length > 0) {
            const importItems = dependency.imports.map((imp) => {
                const value = imp.namedImports && imp.namedImports.length > 0
                    ? `{ ${imp.namedImports.join(', ')} } from '${imp.path}'`
                    : imp.defaultImport
                        ? `${imp.defaultImport} from '${imp.path}'`
                        : `import '${imp.path}'`;
                return (0, utils_1.createItem)((0, utils_1.generateId)('imp', `${dependency.filePath}_${imp.path}`), value, 'import', {
                    path: imp.path,
                    isTypeOnly: imp.isTypeOnly,
                    resolvedFilePath: imp.resolvedFilePath
                });
            });
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_imports`), 'Imports', importItems));
        }
        // Create exports section if available
        const exportItems = [];
        // Add exported functions
        if (dependency.exports && dependency.exports.functions && dependency.exports.functions.length > 0) {
            dependency.exports.functions.forEach((func) => {
                if (func.isExported) {
                    exportItems.push((0, utils_1.createItem)((0, utils_1.generateId)('func', `${dependency.filePath}_${func.name}`), `${func.name}${formatParams(func.params)}: ${func.returnType || 'void'}`, 'function', { isExported: true }));
                }
            });
        }
        // Add exported components
        if (dependency.exports && dependency.exports.components && dependency.exports.components.length > 0) {
            dependency.exports.components.forEach((comp) => {
                exportItems.push((0, utils_1.createItem)((0, utils_1.generateId)('comp', `${dependency.filePath}_${comp.name}`), `${comp.name}: ${comp.type || 'Component'}`, 'component', { isExported: true }));
            });
        }
        // Add exported types/interfaces
        if (dependency.exports && dependency.exports.interfaces && dependency.exports.interfaces.length > 0) {
            dependency.exports.interfaces.forEach((intf) => {
                exportItems.push((0, utils_1.createItem)((0, utils_1.generateId)('intf', `${dependency.filePath}_${intf.name}`), `${intf.name}`, 'interface', { isExported: true }));
            });
        }
        if (exportItems.length > 0) {
            sections.push((0, utils_1.createSection)((0, utils_1.generateId)('sec', `${nodeId}_exports`), 'Exports', exportItems));
        }
        nodes.push({
            id: nodeId,
            title: dependency.fileName,
            type: 'file',
            sections,
            metadata: {
                filePath: dependency.filePath,
                fileName: dependency.fileName,
                outgoingDependencies: dependency.outgoingDependencies,
                incomingDependencies: dependency.incomingDependencies
            }
        });
    });
    // Second pass: create edges
    dependencies.forEach(dependency => {
        const sourceNodeId = nodeMap.get(dependency.filePath);
        if (!sourceNodeId) {
            return;
        }
        // Create outgoing dependency edges
        if (dependency.outgoingDependencies) {
            dependency.outgoingDependencies.forEach((target) => {
                const targetNodeId = nodeMap.get(target);
                if (targetNodeId) {
                    edges.push({
                        source: sourceNodeId,
                        target: targetNodeId,
                        type: 'dependency',
                        metadata: {
                            direction: 'outgoing'
                        }
                    });
                }
            });
        }
        // Create incoming dependency edges
        if (dependency.incomingDependencies) {
            dependency.incomingDependencies.forEach((source) => {
                const sourceId = nodeMap.get(source);
                if (sourceId) {
                    edges.push({
                        source: sourceId,
                        target: sourceNodeId,
                        type: 'dependency',
                        metadata: {
                            direction: 'incoming'
                        }
                    });
                }
            });
        }
    });
    return {
        nodes,
        edges,
        metadata: {
            projectType: 'typescript',
            projectName: 'TypeScript Project',
            convertedAt: new Date().toISOString(),
            originalFormat: {}
        }
    };
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


// src/converter/types.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeScriptParser = void 0;
// src/parsers/typescript/typescript-parser.ts
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(4));
const path = __importStar(__webpack_require__(3));
const cp = __importStar(__webpack_require__(11));
const base_parser_1 = __webpack_require__(12);
/**
 * Parser for TypeScript/JavaScript projects
 */
class TypeScriptParser extends base_parser_1.BaseParser {
    language = 'typescript';
    /**
     * Parse the TypeScript project and generate language-specific dependencies
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the TypeScript-specific dependencies
     */
    async parseToLanguageSpecific(projectType) {
        const rootFolder = projectType.rootPath;
        // Ensure output directory exists
        const outputDir = path.join(rootFolder, '.vscode');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputFilePath = path.join(outputDir, 'language-dependencies.json');
        // Delete existing output file if it exists
        if (fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
        }
        // Path to the TypeScript parser script (shipped with the extension)
        const tsParserPath = this.getTypeScriptParserPath();
        // Determine Node.js executable
        const nodePath = await this.getNodePath();
        // Build command to run the TypeScript parser
        const command = `"${nodePath}" "${tsParserPath}" --input "${rootFolder}" --output "${outputFilePath}"`;
        // Show progress notification
        vscode.window.showInformationMessage(`Analyzing TypeScript/JavaScript project in ${rootFolder}...`);
        // Run TypeScript parser
        await this.executeCommand(command, outputDir);
        // Check if output file was generated
        if (!fs.existsSync(outputFilePath)) {
            throw new Error('Failed to generate TypeScript dependencies');
        }
        // Parse the output file
        const tsOutputJson = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));
        // Return the TypeScript-specific dependencies
        return tsOutputJson;
    }
    /**
     * Get the path to the TypeScript parser script
     * @returns The path to the TypeScript parser script
     */
    getTypeScriptParserPath() {
        // The extension context provides the path to the extension's installation directory
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.dependency-analytics')?.extensionPath;
        if (!extensionPath) {
            throw new Error('Could not determine extension path');
        }
        // The TypeScript parser script is in the extension's resources/parsers/typescript directory
        const tsParserPath = path.join(extensionPath, 'resources', 'parsers', 'typescript', 'ts-parser.js');
        // Verify that the parser exists
        if (!fs.existsSync(tsParserPath)) {
            throw new Error(`TypeScript parser not found at ${tsParserPath}`);
        }
        return tsParserPath;
    }
    /**
     * Get the Node.js executable path
     * @returns A promise that resolves to the Node.js executable path
     */
    async getNodePath() {
        // Try to get from settings first
        const config = vscode.workspace.getConfiguration('dependencyAnalytics');
        const nodePath = config.get('nodePath');
        if (nodePath) {
            return nodePath;
        }
        // Fall back to 'node' on PATH
        return 'node';
    }
    /**
     * Execute a command as a Promise
     * @param command The command to execute
     * @param cwd The working directory for the command
     * @returns A promise that resolves when the command completes
     */
    executeCommand(command, cwd) {
        return new Promise((resolve, reject) => {
            cp.exec(command, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Command execution error: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.warn(`Command stderr: ${stderr}`);
                }
                console.log(`Command stdout: ${stdout}`);
                resolve();
            });
        });
    }
}
exports.TypeScriptParser = TypeScriptParser;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map