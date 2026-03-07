import { useContext, useEffect, useRef } from "react"
import { HeuteBoardContext } from "./board.context"
import { BoardInteraction, createBoardInteraction } from "./board.interaction"
import { BoardSession } from "./board.session"

export function useBoardContext() {
    const ctx = useContext(HeuteBoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardInteraction({ session }: { session: BoardSession }) : BoardInteraction {
    const interactionRef = useRef<BoardInteraction | null>(null);

    if(!interactionRef.current) {
        interactionRef.current = createBoardInteraction(session);
    }

    return interactionRef.current;
}