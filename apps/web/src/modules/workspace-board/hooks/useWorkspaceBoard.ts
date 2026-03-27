import { useEffect, useMemo } from "react";
import { WorkspaceBoardConfig, WorkspaceBoardMetadata } from "../types/workspace-board.types";
import { usePathname } from "next/navigation";
import { parseBoardPath, validateBoardPath } from "../../shared/utils/board.utils";
import { dateToYYMMDD } from "../../shared/utils/date.utils";
import { useWorkspaceContext } from "../../workspace/hooks/useWorkspaceContext";

export function useWorkspaceBoard(config: WorkspaceBoardConfig = {}): WorkspaceBoardMetadata {
    const pathName = usePathname();
    const context = useWorkspaceContext();
    const { segmentsResult, breadcrumbs } = context.metadata;

    const relativePath = segmentsResult.segments.slice(1).join("/");

    useEffect(() => {
                breadcrumbs.setItems([
            ...segmentsResult.segments.map((segment, index) => ({
                name: segment,
                href: `/workspace/${segmentsResult.segments.slice(0, index + 1).join("/")}`,
            }))
        ]);
    }, [segmentsResult])

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