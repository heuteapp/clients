import HeuteBoardSection from "./board-section";

export class HeuteBoardLayout {
    readonly #id: string;
    readonly #sections: HeuteBoardSection[];

    constructor(id: string, props: HeuteBoardLayoutProps) {
        this.#id = id;
        this.#sections = props.sections;
    }

    public getId(): string {
        return this.#id;
    }

    public getSections(): ReadonlyArray<HeuteBoardSection> {
        return [...this.#sections];
    }

    //

    public static copy(layout: HeuteBoardLayout): HeuteBoardLayout {
        const id = layout.getId();
        const sectionsCopy = layout.getSections().map(section => HeuteBoardSection.copy(section));
        
        return new HeuteBoardLayout(id, { sections: sectionsCopy });
    }
}

export default HeuteBoardLayout;

export interface HeuteBoardLayoutProps {
    sections: HeuteBoardSection[];
}