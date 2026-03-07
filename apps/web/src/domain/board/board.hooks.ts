import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { BoardContext } from "./board.context"
import { BoardInteraction, BoardInteractionEventType, createBoardInteraction } from "./board.interaction"
import { BoardSession, BoardSessionSetter, BoardSessionTuple, createBoardSession } from "./board.session"
import { LayoutRegistry } from "../layout/layout.registry"

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
    const sessionRef = useRef(session);
    
    useEffect(() => {
        sessionRef.current = session;
    }, [session]);


    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        function handlePointerMove(e: PointerEvent) {
            interaction.pointer = { x: e.clientX, y: e.clientY };
            const currentSession = sessionRef.current;

            currentSession.pointerId = e.pointerId;

            if (currentSession.cardCreate) {
                console.log("Card Create Move");
                return;
            }

            if (currentSession.cardMove) {
                console.log("Card Move");
                return;
            }

            if (currentSession.cardResize) {
                console.log("Card Resize");
                return;
            }
        }

        function handlePointerUp() {
            const currentSession = sessionRef.current;
            if(currentSession.cardCreate || currentSession.cardMove || currentSession.cardResize) {
                interaction.endInteraction();
            }
        }

        const handlers: Array<{
            el: HTMLElement;
            enter: any;
            leave: any;
        }> = [];

        function cleanupHandlers() {
            for(const { el, enter, leave } of handlers) {
                el.removeEventListener("pointerenter", enter);
                el.removeEventListener("pointerleave", leave);
            }
            handlers.length = 0;
        }

            // !! do not use session or its ref inside !!
        interaction.setEventHandlers({
            OnStart: (type: BoardInteractionEventType) => {
                switch(type) {
                    case "create":
                        root.dataset.interactionCardCreate = "true";

                        const sections = layoutRegistry.sections.values();
                        for(const section of sections) {
                            const el = section.ref?.current;
                            if(!el) continue;

                            const enter = () => {
                                const sessionState = sessionRef.current!.cardCreate!;
                                interaction.updateCardCreate(sessionState.startSize, section.props!.id!);
                            }

                            const leave = () => {
                                const sessionState = sessionRef.current!.cardCreate!;
                                interaction.updateCardCreate(sessionState.startSize, null);
                            }

                            el.addEventListener("pointerenter", enter);
                            el.addEventListener("pointerleave", leave);

                            handlers.push({ el, enter, leave });
                        }
                        break;
                    case "move":
                        root.dataset.interactionCardMove = "true";
                        break;
                    case "resize":
                        root.dataset.interactionCardResize = "true";
                        break;
                }
            },
            OnEnd: (type: BoardInteractionEventType) => {
                switch(type) {
                    case "create":
                        delete root.dataset.interactionCardCreate;
                        break;
                    case "move":
                        delete root.dataset.interactionCardMove;
                        break;
                    case "resize":
                        delete root.dataset.interactionCardResize;
                        break;
                }

                cleanupHandlers();
            }
        });

        root.addEventListener("pointermove", handlePointerMove);
        root.addEventListener("pointerup", handlePointerUp);

        return () => {
            root.removeEventListener("pointermove", handlePointerMove);
            root.removeEventListener("pointerup", handlePointerUp);
            cleanupHandlers();
        }

    }, [rootRef, interaction]);
}