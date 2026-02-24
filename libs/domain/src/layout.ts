import HeuteLayoutSection, { HeuteLayoutSectionSnapshot } from "./layout-section";

export class HeuteLayout {
    #id: string;
    #sections: Map<string, HeuteLayoutSection> = new Map();

    constructor(id: string, props: HeuteLayoutProps) {
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

    public addSection(section: HeuteLayoutSectionSnapshot) {
        if (this.#sections.has(section.id)) {
            throw new Error("Section already exists in board layout.");
        }

        const sectionEntity = HeuteLayoutSection.fromSnapshot(section);
        this.#sections.set(sectionEntity.id, sectionEntity);
    }

    public addSections(sections: readonly HeuteLayoutSectionSnapshot[]) {
        for (const section of sections) {
            this.addSection(section);
        }
    }

    public getSection(sectionId: string) : HeuteLayoutSectionSnapshot {
        const section = this.#sections.get(sectionId);
        if (!section) {
            throw new Error("Section does not exist in board layout.");
        }

        return HeuteLayoutSection.toSnapshot(section);
    }

    public getSections() : ReadonlyArray<HeuteLayoutSectionSnapshot> {
        return [...this.#sections.values()].map(section => HeuteLayoutSection.toSnapshot(section));
    }

    //

    public static fromSnapshot(snapshot: HeuteLayoutSnapshot): HeuteLayout {
        return new HeuteLayout(snapshot.id, {
            sections: snapshot.sections
        });
    }

    public static toSnapshot(layout: HeuteLayout): HeuteLayoutSnapshot {
        return {
            id: layout.id,
            sections: layout.getSections()
        };
    }
}

export default HeuteLayout;

export interface HeuteLayoutSnapshot {
    readonly id: string;
    readonly sections: readonly HeuteLayoutSectionSnapshot[];
}

export type HeuteLayoutProps = Omit<HeuteLayoutSnapshot, "id">;