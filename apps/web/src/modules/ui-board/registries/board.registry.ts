"use client"

import React from "react"
import { BoardRegistry } from "@/src/modules/ui-board/types/board.registry"
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry"
//

export function createBoardRegistry(boardRef: React.RefObject<HTMLDivElement | null>, layoutRegistry: LayoutRegistry): BoardRegistry {

    const registry: BoardRegistry = {
        board: { ref: boardRef },
        layoutRegistry,

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

        getBoardCardsForSection(sectionId) {
            const cards = registry.board.cardContainer?.cards
            if (!cards) return undefined

            const sectionCards = []

            const section = registry.layoutRegistry.layout?.sections.get(sectionId);

            for (const card of cards.values()) {
                const placement = card.props?.placement;
                if (placement?.sectionName === section?.props?.name) {
                    sectionCards.push(card)
                }
            }

            return sectionCards
        },
    }

    return registry
}