import { useEffect, useState, useCallback, useRef } from "react";
import { useAuthContext } from "@/src/modules/ui-auth/hooks/useAuthContext";
import { heuteApi } from "@/src/api/heuteApi";
import { LoaderState } from "@/src/heute-store/types/loader.types";
import { usePathname } from "next/navigation";
import { useDailyboardStore } from "../stores/dailyboard.store";
import { responseToDailyboard } from "@/src/api/responses/dailyboard.response";

export const useDailyboardLoader = (): LoaderState => {
    const { state } = useAuthContext();
    const { loadMeDailyboard } = useDailyboardStore();

    const pathname = usePathname();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    const lastPathRef = useRef<string | null>(null);

    const getDailyboardPath = useCallback(() => {
        const PREFIX = "/workspace/dailyboard/";
        if (!pathname.startsWith(PREFIX)) return null;
        return pathname.substring(PREFIX.length);
    }, [pathname]);

    useEffect(() => {
        if (!state.matches("authenticated")) {
            return;
        }

        const dailyboardPath = getDailyboardPath();
        if (!dailyboardPath) {
            return;
        }

        if (lastPathRef.current === dailyboardPath && !error) {
            return;
        }

        let isMounted = true;
        setIsLoading(true);
        setError(null);
        lastPathRef.current = dailyboardPath;

        heuteApi.me.dailyboards.getDailyboard(dailyboardPath)
            .then(dailyboard => {
                if (isMounted) {
                    loadMeDailyboard(dailyboard.categoryPath, responseToDailyboard(dailyboard));
                    setIsLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    console.error("Dailyboard load failed:", dailyboardPath, err);
                    setError(err instanceof Error ? err : new Error("Failed to load dailyboard"));
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [state, pathname, loadMeDailyboard, getDailyboardPath, error]);

    return { isLoading, error };
};