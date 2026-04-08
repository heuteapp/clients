import { useMemo } from "react";
import { MetricsContext } from "../contexts/ui.context";
import React from "react";

export function MetricsProvider({ children, target }: MetricsProviderProps) {
    const [func, setFunc] = React.useState<(() => void) | null>(null);

    const subscribe = useMemo(() => (
        (t: string, fn: () => void) => {
            if(t === target) {
                setFunc(fn);
                return true;
            }

            return false;
        }
    ), [target]);

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