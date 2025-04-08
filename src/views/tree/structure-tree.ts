// src/views/tree/structure-tree.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { Node, Section, Item } from '../../converter/types';

/**
 * Tree view provider for displaying the structure of a node
 */
export class StructureTreeProvider implements vscode.TreeDataProvider<StructureTreeItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<StructureTreeItem | undefined | void>();
    
    /**
     * Event fired when the tree data changes
     */
    public readonly onDidChangeTreeData = this._onDidChangeTreeData.event;
    
    /**
     * The node to show the structure of, if any
     */
    private currentNode: Node | null = null;
    
    constructor() {}
    
    /**
     * Set the node to show the structure of
     * @param node The node
     */
    public setNode(node: Node | null): void {
        this.currentNode = node;
        this.refresh();
    }
    
    /**
     * Refresh the tree view
     */
    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }
    
    /**
     * Get the tree item for the given element
     * @param element The tree item to get
     * @returns The tree item
     */
    public getTreeItem(element: StructureTreeItem): vscode.TreeItem {
        return element;
    }
    
    /**
     * Get the children of the given element
     * @param element The element to get children for
     * @returns A promise that resolves to the children
     */
    public getChildren(element?: StructureTreeItem): Thenable<StructureTreeItem[]> {
        if (!this.currentNode) {
            return Promise.resolve([]);
        }
        
        if (!element) {
            // Root level - show sections
            const sections = this.currentNode.sections || [];
            
            return Promise.resolve(
                sections.map(section => new SectionTreeItem(section))
            );
        } else if (element instanceof SectionTreeItem) {
            // Section level - show items
            const items = element.section.items || [];
            
            return Promise.resolve(
                items.map(item => new ItemTreeItem(item, this.currentNode!))
            );
        }
        
        // No more children
        return Promise.resolve([]);
    }
}

/**
 * Base tree item for the structure tree
 */
abstract class BaseStructureTreeItem extends vscode.TreeItem {
    constructor(
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
    
    /**
     * Get the icon path for an icon name
     * @param iconName The icon name
     * @returns The icon path
     */
    protected getIconPath(iconName: string): { light: vscode.Uri; dark: vscode.Uri } {
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
class SectionTreeItem extends BaseStructureTreeItem implements StructureTreeItem {
    constructor(
        public readonly section: Section
    ) {
        super(
            section.name, 
            section.items && section.items.length > 0
                ? vscode.TreeItemCollapsibleState.Expanded
                : vscode.TreeItemCollapsibleState.None
        );
        
        this.contextValue = 'section';
        this.iconPath = this.getIconPath('folder');
    }
}

/**
 * Tree item representing an item in the structure tree
 */
class ItemTreeItem extends BaseStructureTreeItem implements StructureTreeItem {
    constructor(
        public readonly item: Item,
        public readonly parentNode: Node
    ) {
        super(item.value, vscode.TreeItemCollapsibleState.None);
        
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

/**
 * Interface for structure tree items
 */
export interface StructureTreeItem extends vscode.TreeItem {
}

/**
 * Type alias for concrete structure tree items
 */
export type StructureTreeItemType = SectionTreeItem | ItemTreeItem;