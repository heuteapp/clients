import { useCallback, useEffect, useMemo } from "react";
import { TracingDomainContext } from "../contexts/tracing.context";
import { TracingDomainProviderProps } from "../types/props.types";
import { TracingItemData } from "../types/context.types";
import { useTracingStore } from "../hooks/useTracingStore";

export function TracingDomainProvider({ name, children }: TracingDomainProviderProps) {
    const { subscribe, unsubscribe } = useTracingStore();
    const items = useMemo(() => new Map<string, TracingItemData>(), []);

    const trace = useCallback((id: string, item: TracingItemData) => {
        if(items.has(id)) return false;

        items.set(id, item);
        return true;
    }, [items]);

    const untrace = useCallback((id: string) => {
        return items.delete(id);
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