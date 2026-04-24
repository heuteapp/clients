import style from "@/src/modules/ui-board/styles/board.module.scss"

import { useRef } from "react";
import BoardCardItem from "./BoardCardItem"

import { BoardCardContainerProps } from "@/src/modules/ui-board/types/board.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";

//

function BoardCardContainer(props : BoardCardContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedUniqueItem
            type="board-card-container"
            ref={ref}
        >
            <div 
                className={style.cardContainer} 
                ref={ref}
            >
                {props.cards.map(card => (
                    <BoardCardItem key={card.id} data={card} />
                ))}
            </div>
        </TracedUniqueItem>
    )
}

export default BoardCardContainer