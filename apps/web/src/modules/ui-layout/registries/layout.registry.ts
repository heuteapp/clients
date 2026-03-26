import React from "react"
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry"

//

export function createLayoutRegistry(layoutRef: React.RefObject<HTMLDivElement | null>): LayoutRegistry {

    const registry: LayoutRegistry = {
        layout: { ref: layoutRef, sections: new Map() },

        registerLayout(ref, props) {
            registry.layout.ref = ref
            registry.layout.props = props

            return registry.layout
        },

        registerLayoutSection(id, ref, props) {

            if (!registry.layout.sections) {
                registry.layout.sections = new Map()
            }

            const sections = registry.layout.sections

            if (!sections.has(id)) {
                sections.set(id, { ref, props })
            }

            const section = sections.get(id)!

            section.ref = ref
            section.props = props

            return section
        },

        registerLayoutGrid(sectionId, ref, props) {
            if (!registry.layout.sections) {
                registry.layout.sections = new Map()
            }

            const sections = registry.layout.sections

            if (!sections.has(sectionId)) {
                sections.set(sectionId, {  })
            }

            const section = sections.get(sectionId)!

            if (!section.grid) {
                section.grid = {
                    ref,
                    props,
                }
            } else {
                section.grid.ref = ref
                section.grid.props = props
            }

            return section.grid
        },

        unregisterLayout() {
            registry.layout.ref.current = null
        },

        unregisterLayoutSection(id) {
            registry.layout?.sections.delete(id)
        },

        unregisterLayoutGrid(sectionId) {
            const section = registry.layout?.sections.get(sectionId)
            if (section) section.grid = null
        },

        //

        getLayoutSection(id) {
            return registry.layout?.sections.get(id)
        },

        getLayoutSectionByName(name) {
            const sections = registry.layout?.sections
            if (!sections) return undefined

            for (const section of sections.values()) {
                if (section.props?.name === name) {
                    return section
                }
            }

            return undefined
        },

        getLayoutSections() {
            const map = registry.layout?.sections
            return map ? Array.from(map.values()) : undefined
        },

        getLayoutGrid(sectionId) {
            return registry.layout?.sections.get(sectionId)?.grid ?? undefined
        },

        getLayoutGrids() {
            const sections = registry.layout?.sections
            if (!sections) return undefined

            const grids = []

            for (const section of sections.values()) {
                if (section.grid) grids.push(section.grid)
            }

            return grids
        },
    }

    return registry
}