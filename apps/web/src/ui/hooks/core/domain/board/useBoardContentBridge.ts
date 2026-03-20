import { useMemo, useRef } from "react";
import { BoardContentActions, BoardContentState } from "@/src/types/core/domain/board/board.content";
import { useBoardContentStore } from "@/src/stores/board.content.store";
import { useAuthStore } from "@/src/states/auth/auth.store";
import { BoardCommand, BoardCommandType } from "@/src/types/core/domain/board/board.command";
import debounce from "lodash.debounce";
import { server } from "@/src/api/server";
import { BoardContentStoreBridge } from "@/src/ui/types/domain/board/board.content";

export function useBoardContentBridge() : BoardContentStoreBridge {
    const board = useBoardContentStore(state => state.board);
    const cards = useBoardContentStore(state => state.cards);
    const layout = useBoardContentStore(state => state.layout);
    const sections = useBoardContentStore(state => state.sections);

    const setState = useBoardContentStore((state) => state.setState);

    const createCardLocal = useBoardContentStore((state) => state.createCard);
    const deleteCardLocal = useBoardContentStore((state) => state.deleteCard);

    //

    const accessToken = useAuthStore((state) => state.accessToken);

    const lastSnapshotRef = useRef<BoardContentState | null>(null);
    const pendingActionsRef = useRef(0);
    const FLUSH_THRESHOLD = 8;

    const commandsRef = useRef<BoardCommand[]>([]);

    const runAction = <T>(fn: () => T): T => {
        if (!lastSnapshotRef.current) lastSnapshotRef.current = useBoardContentStore.getState();

        pendingActionsRef.current += 1;

        if (pendingActionsRef.current >= FLUSH_THRESHOLD) {
            dispatchEvents.flush();
        } else {
            dispatchEvents();
        }

        return fn();
    };

    const dispatchEvents = useMemo(
        () => debounce(() => {
            const commands = commandsRef.current;
            if (commands.length === 0) return;

            const snapshot = lastSnapshotRef.current;
            if (!snapshot) return;


            server.workspace.board.postEvents("mihr", { commands })
            .catch(() => {
                setState(snapshot);
            });

            commandsRef.current.length = 0;
            pendingActionsRef.current = 0;
            lastSnapshotRef.current = null;
        }, 0),
        [accessToken, setState]
    );

    const value: BoardContentState = useMemo(() => {
        return {
            board,
            cards,
            layout,
            sections
        };
    }, [board, cards, layout, sections]);

    const actions: BoardContentActions = useMemo(
        () => ({
            createCard: (content) => runAction(() => {
                commandsRef.current.push({ occurredAt: new Date().toISOString(), type: BoardCommandType.CreateCard, payload: {
                    definition: {
                        name: content.name,
                        title: content.content?.title,
                        sectionName: content.placement?.sectionName,
                        colIndex: content.placement?.position.colIndex,
                        rowIndex: content.placement?.position.rowIndex,
                        colSpan: content.placement?.position.colSpan,
                        rowSpan: content.placement?.position.rowSpan,
                    }
                } });
                return createCardLocal(content);
            }),
            deleteCard: (name) => runAction(() => {
                commandsRef.current.push({ occurredAt: new Date().toISOString(), type: BoardCommandType.DeleteCard, payload: { key: { name } } });
                return deleteCardLocal(name);
            }),
        }),
        [dispatchEvents, createCardLocal, deleteCardLocal]
    );

    const content = useMemo(() => ({ ...value, ...actions }), [value, actions]);

    return content;
}