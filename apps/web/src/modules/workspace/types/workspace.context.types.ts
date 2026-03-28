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
    categories: WorkspaceCategory[];
}

//

export class WorkspaceDailyboardCache {
    private map: Map<string, Map<string, WorkspaceDailyboard>>;

    constructor() {
        this.map = new Map();
    }

    set(category: string, date: string, dailyboard: WorkspaceDailyboard) {
        if (!this.map.has(category)) {
            this.map.set(category, new Map());
        }
        this.map.get(category)!.set(date, dailyboard);
    }

    get(category: string, date: string): WorkspaceDailyboard | undefined {
        return this.map.get(category)?.get(date);
    }

    has(category: string, date: string): boolean {
        return this.map.has(category) && this.map.get(category)!.has(date);
    }

    delete(category: string, date: string) {
        const categoryMap = this.map.get(category);
        if (!categoryMap) return false;
        
        const deleted = categoryMap.delete(date);
        
        if (categoryMap.size === 0) {
            this.map.delete(category);
        }
        
        return deleted;
    }

    clear() {
        this.map.clear();
    }
}

export type WorkspaceDailyboardsMap = Map<string, Map<string, WorkspaceDailyboard>>;