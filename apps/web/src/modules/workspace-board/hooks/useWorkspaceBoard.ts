import { useMemo } from "react";
import { WorkspaceBoardConfig, WorkspaceBoardMetadata } from "../types/workspace-board.types";
import { enrichBoardData } from "../utils/enrichBoardData";
import { validateCategoryDepth } from "../utils/validateCategoryDepth";
import { useWorkspaceBoardUtils } from "./useWorkspaceBoardUtils";
import { usePathname } from "next/navigation";

export function useWorkspaceBoard(config: WorkspaceBoardConfig = {}): WorkspaceBoardMetadata {
    const pathName = usePathname();
    const utils = useWorkspaceBoardUtils(config);
    
    return useMemo(() => {
        const boardData = utils.parsePath(pathName);
        const enrichedData = enrichBoardData(boardData);
        
        const validation = validateCategoryDepth(enrichedData.categoryDepth, config);
        if (!validation.isValid) {
            console.warn('Invalid board path:', validation.error);
        }
        
        return enrichedData;
    }, [pathName, config]);
}