import { useEffect, useState } from "react";
import { useCategoryStore } from "@/src/heute-store/stores/category.store";
import { useAuthContext } from "@/src/modules/ui-auth/hooks/useAuthContext";
import { heuteApi } from "@/src/api/heuteApi";
import { LoaderState } from "@/src/heute-store/types/loader.types";

export const useCategoriesLoader = () : LoaderState => {
    const { state } = useAuthContext();
    const { loadMe } = useCategoryStore();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!state.matches("authenticated")) {
            return;
        }

        let isMounted = true;
        setIsLoading(true);

        heuteApi.me.categories.getHierarchy()
            .then(categories => {
                if (isMounted) {
                    loadMe(categories);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error("Failed to load categories"));
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [state, loadMe]);

    return { isLoading, error };
};