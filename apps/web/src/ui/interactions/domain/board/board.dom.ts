import { Rect } from "@/src/core/types/shared/common";
import { BoardRegistry } from "@/src/ui/types/domain/board/board.registry";

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

export function setGhostCardPosition(
    root: HTMLElement,
    position: Rect
) {
    root.style.setProperty("--ghost-card-visible", "visible");
    root.style.setProperty("--ghost-card-x", `${position.x}px`)
    root.style.setProperty("--ghost-card-y", `${position.y}px`)
    root.style.setProperty("--ghost-card-width", `${position.width}px`)
    root.style.setProperty("--ghost-card-height", `${position.height}px`)
}

export function clearGhostCard(root: HTMLElement) {
    root.style.setProperty("--ghost-card-visible", "hidden");
    root.style.removeProperty("--ghost-card-x")
    root.style.removeProperty("--ghost-card-y")
    root.style.removeProperty("--ghost-card-width")
    root.style.removeProperty("--ghost-card-height")
}