import { Pointer } from "@/src/core/types/shared/common"
import { BoardRegistry } from "@/src/ui/types/domain/board/board.registry";

export function findCardUnderPointer(
    registry: BoardRegistry,
    pointer: Pointer
) {
    for (const card of registry.getBoardCards() ?? []) {
        const el = card.ref?.current
        if (!el) continue

        const rect = el.getBoundingClientRect()

        const inside =
            pointer.x >= rect.left &&
            pointer.x <= rect.right &&
            pointer.y >= rect.top &&
            pointer.y <= rect.bottom

        if (inside) {
            return { card, rect }
        }
    }

    return null
}