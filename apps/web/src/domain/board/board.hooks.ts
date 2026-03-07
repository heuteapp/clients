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
                console.log("Card Create");
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
            events: {
                [key: string]: EventListenerOrEventListenerObject | null
            }
        }> = [];

        function cleanupHandlers() {
            for(const { el, events } of handlers) {
                for(const [name, handler] of Object.entries(events)) {
                    if(handler) {
                        el.removeEventListener(name, handler);
                    }
                }
            }
            handlers.length = 0;
        }

            // !! do not use session or its ref inside !!
        interaction.setEventHandlers({
            OnStart: (type: BoardInteractionEventType) => {
                switch(type) {
                    case "create":
                        root.dataset.interactionCardCreate = "true";

                        const grids = layoutRegistry.sections.values().map(s => s.grid);
                        for(const grid of grids) {
                            const el = grid!.ref?.current;
                            if(!el) continue;

                            const pointerenter = () => {
                                interaction.updateCardCreate(grid!.props!.sectionId, null);
                            }

                            const pointermove = () => {
                                const session = sessionRef.current;
                                const section = layoutRegistry.getSection(grid!.props!.sectionId)!;
                                const sectionProps = section.props!;
                                
                                const rect = el.getBoundingClientRect();
                                const cellSize = layoutRegistry.measurements!.cellSize.full;

                                const mouseX = interaction.pointer!.x - rect.left;
                                const mouseY = interaction.pointer!.y - rect.top;

                                const cardRows = session.cardCreate!.startSize.rowSpan;
                                const cardCols = session.cardCreate!.startSize.colSpan;

                                // Mouse’u merkeze almak için kart boyutunu yarı hücre olarak çıkarıyoruz
                                const centeredX = mouseX - (cardCols * cellSize) / 2;
                                const centeredY = mouseY - (cardRows * cellSize) / 2;

                                // 1-based index
                                let rawCol = Math.floor(centeredX / cellSize) + 1;
                                let rawRow = Math.floor(centeredY / cellSize) + 1;

                                // Max pozisyon: kart grid dışına taşmasın
                                const maxRow = sectionProps.rowSpan - cardRows + 1;
                                const maxCol = sectionProps.colSpan - cardCols + 1;

                                // Clamp ile sınırla
                                const row = clamp(rawRow, 1, maxRow);
                                const col = clamp(rawCol, 1, maxCol);

                                interaction.updateCardCreate(grid!.props!.sectionId, { rowIndex: row, colIndex: col });
                            }

                            const pointerleave = () => {
                                interaction.updateCardCreate(null, null);
                            }

                            el.addEventListener("pointerenter", pointerenter);
                            el.addEventListener("pointermove", pointermove);
                            el.addEventListener("pointerleave", pointerleave);

                            handlers.push({ el, events: { pointerenter, pointermove, pointerleave } });
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}