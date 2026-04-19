import { useCallback, useEffect } from "react";
import { MetricsContext } from "../contexts/ui.context";
import React from "react";

export function MetricsProvider({ rootEl, children, targets }: MetricsProviderProps) {
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

        const observer = new ResizeObserver(() => {
            for (const targetName of targets) {
                const fn = functionsRef.current.get(targetName);
                if(fn) fn();
            }
        });
        
        observer.observe(rootEl || document.body);
        return () => observer.disconnect();
    }, [rootEl, targets]);

    return (
        <MetricsContext.Provider value={{ targets, subscribe, unsubscribe }}>
            {children}
        </MetricsContext.Provider>
    );
}

export type MetricsProviderProps = {
    rootEl?: HTMLElement;
    children: React.ReactNode;
    targets: string[];
}