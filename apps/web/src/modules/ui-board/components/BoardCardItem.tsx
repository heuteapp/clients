import { useBoardContext } from "@/src/modules/ui-board/hooks/useBoardContext"
import { BoardCardItemProps } from "@/src/modules/ui-board/types/board.props";
import { useLayoutEffect, useRef } from "react";
import { BoardCardDisplay } from "./BoardCardDisplay";
import { getBoardCardDataSet } from "../utils/ui.utils";

function BoardCardItem(props : BoardCardItemProps) {
    const { data: boardCardData } = props;
    const { registry} = useBoardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerBoardCard(boardCardData.id, ref, props)

        return () => {
            registry.unregisterBoardCard(boardCardData.id)
        }
    }, [registry, props.data])

    const boardCardContent = boardCardData.content;
    const placement = boardCardData.placement;

    if(!placement) return null;

    return (
        <BoardCardDisplay 
            state={{
                content: boardCardContent,
                isFrontFace: true,
            }}
            ref={ref}
            {...getBoardCardDataSet(boardCardData)}
        />
    )
}

export default BoardCardItem