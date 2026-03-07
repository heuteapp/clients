import { useContext, useRef } from "react"
import { HeuteBoardContext } from "./board.context"
import { BoardInteraction, createBoardInteraction } from "./board.interaction"

export function useBoardContext() {
    const ctx = useContext(HeuteBoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardInteraction() : BoardInteraction {
    const interaction = useRef<BoardInteraction>(null);

    if(!interaction.current) {
        interaction.current = createBoardInteraction();
    }

    return interaction.current;
}