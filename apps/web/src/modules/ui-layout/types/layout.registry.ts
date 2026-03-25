import { LayoutRootNode, LayoutSectionNode, LayoutGridNode } from "./layout.nodes"
import { LayoutRootProps, LayoutSectionProps, LayoutGridProps } from "./layout.props"

export interface LayoutRegistry {
    layout: LayoutRootNode

    registerLayout(
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutRootProps,
    ): LayoutRootNode

    registerLayoutSection(
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionProps
    ): LayoutSectionNode

    registerLayoutGrid(
        sectionId: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridProps
    ): LayoutGridNode

    //

    unregisterLayout(): void

    unregisterLayoutSection(id: string): void

    unregisterLayoutGrid(sectionId: string): void

    //

    getLayoutSection(id: string): LayoutSectionNode | undefined

    getLayoutSectionByName(name: string): LayoutSectionNode | undefined

    getLayoutSections(): LayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: string): LayoutGridNode | undefined

    getLayoutGrids(sectionId: string): LayoutGridNode[] | undefined
}