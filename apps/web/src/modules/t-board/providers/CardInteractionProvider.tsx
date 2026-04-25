import React, { useEffect, useMemo } from "react";
import { CardInteractionProviderProps } from "../types/props.types";
import { useTracingDomain } from "../../t-core/hooks/useTracingDomain";
import { CardInteractionContext } from "../contexts/context";

export function CardInteractionProvider({ children }: CardInteractionProviderProps) {
    const [targetId, setTargetId] = React.useState<string | null>(null);

    const { selector } = useTracingDomain();
    const currentItem = useMemo(() => {
        if (!targetId) return null;
        return selector.itemById("board-card-item", targetId);
    }, [targetId]);

    useEffect(() => {
        console.log("Current item:", currentItem);
    }, [currentItem]);

    const contextValue = useMemo(() => ({
        setTargetId
    }), [setTargetId]);

    return (
        <CardInteractionContext.Provider value={contextValue}>
            {children}
        </CardInteractionContext.Provider>
    );
}