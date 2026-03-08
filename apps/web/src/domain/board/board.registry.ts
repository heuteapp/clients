"use client"

import React from "react"
import { HeuteLayoutProps, LayoutGridCellProps, LayoutGridProps, LayoutSectionContainerProps, LayoutSectionProps } from "@/src/domain/layout/types/props";
import { LayoutRootNode, LayoutSectionNode, LayoutGridCellNode, LayoutGridNode, LayoutSectionContainerNode } from "../layout/types/nodes";
import { RegistryBaseNode } from "@/src/shared/types/registry";

export interface BoardRegistry {
    board: BoardRootNode | null
    layout: LayoutRootNode | null

    registerLayout(
        ref: React.RefObject<HTMLDivElement | null>,
        props: HeuteLayoutProps,
    ): LayoutRootNode

    registerLayoutSectionContainer(
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionContainerProps
    ): LayoutSectionContainerNode
    
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

    registerLayoutGridCell(
        sectionId: string,
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridCellProps
    ): LayoutGridCellNode

    //

    unregisterLayout(): void

    unregisterLayoutSectionContainer(): void

    unregisterLayoutSection(id: string): void

    unregisterLayoutGrid(sectionId: string): void

    unregisterLayoutGridCell(sectionId: string, id: string): void

    //

    getLayoutSection(id: string): LayoutSectionNode | undefined

    getLayoutGrid(sectionId: string): LayoutGridNode | undefined

    getLayoutGridCell(sectionId: string, id: string): LayoutGridCellNode | undefined
}

export interface BoardRootNode extends RegistryBaseNode {

}