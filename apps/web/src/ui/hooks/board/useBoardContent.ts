import { useMemo } from "react";
import { BoardContent } from "@/src/ui/types/board/board.content";

export function useBoardRegistry() : BoardContent {
    const content = useMemo(() => {
        return {
            current: {
                board: null,
                cards: [],
                layout: null,
                sections: []
            }
        };
    }, []);

    return content;
}