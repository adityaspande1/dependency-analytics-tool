import * as cp from 'child_process';
import * as vscode from 'vscode';

/**
 * Utility functions for command execution
 */
export class CommandUtils {
    /**
     * Execute a command as a Promise
     * @param command The command to execute
     * @param cwd The working directory for the command
     * @returns A promise that resolves to the command output
     */
    public static executeCommand(command: string, cwd: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
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
    public static async executeCommandWithProgress(command: string, cwd: string, title: string): Promise<string> {
        return await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title,
                cancellable: false
            },
            async (progress) => {
                progress.report({ message: 'Executing command...' });
                
                try {
                    const result = await this.executeCommand(command, cwd);
                    return result;
                } catch (error) {
                    throw error;
                }
            }
        );
    }
}