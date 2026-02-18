import { createGrid, createLayout } from "@/src/data/dayboard";
import { HeuteDayboardLayouts } from "./dayboardLayouts";

export class HeuteDayboard {
    #layouts : HeuteDayboardLayouts;

    constructor() {
        this.#layouts = new HeuteDayboardLayouts();

        this.#layouts.add(
            createLayout("default", {
                grids: [
                    createGrid("first", {
                        size: { cols: 18, rows: 4 },
                        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 },
                        contentPlacement: {
                            align: "end"
                        }
                    }),
                    createGrid("second", {
                        size: { cols: 18, rows: 4 },
                        bounds: { x1: 0, y1: 50, x2: 100, y2: 100 },
                        contentPlacement: {
                            align: "start"
                        }
                    }),
                ],
            })
        );
    }

    public get layouts(): HeuteDayboardLayouts {
        return this.#layouts;
    }
}