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
        this.#id = this.validateId(id);
        this.#size = this.normalizeSize(props.size);
        this.#position = this.normalizePosition(props.position);
        this.#placement = this.normalizePlacement(props.placement);
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
        this.#id = this.validateId(id);
    }

    private set size(size: GridSize | undefined) {
        this.#size = this.normalizeSize(size);
    }

    private set position(position: Rect | undefined) {
        this.#position = this.normalizePosition(position);
    }

    private set placement(placement: Placement | undefined) {
        this.#placement = this.normalizePlacement(placement);
    }

    //

    _changeId(id: string | undefined) {
        this.id = id;
    }

    _resize(size: GridSize | undefined) {
        this.size = size;
    }
    
    _move(position: Rect | undefined) {
        this.position = position;
    }

    _changePlacement(placement: Placement | undefined) {
        this.placement = placement;
    }

    //

    private validateId(id?: string) : string {
        if (!id) {
            throw new Error("ID is required for board section.");
        }

        return id;
    }

    private normalizeSize(size?: GridSize) : GridSize {
        if (!size) {
            throw new Error("Size is required for board section.");
        }
        
        return Object.freeze({
            cols: Math.max(1, size.cols),
            rows: Math.max(1, size.rows)
        });
    }

    private normalizePosition(position?: Rect) : Rect {
        if(!position) {
            throw new Error("Position is required for board section.");
        }

        return Object.freeze({ 
            x: Math.max(0, position.x),
            y: Math.max(0, position.y),
            width: Math.max(1, position.width),
            height: Math.max(1, position.height)
         });
    }

    private normalizePlacement(placement?: Placement) : Placement {
        const horizontal = placement?.horizontal ?? "center";
        const vertical = placement?.vertical ?? "center";

        return Object.freeze({ 
            horizontal: horizontal === "start" || horizontal === "center" || horizontal === "end" ? horizontal : "center", 
            vertical: vertical === "start" || vertical === "center" || vertical === "end" ? vertical : "center"
        });
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