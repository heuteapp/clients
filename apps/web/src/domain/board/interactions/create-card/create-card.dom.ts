import { LayoutRegistry } from "@/src/domain/layout/layout.registry"

export function clearGridHover(layoutRegistry: LayoutRegistry) {
    for (const section of layoutRegistry.sections.values()) {
        const el = section.grid?.ref?.current
        if (!el) continue

        delete el.dataset.gridHover
    }
}

export function setGridHover(el: HTMLElement) {
    el.dataset.gridHover = ""
}

export function setCreateMode(root: HTMLElement, active: boolean) {
    if (active) {
        root.dataset.interactionCardCreate = "true"
    } else {
        delete root.dataset.interactionCardCreate
    }
}

export function setGhostCardPosition(
    root: HTMLElement,
    x: number,
    y: number
) {
    root.style.setProperty("--ghost-card-x", `${x}px`)
    root.style.setProperty("--ghost-card-y", `${y}px`)
}