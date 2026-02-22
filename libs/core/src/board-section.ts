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

    public set cols(cols: number) {
        if(cols < 1) {
            this.#cols = 1;
            return;
        }

        this.#cols = cols;
    }

    public get rows() : number {
        return this.#rows;
    }

    public set rows(rows: number) {
        if(rows < 1) {
            this.#rows = 1;
            return;
        }

        this.#rows = rows;
    }

    public get position() : Rect {
        return this.#position;
    }

    public set position(position: Rect) {
        this.#position = position;
    }
    
    public get placement() : Placement {
        return this.#placement;
    }

    public set placement(placement: Placement) {
        this.#placement = placement;
    }
}

export default HeuteBoardSection;