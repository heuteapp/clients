import { GridSize, Placement, Rect } from "@heuteapp/common";

export class HeuteBoardSection {
    readonly #id : string;

    #size: GridSize;
    #position : Rect;
    #placement : Placement;

    constructor(
        id: string, 
        props: HeuteBoardSectionProps
    ) {        
        this.#id = id;
        this.#size = this.doSize(props.size);
        this.#position = this.doPosition(props.position);
        this.#placement = this.doPlacement(props.placement || { horizontal: "center", vertical: "center" });
    }

    public getId() : string {
        return this.#id;
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

    private doSize(size: GridSize) : GridSize {
        const cols = Math.max(1, size.cols);
        const rows = Math.max(1, size.rows);

        return Object.freeze({ cols, rows });
    }

    private doPosition(position: Rect) : Rect {
        const x = position.x;
        const y = position.y;
        const width = Math.max(0, position.width);
        const height = Math.max(0, position.height);

        return Object.freeze({ x, y, width, height });
    }

    private doPlacement(placement: Placement) : Placement {
        const horizontal = placement.horizontal || "center";
        const vertical = placement.vertical || "center";

        return Object.freeze({ horizontal, vertical });
    }
}

export default HeuteBoardSection;

//

export interface HeuteBoardSectionProps {
    size: GridSize;
    position: Rect;
    placement?: Placement;
}