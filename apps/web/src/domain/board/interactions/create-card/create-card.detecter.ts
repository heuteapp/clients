import { LayoutRegistry } from "@/src/domain/layout/types/registry"
import { Pointer } from "@/src/shared/types/common.types"

export function findSectionUnderPointer(
    layoutRegistry: LayoutRegistry,
    pointer: Pointer
) {
    for (const section of layoutRegistry.sections.values()) {
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