import HeuteBoardSection from "./board-section";

export class HeuteBoardLayout {
    readonly #id: string;
    readonly #sections: HeuteBoardSection[];

    constructor(id: string, props: HeuteBoardLayoutProps) {
        this.#id = id;
        this.#sections = props.sections;
    }

    public get id() : string {
        return this.#id;
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

export interface HeuteBoardLayoutProps {
    sections: HeuteBoardSection[];
}