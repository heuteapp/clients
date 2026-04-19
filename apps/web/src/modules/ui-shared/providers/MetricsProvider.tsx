import { useCallback, useEffect } from "react";
import { MetricsContext } from "../contexts/ui.context";
import React from "react";

export function MetricsProvider({ rootRef, children, targets }: MetricsProviderProps) {
    const functionsRef = React.useRef<Map<string, () => void>>(new Map());
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    const subscribe = useCallback((targetName: string, fn: () => void) => {
        functionsRef.current.set(targetName, fn);
        forceUpdate();
        return true;
    }, []);

    const unsubscribe = useCallback((targetName: string) => {
        functionsRef.current.delete(targetName);
        forceUpdate();
        return true;
    }, []);

    useEffect(() => {
        if(functionsRef.current.size === 0) return;
        if(!rootRef?.current) return;

        const observer = new ResizeObserver(() => {
            for (const targetName of targets) {
                const fn = functionsRef.current.get(targetName);
                if(fn) fn();
            }
        });
        
        observer.observe(rootRef?.current || document.body);
        return () => observer.disconnect();
    }, [rootRef?.current, targets]);

    return (
        <MetricsContext.Provider value={{ targets, subscribe, unsubscribe }}>
            {children}
        </MetricsContext.Provider>
    );
}

export type MetricsProviderProps = {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
    targets: string[];
}