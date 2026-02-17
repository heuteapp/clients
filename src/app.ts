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
    }

    public get layouts(): HeuteDayboardLayouts {
        return this.#layouts;
    }
}

class HeuteDayboardLayouts {
    #cache = new Map<string, DayboardLayout>();

    public add(layout: DayboardLayout) {
        if (this.#cache.has(layout.id)) {
            throw new Error(`Layout with id ${layout.id} already exists`);
        }

        this.#cache.set(layout.id, layout);
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