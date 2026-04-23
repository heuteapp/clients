"use client"

import React from "react"
import { DailyboardRegistry } from "@/src/modules/ui-dailyboard/types/dailyboard.registry"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry"
//

export function createDailyboardRegistry(dailyboardRef: React.RefObject<HTMLDivElement | null>, canvasRegistry: CanvasRegistry): DailyboardRegistry {

    const registry: DailyboardRegistry = {
        dailyboard: { ref: dailyboardRef },
        canvasRegistry,

        registerDailyboard(ref, props) {
            registry.dailyboard.ref = ref
            registry.dailyboard.props = props

            return registry.dailyboard
        },

        registerDailyboardCardContainer(ref, props) {
            if (!registry.dailyboard.cardContainer) {
                registry.dailyboard.cardContainer = {
                    ref,
                    props,
                    cards: new Map()
                }
            } else {
                registry.dailyboard.cardContainer.ref = ref
                registry.dailyboard.cardContainer.props = props
            }

            return registry.dailyboard.cardContainer
        },

        registerDailyboardCard(id, ref, props) {

            if (!registry.dailyboard.cardContainer) {
                registry.dailyboard.cardContainer = { cards: new Map() }
            }

            const cards = registry.dailyboard.cardContainer.cards

            if (!cards.has(id)) {
                cards.set(id, { ref, props })
            }

            const card = cards.get(id)!

            card.ref = ref
            card.props = props

            return card
        },

        

        //

        unregisterDailyboard() {
            registry.dailyboard.ref.current = null
            registry.dailyboard.cardContainer = undefined
        },

        unregisterDailyboardCardContainer() {
            if (registry.dailyboard.cardContainer) {
                registry.dailyboard.cardContainer.ref = null
                registry.dailyboard.cardContainer.cards.clear()
                registry.dailyboard.cardContainer = undefined
            }
        },

        unregisterDailyboardCard(id) {
            registry.dailyboard.cardContainer?.cards.delete(id)
        },

        //

        getDailyboardCardContainer() {
            return registry.dailyboard.cardContainer
        },

        getDailyboardCard(id) {
            return registry.dailyboard.cardContainer?.cards.get(id)
        },
        
        getDailyboardCards() {
            const cards = registry.dailyboard.cardContainer?.cards
            return cards ? Array.from(cards.values()) : undefined
        },

        getDailyboardCardsForSection(sectionId) {
            const cards = registry.dailyboard.cardContainer?.cards
            if (!cards) return undefined

            const sectionCards = []

            const section = registry.canvasRegistry.canvas?.container?.sections.get(sectionId);

            for (const card of cards.values()) {
                const placement = card.props?.data.placement;
                if (placement?.sectionName === section?.props?.data.name) {
                    sectionCards.push(card)
                }
            }

            return sectionCards
        },
    }

    return registry
}