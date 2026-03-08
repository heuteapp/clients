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

    getLayoutSections(): LayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: string): LayoutGridNode | undefined

    getLayoutGrids(sectionId: string): LayoutGridNode[] | undefined

    getLayoutGridCell(sectionId: string, id: string): LayoutGridCellNode | undefined

    getLayoutGridCells(sectionId: string): LayoutGridCellNode[] | undefined
}

export interface BoardRootNode extends RegistryBaseNode {

}

//

export function createBoardRegistry(): BoardRegistry {
    const sections = new Map<string, LayoutSectionNode>()

    const registry: BoardRegistry = {
        board: null,
        layout: null,

        registerLayout(ref, props) {
            if(!this.layout) {
                this.layout = { ref, props, sectionContainer: null }
            }
            else {
                this.layout.ref = ref
                this.layout.props = props
            }

            return this.layout
        },

        registerLayoutSectionContainer(ref, props) {
            if (!this.layout) {
                this.layout = { };
            }

            if(!this.layout.sectionContainer) {
                this.layout.sectionContainer = { ref, props, sections: new Map() }
            }
            else {
                this.layout.sectionContainer.ref = ref
                this.layout.sectionContainer.props = props
            }

            return this.layout.sectionContainer
        },

        registerLayoutSection(id, ref, props) {
            if (!this.layout) {
                this.layout = { };
            }

            if(!this.layout.sectionContainer) {
                this.layout.sectionContainer = { sections: new Map() };
            }

            if(!this.layout.sectionContainer.sections) {
                this.layout.sectionContainer.sections = new Map();
            }

            const section = { ref, props };
            this.layout.sectionContainer.sections.set(id, section);

            return section;
        },

        registerLayoutGrid(sectionId, ref, props) {
            if (!this.layout) {
                this.layout = { };
            }

            if(!this.layout.sectionContainer) {
                this.layout.sectionContainer = { sections: new Map() };
            }

            if(!this.layout.sectionContainer.sections) {
                this.layout.sectionContainer.sections = new Map();
            }

            if(!this.layout.sectionContainer.sections.has(sectionId)) {
                this.layout.sectionContainer.sections.set(sectionId, { });
            }

            const section = this.layout.sectionContainer.sections.get(sectionId)!;

            if (!section.grid) {
                section.grid = { ref, props, cells: new Map() }
            } else {
                section.grid.ref = ref
                section.grid.props = props
            }

            return section.grid;
        },

        registerLayoutGridCell(sectionId, id, ref, props) {
            if (!this.layout) {
                this.layout = { };
            }

            if(!this.layout.sectionContainer) {
                this.layout.sectionContainer = { sections: new Map() };
            }

            if(!this.layout.sectionContainer.sections) {
                this.layout.sectionContainer.sections = new Map();
            }

            if(!this.layout.sectionContainer.sections.has(sectionId)) {
                this.layout.sectionContainer.sections.set(sectionId, { });
            }

            const section = this.layout.sectionContainer.sections.get(sectionId)!;

            if (!section.grid) {
                section.grid = { cells: new Map() }
            }

            if (!section.grid.cells.has(id)) {
                section.grid.cells.set(id, { ref, props })
            } 

            const cell = section.grid.cells.get(id)!;

            cell.ref = ref
            cell.props = props

            return cell;
        },

        unregisterLayout() {
            this.layout = null;
        },

        unregisterLayoutSectionContainer() {
            if (this.layout) {
                this.layout.sectionContainer = null;
            }
        },

        unregisterLayoutSection(id) {
            this.layout?.sectionContainer?.sections.delete(id);
        },

        unregisterLayoutGrid(sectionId) {
            const section = this.layout?.sectionContainer?.sections.get(sectionId);
            if (section) {
                section.grid = null;
            }
        },

        unregisterLayoutGridCell(sectionId, id) {
            const section = this.layout?.sectionContainer?.sections.get(sectionId);
            if (section?.grid) {
                section.grid.cells.delete(id);
            }
        },

        getLayoutSection(id) {
            return this.layout?.sectionContainer?.sections.get(id) ?? undefined;
        },

        getLayoutSections() {
            return this.layout?.sectionContainer?.sections ? Array.from(this.layout.sectionContainer.sections.values()) : undefined;
        },
        
        getLayoutGrid(sectionId) {
            return this.layout?.sectionContainer?.sections.get(sectionId)?.grid ?? undefined;
        },

        getLayoutGrids(sectionId) {
            const grid = this.layout?.sectionContainer?.sections.get(sectionId)?.grid;
            return grid ? [grid] : undefined;
        },
        
        getLayoutGridCell(sectionId, id) {
            return this.layout?.sectionContainer?.sections.get(sectionId)?.grid?.cells.get(id) ?? undefined;
        },

        getLayoutGridCells(sectionId) {
            const cellsMap = this.layout?.sectionContainer?.sections.get(sectionId)?.grid?.cells;
            return cellsMap ? Array.from(cellsMap.values()) : undefined;
        }
    }

    return registry;
}