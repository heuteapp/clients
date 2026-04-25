import style from "@/src/modules/ux-board/styles/board.module.scss"

import { useRef } from "react";

import { BoardCardContainerProps } from "@/src/modules/ux-board/types/board.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { BoardCardItem } from "./BoardCardItem";

//

export function BoardCardContainer({ src } : BoardCardContainerProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <TracedUniqueItem
            type="board-card-container"
            ref={ref}
        >
            <div 
                className={style.cardContainer} 
                ref={ref}
            >
                {src.map(card => (
                    <BoardCardItem key={card.id} src={card} />
                ))}
            </div>
        </TracedUniqueItem>
    )
}