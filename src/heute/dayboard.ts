import { assignLayout, assignField } from "@/src/data/dayboard";
import { HeuteDayboardLayouts } from "./dayboardLayouts";

export class HeuteDayboard {
    #layouts : HeuteDayboardLayouts;

    constructor() {
        this.#layouts = new HeuteDayboardLayouts();

        this.#layouts.add(
            assignLayout("default", {
                fields: [
                    assignField("first", {
                        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 },
                        grid: { cols: 15, rows: 4 }

                    }),
                    assignField("second", {
                        bounds: { x1: 0, y1: 50, x2: 100, y2: 100 },
                        grid: { cols: 15, rows: 4 }
                    }),
                ],
            })
        );
    }

    public get layouts(): HeuteDayboardLayouts {
        return this.#layouts;
    }
}