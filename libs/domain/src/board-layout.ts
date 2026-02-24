import HeuteBoardSection, { HeuteBoardSectionSnapshot } from "./board-section";

export class HeuteBoardLayout {
    #id: string;
    #sections: Map<string, HeuteBoardSection> = new Map();

    constructor(id: string, props: HeuteBoardLayoutProps) {
        this.#id = id;
        this.addSections(props.sections);
    }

    public get id() : string {
        return this.#id;
    }

    //

    private set id(id: string) {
        this.#id = id;
    }

    //

    public addSection(section: HeuteBoardSectionSnapshot) {
        if (this.#sections.has(section.id)) {
            throw new Error("Section already exists in board layout.");
        }

        const sectionEntity = HeuteBoardSection.fromSnapshot(section);
        this.#sections.set(sectionEntity.id, sectionEntity);
    }

    public addSections(sections: readonly HeuteBoardSectionSnapshot[]) {
        for (const section of sections) {
            this.addSection(section);
        }
    }

    public getSection(sectionId: string) : HeuteBoardSectionSnapshot {
        const section = this.#sections.get(sectionId);
        if (!section) {
            throw new Error("Section does not exist in board layout.");
        }

        return HeuteBoardSection.toSnapshot(section);
    }

    public getSections() : ReadonlyArray<HeuteBoardSectionSnapshot> {
        return [...this.#sections.values()].map(section => HeuteBoardSection.toSnapshot(section));
    }

    //

    public static fromSnapshot(snapshot: HeuteBoardLayoutSnapshot): HeuteBoardLayout {
        return new HeuteBoardLayout(snapshot.id, {
            sections: snapshot.sections
        });
    }

    public static toSnapshot(layout: HeuteBoardLayout): HeuteBoardLayoutSnapshot {
        return {
            id: layout.id,
            sections: layout.getSections()
        };
    }
}

export default HeuteBoardLayout;

export interface HeuteBoardLayoutSnapshot {
    readonly id: string;
    readonly sections: readonly HeuteBoardSectionSnapshot[];
}

export type HeuteBoardLayoutProps = Omit<HeuteBoardLayoutSnapshot, "id">;