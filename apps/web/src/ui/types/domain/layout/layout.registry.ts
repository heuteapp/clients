import { Identifier } from "@/src/core/types/shared/data"
import { LayoutRootNode, LayoutSectionNode, LayoutGridNode } from "./layout.nodes"
import { LayoutRootProps, LayoutSectionProps, LayoutGridProps } from "./layout.props"

export interface LayoutRegistry {
    layout: LayoutRootNode

    registerLayout(
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutRootProps,
    ): LayoutRootNode

    registerLayoutSection(
        id: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionProps
    ): LayoutSectionNode

    registerLayoutGrid(
        sectionId: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridProps
    ): LayoutGridNode

    //

    unregisterLayout(): void

    unregisterLayoutSection(id: Identifier): void

    unregisterLayoutGrid(sectionId: Identifier): void

    //

    getLayoutSection(id: Identifier): LayoutSectionNode | undefined

    getLayoutSectionByName(name: string): LayoutSectionNode | undefined

    getLayoutSections(): LayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: Identifier): LayoutGridNode | undefined

    getLayoutGrids(sectionId: Identifier): LayoutGridNode[] | undefined
}