import { BoardCardItemProps } from "@/src/modules/ui-board/types/board.props";
import { BoardCardDisplay } from "./BoardCardDisplay";
import { getBoardCardDataSet } from "../utils/ui.utils";
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
            <BoardCardDisplay 
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