import { useCallback, useEffect, useRef, useState } from "react";
import { CardTransformOverlayMode, CardTransformOverlayProps } from "../types/overlay.types";

export function CardTransformOverlay({ cardRef } : CardTransformOverlayProps) {
    const [mode, setMode] = useState<CardTransformOverlayMode>("idle");
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const getRect = useCallback(() => {
        if(!cardRef?.current) return null;
        return cardRef.current.getBoundingClientRect();
    }, [cardRef]);

    useEffect(() => {
        if(!cardRef || !cardRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            const rect = getRect();
            if(rect && overlayRef.current) {
                overlayRef.current.style.width = `${rect.width}px`;
                overlayRef.current.style.height = `${rect.height}px`;
                overlayRef.current.style.left = `${rect.left}px`;
                overlayRef.current.style.top = `${rect.top}px`;
            }
        });

        resizeObserver.observe(cardRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [cardRef]);

    if(!cardRef || !cardRef.current) return null;

    return (
        <div            
            ref={overlayRef}
            style={{
                position: "fixed"
            }}
        >

        </div>
    )
}