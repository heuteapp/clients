import { useContext } from "react"
import { HeuteBoardContext } from "./board.context"

export function useBoardContext() {
    const ctx = useContext(HeuteBoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}