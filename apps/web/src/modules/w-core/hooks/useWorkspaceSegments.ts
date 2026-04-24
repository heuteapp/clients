import { usePathSegments } from "@/src/modules/ui-core/hooks/usePathSegments"
import { useMemo } from "react";

export const useWorkspaceSegments = () => { 
    const config = useMemo(() => ({
        startsWith: "/workspace",
    }), []);
    
    return usePathSegments(config);
}