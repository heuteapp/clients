import { useMemo } from "react";
import { WorkspaceBoardConfig, WorkspaceBoardMetadata } from "../types/workspace-board.types";
import { usePathname } from "next/navigation";
import { parseBoardPath, validateBoardPath } from "../../shared/utils/board.utils";
import { dateToYYMMDD } from "../../shared/utils/date.utils";

export function useWorkspaceBoard(config: WorkspaceBoardConfig = {}): WorkspaceBoardMetadata {
    const pathName = usePathname();
    const relativePath = pathName.replace(/^\/workspace\/board\/?/, "");
    
    return useMemo(() => {
        const boardData = parseBoardPath(relativePath);

        const { isValid, errors } = validateBoardPath(boardData, config.path);
        
        const enrichedData: WorkspaceBoardMetadata = {
            categories: boardData?.categories || [],
            date: boardData?.date || dateToYYMMDD(new Date()),
            categoryDepth: boardData?.categories.length || 0,
            categoryPath: boardData?.categories.join("/") || "",
            isValid,
            errors,
        };
        
        return enrichedData;
    }, [pathName, config]);
}