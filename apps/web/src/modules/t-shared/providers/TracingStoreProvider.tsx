import { useCallback, useMemo } from "react";
import { TracingStoreContext } from "../contexts/tracing.context";
import { TracingStoreProviderProps } from "../types/props.types";
import { TracingDomainData, TracingDomain, TracingItemData } from "../types/context.types";

export function TracingStoreProvider({ children }: TracingStoreProviderProps) {
    const domains = useMemo(() => ({} as Record<string, TracingDomain>), []);

    const subscribe = useCallback((name: string, data: TracingDomainData): boolean => {
        if(domains[name]) {
            throw new Error(`Domain with name ${name} already exists in TracingStore.`);
        }

        domains[name] = {
            getItemsOf: (type: string, filter?: (item: TracingItemData) => boolean) => {
                const items = Array.from(data.items.values()).filter(item => item.type === type);
                return filter ? items.filter(filter) : items;
            }
        };

        return true;

    }, []);

    const unsubscribe = useCallback((name: string): boolean => {
        if(!domains[name]) {
            throw new Error(`Domain with name ${name} does not exist in TracingStore.`);
        }

        delete domains[name];
        return true;
    }, []);

    const contextValue = useMemo(() => ({
        subscribe, unsubscribe, domains
    }), [subscribe, unsubscribe, domains]);

    return (
        <TracingStoreContext.Provider value={contextValue}>
            {children}
        </TracingStoreContext.Provider>
    );
}