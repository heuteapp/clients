import { WorkspaceCategoriesMap, WorkspaceCategoryIndex } from "../types/workspace.context.types";
import { WorkspaceCategory } from "../types/workspace.types";


export class WorkspaceCategoryCache {
    private map: WorkspaceCategoriesMap;
    private index: WorkspaceCategoryIndex;
    
    constructor() {
        this.map = new Map();
        this.index = new Map();
    }
    
    set(path: string, category: WorkspaceCategory): void {
        this.map.set(path, category);
        
        const lastSlash = path.lastIndexOf('/');
        if (lastSlash !== -1) {
            const parent = path.substring(0, lastSlash);
            if (!this.index.has(parent)) {
                this.index.set(parent, new Set());
            }
            this.index.get(parent)!.add(path);
        }
    }
    
    get(path: string): WorkspaceCategory | undefined {
        return this.map.get(path);
    }
    
    has(path: string): boolean {
        return this.map.has(path);
    }
    
    getChildren(parentPath: string): WorkspaceCategory[] {
        const childrenPaths = this.index.get(parentPath);
        if (!childrenPaths) return [];
        
        const result: WorkspaceCategory[] = [];
        for (const path of childrenPaths) {
            const category = this.map.get(path);
            if (category) result.push(category);
        }
        return result;
    }
    
    getAllChildren(parentPath: string): WorkspaceCategory[] {
        const result: WorkspaceCategory[] = [];
        const stack = [parentPath];
        
        while (stack.length > 0) {
            const current = stack.pop()!;
            const children = this.index.get(current);
            
            if (children) {
                for (const childPath of children) {
                    const category = this.map.get(childPath);
                    if (category) {
                        result.push(category);
                        stack.push(childPath);
                    }
                }
            }
        }
        
        return result;
    }
    
    delete(path: string): boolean {
        const allChildrenPaths = this.getAllChildrenPaths(path);
        for (const childPath of allChildrenPaths) {
            this.map.delete(childPath);
            this.removeFromIndex(childPath);
        }
        
        const deleted = this.map.delete(path);
        this.removeFromIndex(path);
        
        return deleted;
    }
    
    private getAllChildrenPaths(parentPath: string): string[] {
        const result: string[] = [];
        const stack = [parentPath];
        
        while (stack.length > 0) {
            const current = stack.pop()!;
            const children = this.index.get(current);
            
            if (children) {
                for (const childPath of children) {
                    result.push(childPath);
                    stack.push(childPath);
                }
            }
        }
        
        return result;
    }
    
    private removeFromIndex(path: string): void {
        for (const [parent, children] of this.index) {
            if (children.delete(path)) {
                if (children.size === 0) {
                    this.index.delete(parent);
                }
                break;
            }
        }
    }
    
    getAll(): WorkspaceCategory[] {
        return Array.from(this.map.values());
    }
    
    getPathParts(path: string): string[] {
        return path.split('/');
    }
    
    clear(): void {
        this.map.clear();
        this.index.clear();
    }
    
    size(): number {
        return this.map.size;
    }
}