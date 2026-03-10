import { useRef } from "react";
import { BoardSessionState } from "@/src/core/types/domain/board/board.session";

export function useBoardSessionRef() : React.RefObject<BoardSessionState> {
    const sessionRef = useRef({
        pointerId: null,
        cardCreation: null,
        cardMovement: null,
        cardResize: null,
    });

    return sessionRef;
}