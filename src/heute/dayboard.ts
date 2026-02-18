import { assignGrid, assignLayout } from "@/src/data/dayboard";
import { HeuteDayboardLayouts } from "./dayboardLayouts";

export class HeuteDayboard {
    #layouts : HeuteDayboardLayouts;

    constructor() {
        this.#layouts = new HeuteDayboardLayouts();

        this.#layouts.add(
            assignLayout("default", {
                grids: [
                    assignGrid("first", {
                        size: { cols: 15, rows: 4 },
                        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 }
                    }),
                    assignGrid("second", {
                        size: { cols: 15, rows: 4 },
                        bounds: { x1: 0, y1: 50, x2: 100, y2: 100 }
                    }),
                ],
            })
        );
    }

    public get layouts(): HeuteDayboardLayouts {
        return this.#layouts;
    }
}