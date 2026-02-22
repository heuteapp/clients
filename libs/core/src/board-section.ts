import { Placement, Rect } from "@heuteapp/common";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardSection {
    readonly #id : string;
    readonly #layout : HeuteBoardLayout;

    #cols : number;
    #rows : number;
    #position : Rect;
    #placement : Placement = { horizontal: "center", vertical: "center" };

    constructor(id: string, layout: HeuteBoardLayout, cols: number, rows: number, position: Rect) {        
        this.#id = id;
        this.#layout = layout;
        this.#cols = cols;
        this.#rows = rows;
        this.#position = position;
    }

    public getId() : string {
        return this.#id;
    }

    public getLayout() : HeuteBoardLayout {
        return this.#layout;
    }

    //

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

    //

    public resize(cols: number, rows: number) {
        this.#cols = cols;
        this.#rows = rows;
    }

    public move(position: Rect) {
        this.#position = position;
    }

    public setPlacement(placement: Placement) {
        this.#placement = placement;
    }
}

export default HeuteBoardSection;