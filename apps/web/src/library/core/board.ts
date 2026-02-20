import { boardLayout, boardField } from "@/src/library/models";
import HeuteBoardLayouts from "./boardLayouts";

export class HeuteBoard {
    #layouts : HeuteBoardLayouts;

    constructor() {
        this.#layouts = new HeuteBoardLayouts();

        this.#layouts.add(
            boardLayout("default", {
                fields: [
                    boardField("first", {
                        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 },
                        grid: { cols: 18, rows: 4 }

                    }),
                    boardField("second", {
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

export default HeuteBoard;