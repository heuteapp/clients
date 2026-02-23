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

    public listSections(): ReadonlyArray<HeuteBoardSectionSnapshot> {
        return this.#sections.map(section => HeuteBoardSection.toSnapshot(section));
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
            sections: layout.listSections()
        };
    }
}

export default HeuteBoardLayout;

export interface HeuteBoardLayoutSnapshot {
    id: string;
    sections: readonly HeuteBoardSectionSnapshot[];
}

export type HeuteBoardLayoutProps = Omit<HeuteBoardLayoutSnapshot, "id">;