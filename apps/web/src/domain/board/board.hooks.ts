import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { BoardContext } from "./board.context"
import { createBoardInteraction } from "./interaction/board.interaction"
import { BoardInteraction } from "./interaction/board.interaction.types"
import { createBoardSession } from "./session/board.session"
import { BoardSession, BoardSessionSetter, BoardSessionTuple, CardCreateState } from "./session/board.session.types"
import { LayoutRegistry } from "../layout/layout.registry"
import { clearGridHover, setCreateMode, setGhostCardPosition, setGridHover } from "./interactions/create-card/create-card.dom"
import { computeCardCreatePosition } from "./interactions/create-card/create-card.logic"
import { handleCreateCardInteraction } from "./interactions/create-card/create-card.handler"

export function useBoardContext() {
    const ctx = useContext(BoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardSession() : BoardSessionTuple {
    const tuple = useState(createBoardSession())

    return tuple;
}

export function useBoardInteraction(sessionSetter: BoardSessionSetter) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionSetter);
    }, [sessionSetter]);

    return interaction;
}

export function useBoardPointerEvents(
  rootRef: React.RefObject<HTMLDivElement | null>,
  layoutRegistry: LayoutRegistry,
  session: BoardSession,
  interaction: BoardInteraction
) {
    const sessionRef = useRef(session)

    useEffect(() => {
        sessionRef.current = session
    }, [session])

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
                handleCreateCardInteraction(rootRef.current!, layoutRegistry, interaction, currentSession.cardCreate)
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

                    handleCreateCardInteraction(root, layoutRegistry, interaction, state as CardCreateState)
                }
            },

            OnEnd: (type) => {

                if (type === "create") {
                    setCreateMode(root, false)
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

    }, [rootRef, interaction, layoutRegistry])
}