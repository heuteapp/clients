import { useMemo } from "react";
import { TracingContext } from "../contexts/tracing.context";
import { TracingProviderProps } from "../types/props.types";

export function TracingProvider({ children }: TracingProviderProps) {
    const contextValue = useMemo(() => {
        return {
            components: new Map(),
        };
    }, []);

    return (
        <TracingContext.Provider value={contextValue}>
            {children}
        </TracingContext.Provider>
    );
}