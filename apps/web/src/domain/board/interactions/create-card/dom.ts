import { BoardRegistry } from "../../board.registry"

export function clearGridHover(registry: BoardRegistry) {
    for (const section of registry.getLayoutSections() ?? []) {
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
    y: number,
    width: number,
    height: number
) {
    root.style.setProperty("--ghost-card-visible", "visible");
    root.style.setProperty("--ghost-card-x", `${x}px`)
    root.style.setProperty("--ghost-card-y", `${y}px`)
    root.style.setProperty("--ghost-card-width", `${width}px`)
    root.style.setProperty("--ghost-card-height", `${height}px`)
}

export function clearGhostCard(root: HTMLElement) {
    root.style.setProperty("--ghost-card-visible", "hidden");
    root.style.removeProperty("--ghost-card-x")
    root.style.removeProperty("--ghost-card-y")
    root.style.removeProperty("--ghost-card-width")
    root.style.removeProperty("--ghost-card-height")
}