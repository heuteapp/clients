import { useRef } from "react";

import { BoardCardContainerProps } from "@/src/modules/ux-board/types/board.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { BoardCardContainerView } from "../../ui-board/components/BoardCardContainerView";
import { BoardCardItem } from "./BoardCardItem";

//

export function BoardCardContainer({ src } : BoardCardContainerProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <TracedUniqueItem
            type="board-card-container"
            ref={ref}
        >
            <BoardCardContainerView
                ref={ref}
            >
                {src.map(s => (
                    <BoardCardItem key={s.name} src={s} />
                ))}
            </BoardCardContainerView>
        </TracedUniqueItem>
    )
}