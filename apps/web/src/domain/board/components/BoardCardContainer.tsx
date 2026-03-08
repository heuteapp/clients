import { useBoardContext } from "../board.hooks"
import style from "../board.module.css"

function BoardCardContainer(props : BoardCardContainerProps) {
    return (
        <div 
            className={style.cardContainer} 
            style={{
            }}
        >
        </div>
    )
}

export default BoardCardContainer


export interface BoardCardContainerProps {
}