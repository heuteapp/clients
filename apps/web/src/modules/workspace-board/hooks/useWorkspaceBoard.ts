import { useMemo } from "react";
import { WorkspaceBoardConfig, WorkspaceBoardMetadata } from "../types/workspace-board.types";
import { usePathname } from "next/navigation";
import { parseBoardPath, validateBoardPath } from "../../shared/utils/board.utils";
import { dateToYYMMDD, isToday } from "../../shared/utils/date.utils";
import { useWorkspaceContext } from "../../workspace/hooks/useWorkspaceContext";

export function useWorkspaceBoard(config: WorkspaceBoardConfig = {}): WorkspaceBoardMetadata {
    const pathName = usePathname();
    const context = useWorkspaceContext();
    const { segmentsResult } = context.metadata;

    const relativePath = segmentsResult.segments.slice(1).join("/");
    const stableConfig = useMemo(() => config, [JSON.stringify(config)]);

    return useMemo(() => {
        const boardData = parseBoardPath(relativePath);

        const { isValid, errors } = validateBoardPath(boardData, stableConfig.path);
        const date = boardData?.date || dateToYYMMDD(new Date())!;
        
        const enrichedData: WorkspaceBoardMetadata = {
            categories: boardData?.categories || [],
            date,
            isDateToday: isToday(date),
            categoryDepth: boardData?.categories.length || 0,
            categoryPath: boardData?.categories.join("/") || "",
            isValid,
            errors,
        };
        
        return enrichedData;
    }, [pathName, stableConfig]);
}