import { useContext } from "react"
import { BoardContext } from "@/src/ui/contexts/board.context"

export function useBoardContext() {
    const ctx = useContext(BoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}
