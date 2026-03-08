import { useBoardContext } from "../board.hooks"
import style from "../board.module.css"
import { BoardCardData } from "../board.types"
import BoardCard from "./BoardCard"

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


export interface BoardCardContainerProps {
    cards: BoardCardData[];
}