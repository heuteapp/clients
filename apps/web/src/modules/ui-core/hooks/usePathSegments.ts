import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { PathSegmentsConfig, PathSegmentsResult } from "@/src/modules/ui-core/types/path-segments.types";

//

export const usePathSegments = (config?: PathSegmentsConfig): PathSegmentsResult => {
    const pathname = usePathname();
    
    return useMemo(() => {
        let segments = pathname.split('/').filter(Boolean);
        
        if (config) {
            if (config.startsWith) {
                const prefixSegments = config.startsWith.split('/').filter(Boolean);
                const isMatch = segments.length >= prefixSegments.length && 
                    prefixSegments.every((seg, i) => seg === segments[i]);
                
                if (!isMatch) {
                    segments = [];
                } else {
                    segments = segments.slice(prefixSegments.length);
                }
            }
            
            if (config.exclude) {
                segments = segments.filter(segment => !config.exclude?.includes(segment));
            }
            
            if (config.maxDepth && config.maxDepth > 0) {
                segments = segments.slice(0, config.maxDepth);
            }
            
            if (config.transform) {
                segments = segments.map((segment, index) => config.transform!(segment, index));
            }
        }
        
        return {
            segments,
            current: segments[segments.length - 1],
            path: '/' + segments.join('/'),
            fullPath: pathname,
            depth: segments.length,
            isRoot: segments.length === 0,
        };
    }, [pathname, config]);
};