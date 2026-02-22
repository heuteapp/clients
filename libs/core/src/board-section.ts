import { GridSize, Placement, Rect } from "@heuteapp/common";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardSection {
    readonly #id : string;
    readonly #layout : HeuteBoardLayout;

    #size: GridSize;
    #position : Rect;
    #placement : Placement;

    constructor(
        id: string, 
        layout: HeuteBoardLayout, 
        cols: number, 
        rows: number, 
        position: Rect,
        placement: Placement = { horizontal: "center", vertical: "center" }
    ) {        
        this.#id = id;
        this.#layout = layout;
        this.#size = Object.freeze({ cols, rows });
        this.#position = Object.freeze({ ...position });
        this.#placement = Object.freeze({ ...placement });
    }

    public getId() : string {
        return this.#id;
    }

    public getLayout() : HeuteBoardLayout {
        return this.#layout;
    }

    //

    public get size() : GridSize {
        return this.#size;
    }

    public get position() : Rect {
        return this.#position;
    }
    
    public get placement() : Placement {
        return this.#placement;
    }

    //

    public setSize(cols: number, rows: number) {
        this.#size = Object.freeze({ cols, rows });
    }

    public setPosition(position: Rect) {
        this.#position = Object.freeze({ ...position });
    }

    public setPlacement(placement: Placement) {
        this.#placement = Object.freeze({ ...placement});
    }
}

export default HeuteBoardSection;