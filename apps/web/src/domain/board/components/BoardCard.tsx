import { useBoardContext } from "../board.hooks"
import style from "../board.module.css"

function BoardCard(props : BoardCardProps) {
    return (
        <div 
            className={style.card} 
            style={{
            }}
        >
        </div>
    )
}

export default BoardCard


export interface BoardCardProps {
}