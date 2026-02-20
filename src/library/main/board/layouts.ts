import { DayboardLayoutData } from "@/src/data/dayboard";

export default class {
    #cache = new Map<string, DayboardLayoutData>();

    public add(...layouts: DayboardLayoutData[]) {
        for (const layout of layouts) {
            if (this.#cache.has(layout.id)) {
                throw new Error(`Layout with id ${layout.id} already exists`);
            }

            this.#cache.set(layout.id, layout);
        }
    }

    public get(id: string): DayboardLayoutData | undefined {
        return this.#cache.get(id);
    }

    public delete(id: string): boolean {
        return this.#cache.delete(id);
    }

    public list(): DayboardLayoutData[] {
        return Array.from(this.#cache.values());
    }
}