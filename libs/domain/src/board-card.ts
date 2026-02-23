import { GridRect } from "@heuteapp/common";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardCard {
    #id : string;
    #section : HeuteBoardSection;
    #position : GridRect;
    #title : string | null;

    constructor(id: string, props: HeuteBoardCardProps) {
        this.#id = this.doId(id);
        this.#section = this.doSection(props.section);
        this.#position = this.doPosition(props.position);
        this.#title = this.doTitle(props.title);
    }

    //

    public get id() : string {
        return this.#id;
    }

    public get section() : HeuteBoardSection {
        return this.#section;
    }

    public get position() : GridRect {
        return this.#position;
    }

    public get title() : string | null {
        return this.#title;
    }

    //

    public set id(id: string) {
        this.#id = this.doId(id);
    }

    public set section(section: HeuteBoardSection) {
        this.#section = this.doSection(section);
    }

    public set position(position: GridRect) {
        this.#position = this.doPosition(position);
    }

    public set title(title: string | null) {
        this.#title = this.doTitle(title);
    }

    //

    public doId(id?: string) : string {
        if (!id) {
            throw new Error("ID is required for board card.");
        }

        return id;
    }

    public doSection(section?: HeuteBoardSection) : HeuteBoardSection {
        if (!section) {
            throw new Error("Section is required for board card.");
        }

        return section;
    }

    public doPosition(position?: GridRect) : GridRect {
        position = position || { col: 0, row: 0, colSpan: 1, rowSpan: 1 };

        const col = Math.max(0, position.col);
        const row = Math.max(0, position.row);
        const colSpan = Math.max(1, position.colSpan);
        const rowSpan = Math.max(1, position.rowSpan);

        if (position) {
            return Object.freeze({ col, row, colSpan, rowSpan });
        }

        throw new Error("Position is required for board card.");
    }

    public doTitle(title?: string | null) : string | null {
        title = title || null;

        return title;
    }
}

export default HeuteBoardCard;

//

export interface HeuteBoardCardProps {
    section: HeuteBoardSection;
    position: GridRect;
    title: string | null;
}