import { useMemo } from "react";
import { BoardActions } from "@/src/core/types/domain/board/board.store";
import { useBoardStore } from "@/src/stores/board.store";

export function useBoardActions() : BoardActions {
    const createCard = useBoardStore((state) => state.createCard);
    const deleteCard = useBoardStore((state) => state.deleteCard);

    const actions = useMemo(() => {
        return {
            createCard,
            deleteCard
        }
    }, [createCard, deleteCard]);

    return actions;
}