import { useBoardContext } from "../../hooks/board.hooks"
import style from "@/src/ui/styles/board.module.css"
import BoardCard from "./BoardCard"
import { BoardCardContainerProps } from "@/src/ui/types/board/board.props";
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
                <BoardCard key={card.id} {...card} />
            ))}
        </div>
    )
}

export default BoardCardContainer