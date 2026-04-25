import React, { useEffect, useMemo } from "react";
import { CardInteractionProviderProps } from "../types/props.types";
import { useTracingDomain } from "../../t-core/hooks/useTracingDomain";

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

    return (
        <>
            {children}
        </>
    );
}