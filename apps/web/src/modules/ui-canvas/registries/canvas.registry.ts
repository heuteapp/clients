import React from "react"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry"

//

export function createCanvasRegistry(canvasRef: React.RefObject<HTMLDivElement | null>): CanvasRegistry {

    const registry: CanvasRegistry = {
        canvas: { ref: canvasRef, sections: new Map() },

        registerCanvas(ref, props) {
            registry.canvas.ref = ref
            registry.canvas.props = props

            return registry.canvas
        },

        registerCanvasSection(id, ref, props) {

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

        registerCanvasGrid(sectionId, ref, props) {
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

        unregisterCanvasSection(id) {
            registry.canvas?.sections.delete(id)
        },

        unregisterCanvasGrid(sectionId) {
            const section = registry.canvas?.sections.get(sectionId)
            if (section) section.grid = null
        },

        //

        getCanvasSection(id) {
            return registry.canvas?.sections.get(id)
        },

        getCanvasSectionByName(name) {
            const sections = registry.canvas?.sections
            if (!sections) return undefined

            for (const section of sections.values()) {
                if (section.props?.data.name === name) {
                    return section
                }
            }

            return undefined
        },

        getCanvasSections() {
            const map = registry.canvas?.sections
            return map ? Array.from(map.values()) : undefined
        },

        getCanvasGrid(sectionId) {
            return registry.canvas?.sections.get(sectionId)?.grid ?? undefined
        },

        getCanvasGrids() {
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