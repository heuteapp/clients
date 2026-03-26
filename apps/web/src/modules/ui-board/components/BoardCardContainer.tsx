import style from "@/src/modules/ui-board/styles/board.module.css"

import { useLayoutEffect, useRef } from "react";
import BoardCard from "./BoardCard"

import { useBoardContext } from "@/src/modules/ui-board/hooks/useBoardContext"
import { BoardCardContainerProps } from "@/src/modules/ui-board/types/board.props";

//

function BoardCardContainer(props : BoardCardContainerProps) {
    const { registry } = useBoardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerBoardCardContainer(ref, props)

        return () => {
          registry.unregisterBoardCardContainer()
        }
    }, [registry])

    return (
        <div 
            className={style.cardContainer} 
            ref={ref}
        >
            {props.cards.map(card => (
                <BoardCard key={card.id} {...card} />
            ))}
        </div>
    )
}

export default BoardCardContainer