import { useBoardContext } from "@/src/modules/ui-board/hooks/useBoardContext"
import { BoardCardItemProps } from "@/src/modules/ui-board/types/board.props";
import { useLayoutEffect, useRef } from "react";
import { BoardCardDisplay } from "./BoardCardDisplay";
import { getBoardCardDataSet } from "../utils/ui.utils";
import { TracedItem } from "../../t-shared/components/TracedItem";

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
        <TracedItem
            type="board-card-item"
            id={boardCardData.name}
            data={boardCardData}
            ref={ref}
        >
            <BoardCardDisplay 
                state={{
                    content: boardCardContent,
                    isFrontFace: true,
                }}
                ref={ref}
                {...getBoardCardDataSet(boardCardData)}
            />
        </TracedItem>
    )
}

export default BoardCardItem