import { BoardCardItemProps } from "@/src/modules/ux-board/types/board.props";
import { BoardCardItemView } from "../../ui-board/components/BoardCardItemView";
import { TracedItem } from "../../t-core/components/TracedItem";
import { useRef } from "react";

function BoardCardItem(props : BoardCardItemProps) {
    const { data: boardCardData } = props;
    const ref = useRef<HTMLDivElement>(null);

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
            <BoardCardItemView 
                state={{
                    content: boardCardContent,
                    isFrontFace: true,
                }}
                ref={ref}
                sx={{
                    body: {
                        position: "fixed",
                    }
                }}
            />
        </TracedItem>
    )
}

export default BoardCardItem