import { useMemo } from "react";
import { WorkspaceDailyboardConfig, WorkspaceDailyboardMetadata } from "../types/workspace-dailyboard.types";
import { usePathname } from "next/navigation";
import { parseDailyboardPath, validateDailyboardPath } from "../../shared/utils/dailyboard.utils";
import { dateToYYMMDD, isToday } from "../../shared/utils/date.utils";
import { useWorkspaceContext } from "../../workspace/hooks/useWorkspaceContext";

export function useWorkspaceDailyboard(config: WorkspaceDailyboardConfig = {}): WorkspaceDailyboardMetadata {
    const pathName = usePathname();
    const context = useWorkspaceContext();
    const { segmentsResult } = context.metadata;

    const relativePath = segmentsResult.segments.slice(1).join("/");
    const stableConfig = useMemo(() => config, [JSON.stringify(config)]);

    return useMemo(() => {
        const dailyboardData = parseDailyboardPath(relativePath);

        const { isValid, errors } = validateDailyboardPath(dailyboardData, stableConfig.path);
        const date = dailyboardData?.date || dateToYYMMDD(getCurrentUTCDate())!;
        
        const enrichedData: WorkspaceDailyboardMetadata = {
            categories: dailyboardData?.categories || [],
            date,
            isDateToday: isToday(date),
            categoryDepth: dailyboardData?.categories.length || 0,
            categoryPath: dailyboardData?.categories.join("/") || "",
            isValid,
            errors,
        };
        
        return enrichedData;
    }, [pathName, stableConfig]);
}

const getCurrentUTCDate = (): Date => {
    const now = new Date();
    return new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0, 0, 0, 0
    ));
};