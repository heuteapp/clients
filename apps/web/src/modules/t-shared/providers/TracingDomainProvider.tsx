import { useCallback, useEffect, useMemo } from "react";
import { TracingDomainContext } from "../contexts/tracing.context";
import { TracingDomainProviderProps } from "../types/props.types";
import { useTracingStore } from "../hooks/useTracingStore";
import { TracingItemData } from "../types/tracing.types";

export function TracingDomainProvider({ name, children }: TracingDomainProviderProps) {
    const { subscribe, unsubscribe } = useTracingStore();
    const items = useMemo(() => new Map<string, TracingItemData>(), []);

    const trace = useCallback((id: string | null, item: TracingItemData) => {
        const key = id ? `${item.type}-${id}` : item.type;
        if(items.has(key)) return false;

        items.set(key, item);
        return true;
    }, [items]);

    const untrace = useCallback((id: string | null, type: string) => {
        const key = id ? `${type}-${id}` : type;
        return items.delete(key);
    }, [items]);

    const contextValue = useMemo(() => {
        return {
            trace,
            untrace
        };
    }, [trace, untrace]);

    useEffect(() => {
        subscribe(name, { items });

        return () => {
            unsubscribe(name);
        };
    }, []);

    return (
        <TracingDomainContext.Provider value={contextValue}>
            {children}
        </TracingDomainContext.Provider>
    );
}