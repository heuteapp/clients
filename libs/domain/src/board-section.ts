import { GridSize, Placement, Rect } from "@heuteapp/common";

export class HeuteBoardSection {
    #id : string;
    #size: GridSize;
    #position : Rect;
    #placement : Placement;

    constructor(
        id: string, 
        props: HeuteBoardSectionProps
    ) {        
        this.#id = this.doId(id);
        this.#size = this.doSize(props.size);
        this.#position = this.doPosition(props.position);
        this.#placement = this.doPlacement(props.placement);
    }

    public get id() : string {
        return this.#id;
    }

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

    private set id(id: string | undefined) {
        this.#id = this.doId(id);
    }

    private set size(size: GridSize | undefined) {
        this.#size = this.doSize(size);
    }

    private set position(position: Rect | undefined) {
        this.#position = this.doPosition(position);
    }

    private set placement(placement: Placement | undefined) {
        this.#placement = this.doPlacement(placement);
    }

    //

    _changeId(id?: string) {
        this.id = id;
    }

    _setSize(size?: GridSize) {
        this.size = size;
    }

    _setPosition(position?: Rect) {
        this.position = position;
    }

    _setPlacement(placement?: Placement) {
        this.placement = placement;
    }

    //

    private doId(id?: string) : string {
        if (!id) {
            throw new Error("ID is required for board section.");
        }

        return id;
    }

    private doSize(size?: GridSize) : GridSize {
        const cols = size ? Math.max(1, size.cols) : 1;
        const rows = size ? Math.max(1, size.rows) : 1;

        return Object.freeze({ cols, rows });
    }

    private doPosition(position?: Rect) : Rect {
        const x = position?.x ?? 0;
        const y = position?.y ?? 0;
        const width = position ? Math.max(0, position.width) : 0;
        const height = position ? Math.max(0, position.height) : 0;

        return Object.freeze({ x, y, width, height });
    }

    private doPlacement(placement?: Placement) : Placement {
        const horizontal = placement?.horizontal || "center";
        const vertical = placement?.vertical || "center";

        return Object.freeze({ horizontal, vertical });
    }

    //

    public static copy(section: HeuteBoardSection): HeuteBoardSection {
        const id = section.id;
        const props = {
            size: section.size,
            position: section.position,
            placement: section.placement
        }

        return new HeuteBoardSection(id, props);
    }
}

export default HeuteBoardSection;

//

export interface HeuteBoardSectionProps {
    size: GridSize;
    position: Rect;
    placement?: Placement;
}