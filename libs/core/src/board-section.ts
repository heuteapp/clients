import { Placement, Rect } from "@heuteapp/common";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardSection {
    readonly #id : string;
    readonly #layout : HeuteBoardLayout;
    
    #cols : number;
    #rows : number;
    #position : Rect = { x: 0, y: 0, width: 0, height: 0 };
    #placement : Placement = { horizontal: "center", vertical: "center" };

    constructor(id: string, layout: HeuteBoardLayout, cols: number, rows: number) {        
        this.#id = id;
        this.#layout = layout;
        this.#cols = cols;
        this.#rows = rows;
    }

    public get id() : string {
        return this.#id;
    }

    public get layout() : HeuteBoardLayout {
        return this.#layout;
    }

    public get cols() : number {
        return this.#cols;
    }

    public get rows() : number {
        return this.#rows;
    }

    public get position() : Rect {
        return this.#position;
    }
    
    public get placement() : Placement {
        return this.#placement;
    }
}

export default HeuteBoardSection;