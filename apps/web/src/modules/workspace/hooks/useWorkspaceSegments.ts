import { usePathSegments } from "@/src/modules/ui-shared/hooks/usePathSegments"

export const useWorkspaceSegments = () => {
    const segmentResult = usePathSegments({
        startsWith: "/workspace",
    });

    return segmentResult;
}