import { useMemo } from "react";
import { WorkspaceBoardConfig, WorkspaceBoardMetadata } from "../types/workspace-board.types";
import { usePathname } from "next/navigation";
import { parseBoardPath } from "../../shared/utils/board.utils";
import { dateToYYMMDD } from "../../shared/utils/date.utils";

export function useWorkspaceBoard(config: WorkspaceBoardConfig = {}): WorkspaceBoardMetadata {
    const pathName = usePathname();
    const relativePath = pathName.replace(/^\/workspace\/board\/?/, "");
    
    return useMemo(() => {
        const boardData = parseBoardPath(relativePath);
        
        const enrichedData: WorkspaceBoardMetadata = {
            categories: boardData?.categories || [],
            date: boardData?.date || dateToYYMMDD(new Date()),
            categoryDepth: boardData?.categories.length || 0,
            categoryPath: boardData?.categories.join("/") || "",
        };
        
        return enrichedData;
    }, [pathName, config]);
}