// src/parsers/python/python-parser.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';
import { BaseParser } from '../base-parser';
import { ProjectType } from '../../core/types';

/**
 * Parser for Python projects
 */
export class PythonParser extends BaseParser {
    protected language = 'python';
    
    /**
     * Parse the Python project and generate language-specific dependencies
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the Python-specific dependencies
     */
    protected async parseToLanguageSpecific(projectType: ProjectType): Promise<any> {
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
        
        // Path to the Python parser script (shipped with the extension)
        const pythonParserPath = this.getPythonParserPath();
        
        // Determine the Python executable
        const pythonExecutable = await this.getPythonExecutable();
        
        // Build command to run the Python parser
        const command = `"${pythonExecutable}" "${pythonParserPath}" "${rootFolder}" "${outputFilePath}"`;
        
        // Show progress notification
        vscode.window.showInformationMessage(`Analyzing Python project in ${rootFolder}...`);
        
        // Run Python parser
        await this.executeCommand(command, outputDir);
        
        // Check if output file was generated
        if (!fs.existsSync(outputFilePath)) {
            throw new Error('Failed to generate Python dependencies');
        }
        
        // Parse the output file
        const pythonOutputJson = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));
        
        // Return the Python-specific dependencies
        return pythonOutputJson;
    }
    
    /**
     * Get the path to the Python parser script
     * @returns The path to the Python parser script
     */
    private getPythonParserPath(): string {
        // The extension context provides the path to the extension's installation directory
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.dependency-analytics')?.extensionPath;
        
        if (!extensionPath) {
            throw new Error('Could not determine extension path');
        }
        
        // The Python parser script is in the extension's resources/parsers/python directory
        const pythonParserPath = path.join(extensionPath, 'resources', 'parsers', 'python', 'python_parser.py');
        
        // Verify that the parser exists
        if (!fs.existsSync(pythonParserPath)) {
            throw new Error(`Python parser not found at ${pythonParserPath}`);
        }
        
        return pythonParserPath;
    }
    
    /**
     * Get the Python executable path
     * @returns A promise that resolves to the Python executable path
     */
    private async getPythonExecutable(): Promise<string> {
        // Try to get from settings first
        const config = vscode.workspace.getConfiguration('dependencyAnalytics');
        let pythonPath = config.get<string>('pythonPath');
        
        if (pythonPath) {
            return pythonPath;
        }
        
        // Try to get the Python extension's selected interpreter
        try {
            const extension = vscode.extensions.getExtension('ms-python.python');
            if (extension) {
                const pythonExtension = await extension.activate();
                if (pythonExtension && pythonExtension.exports) {
                    const api = pythonExtension.exports;
                    pythonPath = api.getActiveInterpreterPath?.();
                    if (pythonPath) {
                        return pythonPath;
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to get Python interpreter from Python extension:', error);
        }
        
        // Fall back to 'python3' or 'python' on PATH
        return process.platform === 'win32' ? 'python' : 'python3';
    }
    
    /**
     * Execute a command as a Promise
     * @param command The command to execute
     * @param cwd The working directory for the command
     * @returns A promise that resolves when the command completes
     */
    private executeCommand(command: string, cwd: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
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