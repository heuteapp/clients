import { useRef, useMemo } from "react";
import { BoardActions, BoardState } from "@/src/core/types/domain/board/board.store";
import { useBoardStore } from "@/src/stores/board.store";
import debounce from "lodash.debounce";
import { useAuthStore } from "@/src/stores/auth.store";
import { BoardEvent, BoardEventType, CardCreatedEvent } from "@/src/core/types/domain/board/board.event";
import { server } from "@/src/api/client";

export function useBoardActions(): BoardActions {
    const createCardLocal = useBoardStore((state) => state.createCard);
    const deleteCardLocal = useBoardStore((state) => state.deleteCard);
    const setState = useBoardStore((state) => state.setState);

    const accessToken = useAuthStore((state) => state.accessToken);

    const lastSnapshotRef = useRef<BoardState | null>(null);
    const pendingActionsRef = useRef(0);
    const FLUSH_THRESHOLD = 8;

    const eventsRef = useRef<BoardEvent[]>([]);

    const dispatchEvents = useMemo(
        () => debounce(() => {
            const events = eventsRef.current;
            if (events.length === 0) return;

            const snapshot = lastSnapshotRef.current;
            if (!snapshot) return;


            server.workspace.board.postEvents("mihr", { events })
            .catch(() => {
                setState(snapshot);
            });

            eventsRef.current.length = 0;
            pendingActionsRef.current = 0;
            lastSnapshotRef.current = null;
        }, 0),
        [accessToken, setState]
    );

    const runAction = <T>(fn: () => T): T => {
        if (!lastSnapshotRef.current) lastSnapshotRef.current = useBoardStore.getState();

        pendingActionsRef.current += 1;

        if (pendingActionsRef.current >= FLUSH_THRESHOLD) {
            dispatchEvents.flush();
        } else {
            dispatchEvents();
        }

        return fn();
    };

    const actions: BoardActions = useMemo(
        () => ({
            createCard: (content) => runAction(() => {
                eventsRef.current.push({ occurredAt: new Date().toISOString(), type: BoardEventType.CardCreated, payload: {
                    name: content.name,
                    title: content.content?.title,
                    sectionName: content.placement?.sectionName,
                    colIndex: content.placement?.position.colIndex,
                    rowIndex: content.placement?.position.rowIndex,
                    colSpan: content.placement?.position.colSpan,
                    rowSpan: content.placement?.position.rowSpan,
                } } as CardCreatedEvent);
                return createCardLocal(content);
            }),
            deleteCard: (id) => runAction(() => deleteCardLocal(id)),
        }),
        [createCardLocal, deleteCardLocal, dispatchEvents]
    );

    return actions;
}