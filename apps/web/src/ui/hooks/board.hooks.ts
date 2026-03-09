import { useContext, useEffect, useMemo, useRef } from "react"
import { BoardContext } from "../contexts/board.context"
import { createBoardInteraction } from "../interactions/board.interaction"
import { BoardInteraction } from "../interactions/board.interaction.types"
import { setCreateMode } from "../interactions/create-card/dom"
import { endCardCreateInteraction, handleCardCreateInteraction } from "../interactions/create-card/handler"
import { useBoardStore } from "@/src/stores/board";
import { createBoardRegistry } from "@/src/ui/registries/board.registry"
import { BoardRegistry } from "@/src/ui/registries/board.registry.types"
import { BoardSession, BoardSessionUpdater, CardCreateState } from "../types/board/board.session"
import { createBoardSession } from "../utils/board/board.session"
import { BoardMetrics } from "../types/board/board.dom"

export function useBoardContext() {
    const ctx = useContext(BoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardSessionRef() : React.RefObject<BoardSession> {
    const sessionRef = useRef(createBoardSession());

    return sessionRef;
}

export function useBoardInteraction(sessionUpdater: BoardSessionUpdater) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionUpdater);
    }, [sessionUpdater]);

    return interaction;
}

export function useBoardRegistry() : BoardRegistry {
    const boardRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);
    const registryRef = useRef<BoardRegistry | null>(null)

    if (!registryRef.current) {
        registryRef.current = createBoardRegistry(boardRef, layoutRef);
    }

    return registryRef.current;
}

export function useBoardPointerEvents(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
    measurements: BoardMetrics,
    sessionRef: React.RefObject<BoardSession>,
    interaction: BoardInteraction
) {
    const addCard = useBoardStore(state => state.addCard);

    useEffect(() => {
        const root = rootRef.current
        if (!root) return


        function handlePointerDown(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            e.preventDefault()
            root.setPointerCapture(e.pointerId)

            interaction.pointer = {
                x: e.clientX,
                y: e.clientY
            }
        }

        function handlePointerMove(e: PointerEvent) {

            interaction.pointer = {
                x: e.clientX,
                y: e.clientY
            }

            const currentSession = sessionRef.current

            if (currentSession.cardCreate) {
                handleCardCreateInteraction(rootRef.current!, registry, measurements, interaction, currentSession.cardCreate)
                return
            }

            if (currentSession.cardMove) return
            if (currentSession.cardResize) return
        }

        function handlePointerUp(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            root.releasePointerCapture(e.pointerId)

            const currentSession = sessionRef.current

            if (
                currentSession.cardCreate ||
                currentSession.cardMove ||
                currentSession.cardResize
            ) {
                interaction.endInteraction()
            }
        }


        interaction.setEventHandlers({

            OnStart: (type, state) => {

                if (type === "create") {

                    setCreateMode(root, true)

                    handleCardCreateInteraction(root, registry, measurements, interaction, state as CardCreateState)
                }
            },

            OnEnd: (type) => {

                if (type === "create") {
                    const cardCreateState = sessionRef.current.cardCreate!;

                    if(cardCreateState.currentSectionId && cardCreateState.currentPosition) {
                        addCard({
                            id: crypto.randomUUID(),
                            sectionId: cardCreateState.currentSectionId!,
                            rowIndex: cardCreateState.currentPosition!.rowIndex,
                            colIndex: cardCreateState.currentPosition!.colIndex,
                            rowSpan: cardCreateState.startSize.rowSpan,
                            colSpan: cardCreateState.startSize.colSpan,
                        })
                    }

                    console.log(registry);

                    endCardCreateInteraction(root, registry, interaction);
                }
            }

        })

        root.addEventListener("pointerdown", handlePointerDown)
        root.addEventListener("pointermove", handlePointerMove)
        root.addEventListener("pointerup", handlePointerUp)

        return () => {

            root.removeEventListener("pointerdown", handlePointerDown)
            root.removeEventListener("pointermove", handlePointerMove)
            root.removeEventListener("pointerup", handlePointerUp)

        }

    }, [rootRef, interaction, registry])
}