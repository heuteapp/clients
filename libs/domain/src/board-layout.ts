import HeuteBoardSection, { HeuteBoardSectionSnapshot } from "./board-section";

export class HeuteBoardLayout {
    #id: string;
    #sections: Map<string, HeuteBoardSection> = new Map();

    constructor(id: string, props: HeuteBoardLayoutProps) {
        this.#id = id;

        for (const section of props.sections) {
            const sectionEntity = HeuteBoardSection.fromSnapshot(section);
            this.#sections.set(sectionEntity.id, sectionEntity);
        }
    }

    public get id() : string {
        return this.#id;
    }

    //

    private set id(id: string) {
        this.#id = id;
    }

    //

    public getSection(sectionId: string): HeuteBoardSectionSnapshot {
        const section = this.#sections.get(sectionId);
        if (!section) {
            throw new Error("Section does not exist in board layout.");
        }

        return HeuteBoardSection.toSnapshot(section);
    }

    public getSections(): ReadonlyArray<HeuteBoardSectionSnapshot> {
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
    id: string;
    sections: readonly HeuteBoardSectionSnapshot[];
}

export type HeuteBoardLayoutProps = Omit<HeuteBoardLayoutSnapshot, "id">;