import { RegistryBaseNode } from "@/src/shared/types/registry.types"
import { HeuteLayoutProps, LayoutSectionProps, LayoutGridProps, LayoutGridCellProps } from "./props"

export interface LayoutRegistry {
    root: LayoutRootNode | null
    container: RegistryBaseNode | null
    sections: Map<string, LayoutSectionNode>

    registerRoot(
        ref: React.RefObject<HTMLDivElement | null>,
        props: HeuteLayoutProps,
    ): void

    unregisterRoot(): void


    registerContainer(
        ref: React.RefObject<HTMLDivElement | null>
    ): void

    unregisterContainer(): void


    registerSection(
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionProps
    ): LayoutSectionNode

    unregisterSection(id: string): void


    registerGrid(
        sectionId: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridProps
    ): LayoutGridNode

    unregisterGrid(sectionId: string): void


    registerCell(
        sectionId: string,
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridCellProps
    ): LayoutCellNode

    unregisterCell(sectionId: string, id: string): void


    getSection(id: string): LayoutSectionNode | undefined
    getGrid(sectionId: string): LayoutGridNode | undefined
    getCell(sectionId: string, id: string): LayoutCellNode | undefined
}

//

export interface LayoutRootNode extends RegistryBaseNode {
    props?: HeuteLayoutProps
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid: LayoutGridNode | null
}

export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
    cells: Map<string, LayoutCellNode>
}

export interface LayoutCellNode extends RegistryBaseNode {
    props?: LayoutGridCellProps
}