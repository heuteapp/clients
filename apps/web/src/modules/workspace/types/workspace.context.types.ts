import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { WorkspaceDailyboard, WorkspaceCategory, WorkspaceMetadata } from "./workspace.types";

export interface WorkspaceContextValue {
    metadata: WorkspaceMetadata;
    breadcrumbs: WorkspaceBreadcrumbs;
    cache: WorkspaceCache;
}

//

export type WorkspaceBreadcrumbs = {
    readonly items: BreadcrumbsItem[];
    setItems: React.Dispatch<React.SetStateAction<BreadcrumbsItem[]>>;

    readonly animate: boolean;
    setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

export type WorkspaceCache = {
    dailyboards: WorkspaceDailyboardCache;
    categories: WorkspaceCategoryCache;
}

//

export class WorkspaceDailyboardCache {
    private map: WorkspaceDailyboardsMap;

    constructor() {
        this.map = new Map();
    }

    set(category: string, date: string, dailyboard: WorkspaceDailyboard): void {
        if (!this.map.has(category)) {
            this.map.set(category, new Map());
        }
        this.map.get(category)!.set(date, dailyboard);
    }

    get(category: string, date: string): WorkspaceDailyboard | undefined {
        return this.map.get(category)?.get(date);
    }

    has(category: string, date: string): boolean {
        return this.map.get(category)?.has(date) ?? false;
    }

    delete(category: string, date: string): boolean {
        const categoryMap = this.map.get(category);
        if (!categoryMap) return false;
        
        const deleted = categoryMap.delete(date);
        
        if (categoryMap.size === 0) {
            this.map.delete(category);
        }
        
        return deleted;
    }
    
    // Faydalı metodlar
    getByCategory(category: string): WorkspaceDailyboard[] {
        const categoryMap = this.map.get(category);
        return categoryMap ? Array.from(categoryMap.values()) : [];
    }
    
    getAll(): WorkspaceDailyboard[] {
        const result: WorkspaceDailyboard[] = [];
        for (const categoryMap of this.map.values()) {
            for (const board of categoryMap.values()) {
                result.push(board);
            }
        }
        return result;
    }
    
    clear(): void {
        this.map.clear();
    }
    
    size(): number {
        let total = 0;
        for (const categoryMap of this.map.values()) {
            total += categoryMap.size;
        }
        return total;
    }
}

export type WorkspaceDailyboardsMap = Map<string, Map<string, WorkspaceDailyboard>>;

//

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

export type WorkspaceCategoriesMap = Map<string, WorkspaceCategory>;
export type WorkspaceCategoryIndex = Map<string, Set<string>>;