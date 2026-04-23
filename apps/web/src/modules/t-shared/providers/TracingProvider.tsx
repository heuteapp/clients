import { useCallback, useMemo } from "react";
import { TracingContext } from "../contexts/tracing.context";
import { TracingProviderProps } from "../types/props.types";
import { TracingItemData } from "../types/context.types";

export function TracingProvider({ children }: TracingProviderProps) {
    const components = useMemo(() => new Map<string, TracingItemData>(), []);

    const trace = useCallback((key: string, item: TracingItemData) => {
        if(components.has(key)) return false;

        components.set(key, item);
        return true;
    }, [components]);

    const untrace = useCallback((key: string) => {
        return components.delete(key);
    }, [components]);

    const getItemsOf = useCallback((type: string, filter?: (item: TracingItemData) => boolean) => {
        const items: TracingItemData[] = [];
        for(const item of components.values()) {
            if(item.type === type && (!filter || filter(item))) items.push(item);
        }
        return items;
    }, [components]);

    const contextValue = useMemo(() => {
        return {
            trace,
            untrace,
            getItemsOf
        };
    }, [trace, untrace, getItemsOf]);

    return (
        <TracingContext.Provider value={contextValue}>
            {children}
        </TracingContext.Provider>
    );
}