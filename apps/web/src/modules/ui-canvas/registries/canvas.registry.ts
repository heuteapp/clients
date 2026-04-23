import React from "react"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry"

//

export function createCanvasRegistry(canvasRef: React.RefObject<HTMLDivElement | null>): CanvasRegistry {

    const registry: CanvasRegistry = {
        canvas: { ref: canvasRef, sections: new Map() },

        registerCanvasRoot(ref, props) {
            registry.canvas.ref = ref
            registry.canvas.props = props

            return registry.canvas
        },

        registerCanvasGridSection(id, ref, props) {

            if (!registry.canvas.sections) {
                registry.canvas.sections = new Map()
            }

            const sections = registry.canvas.sections

            if (!sections.has(id)) {
                sections.set(id, { ref, props })
            }

            const section = sections.get(id)!

            section.ref = ref
            section.props = props

            return section
        },

        registerCanvasGridItem(sectionId, ref, props) {
            if (!registry.canvas.sections) {
                registry.canvas.sections = new Map()
            }

            const sections = registry.canvas.sections

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

        unregisterCanvas() {
            registry.canvas.ref.current = null
        },

        unregisterCanvasGridSection(id) {
            registry.canvas?.sections.delete(id)
        },

        unregisterCanvasGridItem(sectionId) {
            const section = registry.canvas?.sections.get(sectionId)
            if (section) section.grid = null
        },

        //

        getCanvasGridSection(id) {
            return registry.canvas?.sections.get(id)
        },

        getCanvasGridSectionByName(name) {
            const sections = registry.canvas?.sections
            if (!sections) return undefined

            for (const section of sections.values()) {
                if (section.props?.data.name === name) {
                    return section
                }
            }

            return undefined
        },

        getCanvasGridSections() {
            const map = registry.canvas?.sections
            return map ? Array.from(map.values()) : undefined
        },

        getCanvasGridItem(sectionId) {
            return registry.canvas?.sections.get(sectionId)?.grid ?? undefined
        },

        getCanvasGridItems() {
            const sections = registry.canvas?.sections
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