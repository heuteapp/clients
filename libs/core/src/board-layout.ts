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
}

export default HeuteBoardLayout;