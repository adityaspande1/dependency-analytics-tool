// src/parsers/java/java-parser.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';
import { BaseParser } from '../base-parser';
import { ProjectType } from '../../core/types';

/**
 * Parser for Java projects
 */
export class JavaParser extends BaseParser {
    protected language = 'java';
    
    /**
     * Parse the Java project and generate language-specific dependencies
     * @param projectType Information about the project to parse
     * @returns A promise that resolves to the Java-specific dependencies
     */
    protected async parseToLanguageSpecific(projectType: ProjectType): Promise<any> {
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
        
        const outputFilePath = path.join(outputDir, 'dependencies.json');
        
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
    private getJavaParserPath(): string {
        // The extension context provides the path to the extension's installation directory
        const extensionPath = vscode.extensions.getExtension('Optivance.dependency-analytics-tool')?.extensionPath;
        
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