import { useRef, useMemo } from "react";
import { BoardActions, BoardState } from "@/src/core/types/domain/board/board.store";
import { useBoardStore } from "@/src/stores/board.store";
import debounce from "lodash.debounce";
import { api } from "@/src/core/utils/api";
import { useAuthStore } from "@/src/stores/auth.store";

export function useBoardActions(): BoardActions {
    const createCardLocal = useBoardStore((state) => state.createCard);
    const deleteCardLocal = useBoardStore((state) => state.deleteCard);
    const setState = useBoardStore((state) => state.setState);
    const accessToken = useAuthStore((state) => state.accessToken);

    const lastSnapshotRef = useRef<BoardState | null>(null);
    const pendingActionsRef = useRef(0);
    const FLUSH_THRESHOLD = 8;

    const syncBoardToServer = useMemo(
        () =>
            debounce(async () => {
                const snapshot = lastSnapshotRef.current;
                try {
                    await api.post("/workspace/board/mihr/sync", 
                        { cards: useBoardStore.getState().cards.slice() },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            },
                        }
                    );
                } catch (err) {
                    if (snapshot) setState(snapshot);

                    throw err;
                }
                finally {
                    lastSnapshotRef.current = null;
                    pendingActionsRef.current = 0;
                }
            }, 2000),
        [accessToken, setState]
    );

    const runAction = <T>(fn: () => T): T => {
        if (!lastSnapshotRef.current) lastSnapshotRef.current = useBoardStore.getState();

        pendingActionsRef.current += 1;

        if (pendingActionsRef.current >= FLUSH_THRESHOLD) {
            syncBoardToServer.flush();
        } else {
            syncBoardToServer();
        }

        return fn();
    };

    const actions: BoardActions = useMemo(
        () => ({
            createCard: (content) => runAction(() => createCardLocal(content)),
            deleteCard: (id) => runAction(() => deleteCardLocal(id)),
        }),
        [createCardLocal, deleteCardLocal, syncBoardToServer]
    );

    return actions;
}