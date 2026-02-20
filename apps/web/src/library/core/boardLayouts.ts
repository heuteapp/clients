import { BoardLayoutModel } from "@/src/library/models";

export class HeuteBoardLayouts {
    #cache = new Map<string, BoardLayoutModel>();

    public add(...layouts: BoardLayoutModel[]) {
        for (const layout of layouts) {
            if (this.#cache.has(layout.id)) {
                throw new Error(`Layout with id ${layout.id} already exists`);
            }

            this.#cache.set(layout.id, layout);
        }
    }

    public get(id: string): BoardLayoutModel | undefined {
        return this.#cache.get(id);
    }

    public delete(id: string): boolean {
        return this.#cache.delete(id);
    }

    public list(): BoardLayoutModel[] {
        return Array.from(this.#cache.values());
    }
}

export default HeuteBoardLayouts;