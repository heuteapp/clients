import HeuteBoardSection, { HeuteBoardSectionSnapshot } from "./board-section";

export class HeuteBoardLayout {
    #id: string;
    #sections: HeuteBoardSection[];

    constructor(id: string, props: HeuteBoardLayoutProps) {
        this.#id = id;
        this.#sections = props.sections.map(section => HeuteBoardSection.fromSnapshot(section));
    }

    public get id() : string {
        return this.#id;
    }

    //

    private set id(id: string) {
        this.#id = id;
    }

    //

    public listSections(): ReadonlyArray<HeuteBoardSection> {
        return [...this.#sections];
    }

    //

    public static copy(layout: HeuteBoardLayout): HeuteBoardLayout {
        const sectionsCopy = layout.listSections().map(section => HeuteBoardSection.copy(section));
        return new HeuteBoardLayout(layout.id, { sections: sectionsCopy });
    }
}

export default HeuteBoardLayout;

export interface HeuteBoardLayoutSnapshot {
    id: string;
    sections: HeuteBoardSectionSnapshot[];
}

export type HeuteBoardLayoutProps = Omit<HeuteBoardLayoutSnapshot, "id">;