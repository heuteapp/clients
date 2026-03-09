import { useRef } from "react";
import { createBoardRegistry } from "@/src/ui/registries/board.registry";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";

export function useBoardRegistry() : BoardRegistry {
    const boardRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);
    const registryRef = useRef<BoardRegistry | null>(null)

    if (!registryRef.current) {
        registryRef.current = createBoardRegistry(boardRef, layoutRef);
    }

    return registryRef.current;
}