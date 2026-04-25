import { BoardCardItemProps } from "@/src/modules/ux-board/types/board.props";
import { BoardCardItemView } from "../../ui-board/components/BoardCardItemView";
import { TracedItem } from "../../t-core/components/TracedItem";
import { useRef } from "react";

export function BoardCardItem({ data } : BoardCardItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedItem
            type="board-card-item"
            id={data.name}
            data={data}
            ref={ref}
        >
            <BoardCardItemView 
                state={{
                    content: data.content,
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