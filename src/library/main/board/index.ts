import { assignLayout, assignField } from "@/src/data/dayboard";
import HeuteBoardLayouts from "./layouts";

export default class {
    #layouts : HeuteBoardLayouts;

    constructor() {
        this.#layouts = new HeuteBoardLayouts();

        this.#layouts.add(
            assignLayout("default", {
                fields: [
                    assignField("first", {
                        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 },
                        grid: { cols: 18, rows: 4 }

                    }),
                    assignField("second", {
                        bounds: { x1: 0, y1: 50, x2: 100, y2: 100 },
                        grid: { cols: 18, rows: 4 }
                    }),
                ],
            })
        );
    }

    public get layouts(): HeuteBoardLayouts {
        return this.#layouts;
    }
}