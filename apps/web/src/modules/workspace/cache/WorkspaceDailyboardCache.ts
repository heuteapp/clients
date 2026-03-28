import { WorkspaceDailyboardsMap } from "../types/workspace.context.types";
import { WorkspaceDailyboard } from "../types/workspace.types";

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