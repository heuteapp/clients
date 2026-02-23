import { GridRect } from "@heuteapp/common";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardCard {
    #section : HeuteBoardSection;
    #position : GridRect;
    #title? : string;

    constructor(section: HeuteBoardSection, position: GridRect) {
        this.#section = section;
        this.#position = position;
    }

    //

    public get section(): HeuteBoardSection {
        return this.#section;
    }

    public get position(): GridRect {
        return this.#position;
    }

    public get title(): string | undefined {
        return this.#title;
    }

    //

    public set section(section: HeuteBoardSection) {
        this.#section = section;
    }

    public set position(position: GridRect) {
        this.#position = position;
    }

    public set title(title: string | undefined) {
        this.#title = title;
    }
}

export default HeuteBoardCard;