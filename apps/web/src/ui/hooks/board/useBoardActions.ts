import { useRef, useMemo } from "react";
import { BoardActions } from "@/src/core/types/domain/board/board.store";
import { useBoardStore } from "@/src/stores/board.store";
import debounce from "lodash.debounce";
import { api } from "@/src/core/utils/api";

export function useBoardActions(): BoardActions {
    const createCardLocal = useBoardStore((state) => state.createCard);
    const deleteCardLocal = useBoardStore((state) => state.deleteCard);
    const setState = useBoardStore((state) => state.setState);

    const lastSnapshotRef = useRef<any | null>(null);

    const syncBoardToServer = useMemo(
        () =>
            debounce(async (cardsSnapshot: any[]) => {
                try {
                    await api.post("/board/sync", { cards: cardsSnapshot });
                    lastSnapshotRef.current = null;
                } catch (err) {
                    if (lastSnapshotRef.current) setState(lastSnapshotRef.current);
                }
            }, 2000),
        [setState]
    );

    const actions: BoardActions = useMemo(() => ({
        createCard: (content) => {
            if (!lastSnapshotRef.current) {
                lastSnapshotRef.current = useBoardStore.getState();
            }

            const card = createCardLocal(content);

            syncBoardToServer(useBoardStore.getState().cards.slice());

            return card;
        },

        deleteCard: (id) => {
            if (!lastSnapshotRef.current) {
                lastSnapshotRef.current = useBoardStore.getState();
            }

            const deleted = deleteCardLocal(id);

            syncBoardToServer(useBoardStore.getState().cards.slice());

            return deleted;
        }
    }), [createCardLocal, deleteCardLocal, syncBoardToServer]);

    return actions;
}