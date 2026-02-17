import { createGrid, createLayout, DayboardLayout } from "./data/dayboard";

class HeuteApp {
    #dayboard = new HeuteDayboard();

    constructor() {
    }

    public get dayboard(): HeuteDayboard {
        return this.#dayboard;
    }
}

class HeuteDayboard {
    #layouts = new HeuteDayboardLayouts();

    constructor() {
        this.#layouts.add(
            createLayout("default", {
                grids: [
                    createGrid("first", {
                        size: { cols: 12, rows: 6 },
                        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 },
                    }),
                    createGrid("second", {
                        size: { cols: 12, rows: 6 },
                        bounds: { x1: 0, y1: 50, x2: 100, y2: 100 },
                    }),
                ],
            })
        );
    }

    public get layouts(): HeuteDayboardLayouts {
        return this.#layouts;
    }
}

class HeuteDayboardLayouts {
    #cache = new Map<string, DayboardLayout>();

    public add(...layouts: DayboardLayout[]) {
        for (const layout of layouts) {
            if (this.#cache.has(layout.id)) {
                throw new Error(`Layout with id ${layout.id} already exists`);
            }

            this.#cache.set(layout.id, layout);
        }
    }

    public get(id: string): DayboardLayout | undefined {
        return this.#cache.get(id);
    }

    public delete(id: string): boolean {
        return this.#cache.delete(id);
    }

    public list(): DayboardLayout[] {
        return Array.from(this.#cache.values());
    }
}