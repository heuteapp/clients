import { useMemo } from "react";
import { BoardContent } from "@/src/ui/types/board/board.content";
import { useBoardStore } from "@/src/stores/board.store";

export function useBoardContent() : BoardContent {
    const board = useBoardStore(state => state.board);
    const cards = useBoardStore(state => state.cards);
    const layout = useBoardStore(state => state.layout);
    const sections = useBoardStore(state => state.sections);

    const content = useMemo(() => {
        return {
            current: {
                board,
                cards,
                layout,
                sections
            }
        };
    }, [board, cards, layout, sections]);

    return content;
}