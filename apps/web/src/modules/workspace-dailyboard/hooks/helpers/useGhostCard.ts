import { GridRect, GridSize, Rect } from "@/src/modules/shared/types/common";
import { findDailyboardInSubtree } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { useEffect, useRef, useState } from "react";

export const useGhostCard = () => {
    const [isActive, setIsActive] = useState(false);
    const [cardSize, setCardSize] = useState<GridSize | null>(null);

    const dailyboardElement = useRef<HTMLDivElement | null>(null);
    const sectionElement = useRef<HTMLDivElement | null>(null);
    const gridElement = useRef<HTMLDivElement | null>(null);

    const ghostCardElement = useRef<HTMLDivElement | null>(null);
    const ghostCardGridPos = useRef<GridRect | null>(null);
    const ghostCardPos = useRef<Rect | null>(null);
    const isGhostCardOverlapping = useRef<boolean>(false);

    const suggestedCardElement = useRef<HTMLDivElement | null>(null);
    const suggestedCardGridPos = useRef<GridRect | null>(null);
    const suggestedCardPos = useRef<Rect | null>(null);

    useEffect(() => {
        if(isActive && cardSize) {
            dailyboardElement.current = findDailyboardInSubtree(document.body);

            createGhostCard();
        }
        else {
            dailyboardElement.current = null;

            removeGhostCard();
        }
    }, [isActive]);

    const createGhostCard = () => {
        if(!dailyboardElement.current) return;
        if(ghostCardElement.current) return;

        ghostCardElement.current = document.createElement("div");
        ghostCardElement.current.id = "dailyboard-ghost-card";

        document.body.appendChild(ghostCardElement.current);
    }

    const removeGhostCard = () => {
        if(!ghostCardElement.current) return;

        document.body.removeChild(ghostCardElement.current);
        ghostCardElement.current = null;
    }

    //

    const start = (cardSize: GridSize) => {
        if(!isActive) {
            setIsActive(true);
            setCardSize(cardSize);
            return true;
        }

        return false;
    }

    const finish = () => {
        if(isActive) {
            setIsActive(false);
            setCardSize(null);
            return true;
        }

        return false;
    }

    return { start, finish };
}