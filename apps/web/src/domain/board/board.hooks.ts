import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { BoardContext } from "./board.context"
import { BoardInteraction, BoardInteractionEventType, createBoardInteraction } from "./board.interaction"
import { BoardSession, BoardSessionSetter, BoardSessionTuple, CardBaseState, CardCreateState, createBoardSession } from "./board.session"
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

        function handlePointerDown(e: PointerEvent) {
            e.preventDefault();
            const root = rootRef.current;
            if (!root) return;

            root.setPointerCapture(e.pointerId);
            interaction.pointer = { x: e.clientX, y: e.clientY };
        }

        function handlePointerMove(e: PointerEvent) {
            interaction.pointer = { x: e.clientX, y: e.clientY };

            const currentSession = sessionRef.current;

            if (currentSession.cardCreate) {
                handleCardCreate(currentSession.cardCreate);
                return;
            }

            if (currentSession.cardMove) {
                return;
            }

            if (currentSession.cardResize) {
                return;
            }
        }

        function handlePointerUp(e: PointerEvent) {      
            const root = rootRef.current;
            if (!root) return;
            root.releasePointerCapture(e.pointerId);

            const currentSession = sessionRef.current;

            if (
                currentSession.cardCreate ||
                currentSession.cardMove ||
                currentSession.cardResize
            ) {
                interaction.endInteraction();
            }
        }

        function handleCardCreate(state: CardCreateState) {
            const pointer = interaction.pointer;
            if (!pointer) return;

            const cellSize = layoutRegistry.measurements!.cellSize.inner;
            const root = rootRef.current;
            if (!root) return;
        
            let foundSection: boolean = false;

            for (const section of layoutRegistry.sections.values()) {
                const el = section.grid!.ref?.current;
                if (!el) continue;

                const rect = el.getBoundingClientRect();

                const inside =
                    pointer.x >= rect.left &&
                    pointer.x <= rect.right &&
                    pointer.y >= rect.top &&
                    pointer.y <= rect.bottom;

                if (!inside) continue;

                foundSection = true;
                el.dataset.gridHover = "";

                const sectionProps = section.props!;
                const cardRows = state.startSize.rowSpan;
                const cardCols = state.startSize.colSpan;

                const mouseX = pointer.x - rect.left;
                const mouseY = pointer.y - rect.top;

                const centeredX = mouseX - (cardCols * cellSize) / 2;
                const centeredY = mouseY - (cardRows * cellSize) / 2;

                const rawCol = Math.round(centeredX / cellSize) + 1;
                const rawRow = Math.round(centeredY / cellSize) + 1;

                const maxRow = sectionProps.rowSpan - cardRows + 1;
                const maxCol = sectionProps.colSpan - cardCols + 1;

                const row = clamp(rawRow, 1, maxRow);
                const col = clamp(rawCol, 1, maxCol);

                interaction.updateCardCreate(section.props!.id, {
                    rowIndex: row,
                    colIndex: col,
                });

                return;
            }

            if (!foundSection) {
                interaction.updateCardCreate(null, null);

                for (const section of layoutRegistry.sections.values()) {
                    const el = section.grid!.ref?.current;
                    if (!el) continue;

                    delete el.dataset.gridHover;
                }
            }

            const width = state.startSize.colSpan * cellSize;
            const height = state.startSize.rowSpan * cellSize;

            root.style.setProperty(
                "--ghost-card-x",
                `${pointer.x - width / 2}px`
            );

            root.style.setProperty(
                "--ghost-card-y",
                `${pointer.y - height / 2}px`
            );
        }

        interaction.setEventHandlers({
            OnStart: (type, state) => {
                if (type === "create") {
                    root.dataset.interactionCardCreate = "true";
                    handleCardCreate(state as CardCreateState);
                }
            },
            OnEnd: (type) => {
                if(type === "create") {
                    delete root.dataset.interactionCardCreate;
                }
            },
        });

        root.addEventListener("pointerdown", handlePointerDown);
        root.addEventListener("pointermove", handlePointerMove);
        root.addEventListener("pointerup", handlePointerUp);

        return () => {
            root.removeEventListener("pointerdown", handlePointerDown);
            root.removeEventListener("pointermove", handlePointerMove);
            root.removeEventListener("pointerup", handlePointerUp);
        };
    }, [rootRef, interaction, layoutRegistry]);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}