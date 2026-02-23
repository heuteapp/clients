import HeuteBoardSection from "./board-section";

export class HeuteBoardLayout {
    readonly #id: string;
    readonly #sections: HeuteBoardSection[];

    constructor(id: string, sections: HeuteBoardSection[]) {
        this.#id = id;
        this.#sections = sections;
    }

    public get id(): string {
        return this.#id;
    }

    public get sections(): HeuteBoardSection[] {
        return this.#sections;
    }

    //

    public static copy(layout: HeuteBoardLayout): HeuteBoardLayout {
        const sectionsCopy = layout.sections.map(section => HeuteBoardSection.copy(section));
        return new HeuteBoardLayout(layout.id, sectionsCopy);
    }
}

export default HeuteBoardLayout;