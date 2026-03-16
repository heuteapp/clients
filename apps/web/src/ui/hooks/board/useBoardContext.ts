import { useContext } from "react"
import { BoardContext } from "@/src/ui/contexts/board.context"
import { BoardContextValue } from "@/src/ui/types/board/board.context"

export function useBoardContext() : BoardContextValue {
    const ctx = useContext(BoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}
