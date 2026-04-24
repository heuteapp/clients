import style from "@/src/modules/ui-board/styles/board.module.scss"

import { useLayoutEffect, useRef } from "react";
import BoardCardItem from "./BoardCardItem"

import { useBoardContext } from "@/src/modules/ui-board/hooks/useBoardContext"
import { BoardCardContainerProps } from "@/src/modules/ui-board/types/board.props";
import { getBoardCardContainerDataSet } from "../utils/ui.utils";

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
            {...getBoardCardContainerDataSet()}
        >
            {props.cards.map(card => (
                <BoardCardItem key={card.id} data={card} />
            ))}
        </div>
    )
}

export default BoardCardContainer