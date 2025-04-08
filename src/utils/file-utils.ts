import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * Utility functions for file operations
 */
export class FileUtils {
    /**
     * Ensure a directory exists, creating it if necessary
     * @param dirPath The directory path
     */
    public static ensureDirectoryExists(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
    
    /**
     * Write data to a JSON file
     * @param filePath The file path
     * @param data The data to write
     */
    public static writeJsonFile<T>(filePath: string, data: T): void {
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
    public static readJsonFile<T>(filePath: string): T | null {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content) as T;
        } catch (error) {
            console.error(`Error reading JSON file ${filePath}:, error`);
            return null;
        }
    }
    
    /**
     * Find files in the workspace
     * @param globPattern The glob pattern to search for
     * @returns A promise that resolves to the matching files
     */
    public static async findFiles(globPattern: string): Promise<vscode.Uri[]> {
        return await vscode.workspace.findFiles(globPattern);
    }
    
    /**
     * Find a file by name in the workspace
     * @param fileName The file name to search for
     * @returns A promise that resolves to the file URI, or null if not found
     */
    public static async findFileByName(fileName: string): Promise<vscode.Uri | null> {
        const files = await this.findFiles(`**/${fileName}`);
        
        if (files.length === 0) {
            return null;
        }
        
        return files[0];
    }
}