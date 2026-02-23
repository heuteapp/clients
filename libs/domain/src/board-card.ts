import { GridRect } from "@heuteapp/common";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardCard {
    #id : string;
    #section : HeuteBoardSection;
    #position : GridRect;
    #title : string | null;

    constructor(id: string, section: HeuteBoardSection, position: GridRect) {
        this.#id = id;
        this.#section = section;
        this.#position = position;
        this.#title = null;
    }

    public getId(): string {
        return this.#id;
    }

    //

    public get section(): HeuteBoardSection {
        return this.#section;
    }

    public get position(): GridRect {
        return this.#position;
    }

    public get title(): string | null {
        return this.#title;
    }

    //

    public set section(section: HeuteBoardSection) {
        this.#section = section;
    }

    public set position(position: GridRect) {
        this.#position = position;
    }

    public set title(title: string | null) {
        this.#title = title;
    }

    //

    public doSection(section?: HeuteBoardSection) : HeuteBoardSection {
        if (section) {
            return section;
        }

        throw new Error("Section is required for board card.");
    }

    public doPosition(position?: GridRect) : GridRect {
        position = position || { col: -1, row: -1, colSpan: 0, rowSpan: 0 };

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
}