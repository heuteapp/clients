import { useRef } from "react";
import { BoardSession } from "@/src/ui/types/board/board.session";
import { createBoardSession } from "@/src/ui/utils/board/board.session";

export function useBoardSessionRef() : React.RefObject<BoardSession> {
    const sessionRef = useRef(createBoardSession());

    return sessionRef;
}