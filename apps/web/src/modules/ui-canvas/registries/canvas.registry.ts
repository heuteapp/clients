import React from "react"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry"

//

export function createCanvasRegistry(canvasRef: React.RefObject<HTMLDivElement | null>): CanvasRegistry {

    const registry: CanvasRegistry = {
        canvas: { ref: canvasRef, container: null },

        registerCanvasRoot(ref, props) {
            registry.canvas.ref = ref
            registry.canvas.props = props

            return registry.canvas
        },

        registerCanvasGridContainer(ref, props) {
            if (!registry.canvas) return

            if(!registry.canvas.container) {
                registry.canvas.container = { sections: new Map() }
            }

            registry.canvas.container.ref = ref
            registry.canvas.container.props = props

            return registry.canvas.container
        },

        registerCanvasGridSection(gridName, ref, props) {

            if (!registry.canvas.container) {
                registry.canvas.container = { sections: new Map() }
            }

            const sections = registry.canvas.container.sections
            console.log("registering section", gridName, sections);

            if (!sections.has(gridName)) {
                sections.set(gridName, { ref, props })
            }

            const section = sections.get(gridName)!

            section.ref = ref
            section.props = props

            return section
        },

        registerCanvasGridItem(gridName, ref, props) {
            if (!registry.canvas.container) {
                registry.canvas.container = { sections: new Map() }
            }

            const sections = registry.canvas.container.sections

            if (!sections.has(gridName)) {
                sections.set(gridName, {  })
            }

            const section = sections.get(gridName)!

            if (!section.item) {
                section.item = {
                    ref,
                    props,
                }
            } else {
                section.item.ref = ref
                section.item.props = props
            }

            return section.item
        },

        unregisterCanvasRoot() {
            registry.canvas.ref.current = null
        },

        unregisterCanvasGridContainer() {
            if (registry.canvas) registry.canvas.container = null
        },

        unregisterCanvasGridSection(gridName) {
            registry.canvas?.container?.sections.delete(gridName)
        },

        unregisterCanvasGridItem(gridName) {
            const section = registry.canvas?.container?.sections.get(gridName)
            if (section) section.item = null
        },

        //

        getCanvasGridSection(gridName) {
            return registry.canvas?.container?.sections.get(gridName)
        },

        getCanvasGridSections() {
            const map = registry.canvas?.container?.sections
            return map ? Array.from(map.values()) : undefined
        },

        getCanvasGridItem(gridName) {
            return registry.canvas?.container?.sections.get(gridName)?.item ?? undefined
        },

        getCanvasGridItems() {
            const sections = registry.canvas?.container?.sections
            if (!sections) return undefined

            const grids = []

            for (const section of sections.values()) {
                if (section.item) grids.push(section.item)
            }

            return grids
        },
    }

    return registry
}