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
        this.#size = this.doSize(cols, rows);
        this.#position = this.doPosition(position);
        this.#placement = this.doPlacement(placement);
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
        this.#size = this.doSize(cols, rows);
    }

    public setPosition(position: Rect) {
        this.#position = this.doPosition(position);
    }

    public setPlacement(placement: Placement) {
        this.#placement = this.doPlacement(placement);
    }

    //

    private doSize(cols: number, rows: number) : GridSize {
        return Object.freeze({ cols, rows });
    }

    private doPosition(position: Rect) : Rect {
        return Object.freeze({ ...position });
    }

    private doPlacement(placement: Placement) : Placement {
        return Object.freeze({ ...placement });
    }
}

export default HeuteBoardSection;