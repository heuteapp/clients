import { useBoardContext } from "@/src/ui/hooks/core/domain/useBoardContext"
import style from "@/src/ui/styles/board.module.css"
import BoardCard from "./BoardCard"
import { BoardCardContainerProps } from "@/src/ui/types/domain/board/board.props";
import { useLayoutEffect, useRef } from "react";

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
                <BoardCard key={card.id.client} {...card} />
            ))}
        </div>
    )
}

export default BoardCardContainer