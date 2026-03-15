import { useMemo } from "react";
import { BoardTheme } from "@/src/ui/types/board/board.theme";

export function useBoardTheme() : BoardTheme {
    const theme = useMemo(() => {
        return {
            current: {
                board: null,
                cards: [],
                layout: null,
                sections: []
            }
        };
    }, []);

    return theme;
}