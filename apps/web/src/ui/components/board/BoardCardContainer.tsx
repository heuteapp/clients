import { useBoardContext } from "../../hooks/board.hooks"
import style from "@/src/ui/styles/board.module.css"
import BoardCard from "./BoardCard"
import { BoardCardContainerProps } from "@/src/ui/types/board/props";

function BoardCardContainer(props : BoardCardContainerProps) {
    useBoardContext();

    return (
        <div 
            className={style.cardContainer} 
            style={{
            }}
        >
            {props.cards.map(card => (
                <BoardCard key={card.id} {...card} />
            ))}
        </div>
    )
}

export default BoardCardContainer