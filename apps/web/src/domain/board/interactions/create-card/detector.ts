import { Pointer } from "@/src/shared/types/common"
import { BoardRegistry } from "../../board.registry"

export function findSectionUnderPointer(
    registry: BoardRegistry,
    pointer: Pointer
) {
    for (const section of registry.getLayoutSections() ?? []) {
        const el = section.grid?.ref?.current
        if (!el) continue

        const rect = el.getBoundingClientRect()

        const inside =
            pointer.x >= rect.left &&
            pointer.x <= rect.right &&
            pointer.y >= rect.top &&
            pointer.y <= rect.bottom

        if (inside) {
            return { section, rect }
        }
    }

    return null
}