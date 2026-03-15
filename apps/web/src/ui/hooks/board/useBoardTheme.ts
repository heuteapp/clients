import { useMemo } from "react";
import { BoardTheme } from "@/src/ui/types/board/board.theme";
import { useBoardThemeStore } from "@/src/stores/board.theme.store";
import { BoardThemeValue } from "@/src/core/types/domain/board/board.theme";

export function useBoardTheme() : BoardTheme {
    const board = useBoardThemeStore(state => state.board);
    const cards = useBoardThemeStore(state => state.cards);
    const layout = useBoardThemeStore(state => state.layout);
    const sections = useBoardThemeStore(state => state.sections);

    const value : BoardThemeValue = useMemo(() => {
        return {
            board,
            cards,
            layout,
            sections
        };
    }, [board, cards, layout, sections]);

    const theme = useMemo(() => {
        return {
            current: {
                ...value,
            }
        }
    }, [value]);

    return theme;
}