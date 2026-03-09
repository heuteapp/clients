"use client"

import React from "react"
import { LayoutGridNode } from "@/src/ui/types/layout/nodes"
import { BoardRegistry } from "./board.registry.types"
//

export function createBoardRegistry(boardRef: React.RefObject<HTMLDivElement | null>, layoutRef: React.RefObject<HTMLDivElement | null>): BoardRegistry {

    const registry: BoardRegistry = {
        board: { ref: boardRef },
        layout: { ref: layoutRef },

        registerBoard(ref, props) {
            registry.board.ref = ref
            registry.board.props = props

            return registry.board
        },

        registerBoardCardContainer(ref, props) {
            if (!registry.board.cardContainer) {
                registry.board.cardContainer = {
                    ref,
                    props,
                    cards: new Map()
                }
            } else {
                registry.board.cardContainer.ref = ref
                registry.board.cardContainer.props = props
            }

            return registry.board.cardContainer
        },

        registerBoardCard(id, ref, props) {

            if (!registry.board.cardContainer) {
                registry.board.cardContainer = { cards: new Map() }
            }

            const cards = registry.board.cardContainer.cards

            if (!cards.has(id)) {
                cards.set(id, { ref, props })
            }

            const card = cards.get(id)!

            card.ref = ref
            card.props = props

            return card
        },

        registerLayout(ref, props) {
            registry.layout.ref = ref
            registry.layout.props = props

            return registry.layout
        },

        registerLayoutSectionContainer(ref, props) {
            if (!registry.layout.sectionContainer) {
                registry.layout.sectionContainer = {
                    ref,
                    props,
                    sections: new Map()
                }
            } else {
                registry.layout.sectionContainer.ref = ref
                registry.layout.sectionContainer.props = props
            }

            return registry.layout.sectionContainer
        },

        registerLayoutSection(id, ref, props) {

            if (!registry.layout.sectionContainer) {
                registry.layout.sectionContainer = { sections: new Map() }
            }

            const sections = registry.layout.sectionContainer.sections

            if (!sections.has(id)) {
                sections.set(id, { ref, props })
            }

            const section = sections.get(id)!

            section.ref = ref
            section.props = props

            return section
        },

        registerLayoutGrid(sectionId, ref, props) {
            if (!registry.layout.sectionContainer) {
                registry.layout.sectionContainer = { sections: new Map() }
            }

            const sections = registry.layout.sectionContainer.sections

            if (!sections.has(sectionId)) {
                sections.set(sectionId, {  })
            }

            const section = sections.get(sectionId)!

            if (!section.grid) {
                section.grid = {
                    ref,
                    props,
                    cells: new Map()
                }
            } else {
                section.grid.ref = ref
                section.grid.props = props
            }

            return section.grid
        },

        registerLayoutGridCell(sectionId, id, ref, props) {

            if (!registry.layout.sectionContainer) {
                registry.layout.sectionContainer = { sections: new Map() }
            }

            const sections = registry.layout.sectionContainer.sections

            if (!sections.has(sectionId)) {
                sections.set(sectionId, {  })
            }

            const section = sections.get(sectionId)!

            if (!section.grid) {
                section.grid = {
                    cells: new Map()
                }
            }

            const grid = section.grid!

            if (!grid.cells.has(id)) {
                grid.cells.set(id, { ref, props })
            }

            const cell = grid.cells.get(id)!

            cell.ref = ref
            cell.props = props

            return cell
        },

        //

        unregisterBoard() {
            registry.board.ref.current = null
            registry.board.cardContainer = undefined
        },

        unregisterBoardCardContainer() {
            if (registry.board.cardContainer) {
                registry.board.cardContainer.ref = null
                registry.board.cardContainer.cards.clear()
                registry.board.cardContainer = undefined
            }
        },

        unregisterBoardCard(id) {
            registry.board.cardContainer?.cards.delete(id)
        },

        unregisterLayout() {
            registry.layout.ref.current = null
        },

        unregisterLayoutSectionContainer() {
            if (registry.layout) {
                registry.layout.sectionContainer = null
            }
        },

        unregisterLayoutSection(id) {
            registry.layout?.sectionContainer?.sections.delete(id)
        },

        unregisterLayoutGrid(sectionId) {
            const section = registry.layout?.sectionContainer?.sections.get(sectionId)
            if (section) section.grid = null
        },

        unregisterLayoutGridCell(sectionId, id) {
            registry.layout?.sectionContainer?.sections
                .get(sectionId)?.grid?.cells.delete(id)
        },

        getLayoutSection(id) {
            return registry.layout?.sectionContainer?.sections.get(id)
        },

        getLayoutSections() {
            const map = registry.layout?.sectionContainer?.sections
            return map ? Array.from(map.values()) : undefined
        },

        getLayoutGrid(sectionId) {
            return registry.layout?.sectionContainer?.sections.get(sectionId)?.grid ?? undefined
        },

        getLayoutGrids() {
            const sections = registry.layout?.sectionContainer?.sections
            if (!sections) return undefined

            const grids: LayoutGridNode[] = []

            for (const section of sections.values()) {
                if (section.grid) grids.push(section.grid)
            }

            return grids
        },

        getLayoutGridCell(sectionId, id) {
            return registry.layout?.sectionContainer?.sections
                .get(sectionId)?.grid?.cells.get(id)
        },

        getLayoutGridCells(sectionId) {
            const cells = registry.layout?.sectionContainer?.sections
                .get(sectionId)?.grid?.cells

            return cells ? Array.from(cells.values()) : undefined
        }
    }

    return registry
}