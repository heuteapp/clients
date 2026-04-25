import { useCallback, useLayoutEffect, useMemo } from "react";
import { TracingDomainContext } from "../contexts/tracing.context";
import { TracingDomainProviderProps } from "../types/props.types";
import { useTracingStore } from "../hooks/useTracingStore";
import { TracingItemData, TracingItemParams } from "../types/tracing.types";

export function TracingDomainProvider({ name, children }: TracingDomainProviderProps) {
    const { subscribe, unsubscribe, domains } = useTracingStore();

    useLayoutEffect(() => {
        subscribe(name, { items });

        return () => {
            unsubscribe(name);
        };
    }, []);

    const items = useMemo(() => new Map<string, TracingItemData>(), []);

    const trace = useCallback((id: string | null, item: TracingItemParams) => {
        const key = id ? `${item.type}-${id}` : item.type;
        if(items.has(key)) return false;

        items.set(key, { id, ...item });
        return true;
    }, [items]);

    const untrace = useCallback((id: string | null, type: string) => {
        const key = id ? `${type}-${id}` : type;
        return items.delete(key);
    }, [items]);

    const selector = useMemo(() => {
        return domains[name];
    }, [domains[name]]);

    const contextValue = useMemo(() => {
        return {
            trace,
            untrace,
            selector
        };
    }, [trace, untrace, selector]);

    return (
        <TracingDomainContext.Provider value={contextValue}>
            {children}
        </TracingDomainContext.Provider>
    );
}