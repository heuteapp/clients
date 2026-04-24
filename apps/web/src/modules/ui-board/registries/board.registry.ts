"use client"

import React from "react"
import { BoardRegistry } from "@/src/modules/ui-board/types/board.registry"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry"
//

export function createBoardRegistry(boardRef: React.RefObject<HTMLDivElement | null>, canvasRegistry: CanvasRegistry): BoardRegistry {

    const registry: BoardRegistry = {
        board: { ref: boardRef },
        canvasRegistry,

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

        //

        getBoardCardContainer() {
            return registry.board.cardContainer
        },

        getBoardCard(id) {
            return registry.board.cardContainer?.cards.get(id)
        },
        
        getBoardCards() {
            const cards = registry.board.cardContainer?.cards
            return cards ? Array.from(cards.values()) : undefined
        },

        getBoardCardsForGrid(gridId) {
            const cards = registry.board.cardContainer?.cards
            if (!cards) return undefined

            const gridCards = []

            const grid = registry.canvasRegistry.canvas?.container?.sections.get(gridId);

            for (const card of cards.values()) {
                const placement = card.props?.data.placement;
                if (placement?.gridName === grid?.props?.data.name) {
                    gridCards.push(card)
                }
            }

            return gridCards
        },
    }

    return registry
}