import { useContext, useEffect, useMemo, useRef } from "react"
import { BoardContext } from "../../../ui/contexts/board.context"
import { createBoardInteraction } from "../../../ui/interactions/board.interaction"
import { BoardInteraction } from "../../../ui/interactions/board.interaction.types"
import { createBoardSession } from "../../../ui/sessions/board.session"
import { BoardSession, BoardSessionSetter, CardCreateState } from "../../../ui/sessions/board.session.types"
import { setCreateMode } from "../../../ui/interactions/create-card/dom"
import { endCardCreateInteraction, handleCardCreateInteraction } from "../../../ui/interactions/create-card/handler"
import { LayoutMeasurements } from "../../../types/layout/dom"
import { useBoardStore } from "@/src/stores/board.store"
import { createBoardRegistry } from "@/src/ui/registries/board.registry"
import { BoardRegistry } from "@/src/ui/registries/board.registry.types"

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

export function useBoardInteraction(sessionSetter: BoardSessionSetter) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionSetter);
    }, [sessionSetter]);

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
    measurements: LayoutMeasurements,
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