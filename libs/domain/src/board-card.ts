import { GridRect } from "@heuteapp/common";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardCard {
    #section : HeuteBoardSection;
    #position : GridRect;
    #content : string | undefined;

    constructor(section: HeuteBoardSection, props: HeuteBoardCardProps) {
        this.#section = section;
        this.#position = props.position;
        this.#content = props.content;
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

//

export interface HeuteBoardCardProps {
    position: GridRect;
    content?: string;
}