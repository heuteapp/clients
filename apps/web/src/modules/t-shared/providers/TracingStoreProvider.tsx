import { useState, useCallback, useMemo, useRef } from "react";
import { TracingStoreContext } from "../contexts/tracing.context";
import { TracingStoreProviderProps } from "../types/props.types";
import { TracingDomainData, TracingDomain, TracingItemData } from "../types/context.types";

export function TracingStoreProvider({ children }: TracingStoreProviderProps) {
    const [domains, setDomains] = useState<Record<string, TracingDomain>>({});
    const domainsData = useRef<Map<string, TracingDomainData>>(new Map());

    const subscribe = useCallback((name: string, data: TracingDomainData): boolean => {
        if (domainsData.current.has(name)) return false;
        
        domainsData.current.set(name, data);
        
        const domain: TracingDomain = {
            getItemsOf: (type: string, filter?: (item: TracingItemData) => boolean) => {
                const data = domainsData.current.get(name);
                if (!data) return [];
                
                const items: TracingItemData[] = [];
                for (const item of data.items) {
                    if (item.type === type && (!filter || filter(item))) {
                        items.push(item);
                    }
                }
                return items;
            }
        };
        
        setDomains(prev => ({ ...prev, [name]: domain }));
        return true;
    }, []);

    const unsubscribe = useCallback((name: string): boolean => {
        const deleted = domainsData.current.delete(name);
        if (deleted) {
            setDomains(prev => {
                const newDomains = { ...prev };
                delete newDomains[name];
                return newDomains;
            });
        }
        return deleted;
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