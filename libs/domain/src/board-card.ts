import { GridRect } from "@heuteapp/common";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardCard {
    #section : HeuteBoardSection;
    #position : GridRect;
    #content : string | undefined;

    constructor(section: HeuteBoardSection, position: GridRect) {
        this.#section = section;
        this.#position = position;
    }

    public get section(): HeuteBoardSection {
        return this.#section;
    }

    public get position(): GridRect {
        return this.#position;
    }

    public get content(): string | undefined {
        return this.#content;
    }

    public setContent(content: string) {
        this.#content = content;
    }
}

export default HeuteBoardCard;