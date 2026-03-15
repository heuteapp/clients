import { useMemo } from "react";
import { BoardTheme } from "@/src/ui/types/board/board.theme";
import { useBoardThemeStore } from "@/src/stores/board.theme.store";

export function useBoardTheme() : BoardTheme {
    const board = useBoardThemeStore(state => state.board);
    const cards = useBoardThemeStore(state => state.cards);
    const layout = useBoardThemeStore(state => state.layout);
    const sections = useBoardThemeStore(state => state.sections);

    const theme = useMemo(() => {
        return {
            current: {
                board,
                cards,
                layout,
                sections
            }
        };
    }, [board, cards, layout, sections]);

    return theme;
}