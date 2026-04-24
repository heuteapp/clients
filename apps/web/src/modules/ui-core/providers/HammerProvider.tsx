import React from "react";
import { useState, useEffect } from "react";
import { HammerContext } from "../contexts/ui.context";

export function HammerProvider({ children }: { children: React.ReactNode }) {
    const [Hammer, setHammer] = useState<HammerStatic | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        import("hammerjs")
        .then((module) => {
            setHammer(() => module.default);
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
    }, []);

    const contextValue = React.useMemo(() => {
        return { Hammer, loading, error };
    }, [Hammer, loading, error]);

    return (
        <HammerContext.Provider value={contextValue}>
            {children}
        </HammerContext.Provider>
    );
}