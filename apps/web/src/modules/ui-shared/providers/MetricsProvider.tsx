import { useCallback, useEffect } from "react";
import { MetricsContext } from "../contexts/ui.context";
import React from "react";

export function MetricsProvider({ children, target }: MetricsProviderProps) {
    const [func, setFunc] = React.useState<(() => void) | null>(null);

    const subscribe = useCallback((t: string, fn: () => void) => {
        if(t === target) {
            setFunc(fn);
            return true;
        }
        return false;
    }, [target]);

    useEffect(() => {
        if(!func) return;

        const observer = new ResizeObserver(func);
        observer.observe(document.body);

        return () => {
            observer.disconnect();
        };
    }, [func]);

    return (
        <MetricsContext.Provider value={{ target, subscribe }}>
            {children}
        </MetricsContext.Provider>
    );
}

export type MetricsProviderProps = {
    children: React.ReactNode;
    target: string;
}