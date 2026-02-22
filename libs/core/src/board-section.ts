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
        props: HeuteBoardSectionProps
    ) {        
        this.#id = id;
        this.#layout = layout;
        this.#size = this.doSize(props.size);
        this.#position = this.doPosition(props.position);
        this.#placement = this.doPlacement(props.placement || { horizontal: "center", vertical: "center" });
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

    public setSize(size: GridSize) {
        this.#size = this.doSize(size);
    }

    public setPosition(position: Rect) {
        this.#position = this.doPosition(position);
    }

    public setPlacement(placement: Placement) {
        this.#placement = this.doPlacement(placement);
    }

    //

    private doSize(size: GridSize) : GridSize {
        return Object.freeze({ ...size });
    }

    private doPosition(position: Rect) : Rect {
        return Object.freeze({ ...position });
    }

    private doPlacement(placement: Placement) : Placement {
        return Object.freeze({ ...placement });
    }
}

export default HeuteBoardSection;

//

export interface HeuteBoardSectionProps {
    size: GridSize;
    position: Rect;
    placement?: Placement;
}