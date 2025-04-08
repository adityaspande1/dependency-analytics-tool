// src/parsers/typescript/typescript-parser.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';
import { BaseParser } from '../base-parser';
import { ProjectType } from '../../core/types';

/**
 * Parser for TypeScript/JavaScript projects
 */
export class TypeScriptParser extends BaseParser {
    protected language = 'typescript';
    
    /**
     * Parse the TypeScript project and generate language-specific dependencies
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the TypeScript-specific dependencies
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
    private getTypeScriptParserPath(): string {
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
    private async getNodePath(): Promise<string> {
        // Try to get from settings first
        const config = vscode.workspace.getConfiguration('dependencyAnalytics');
        const nodePath = config.get<string>('nodePath');
        
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
