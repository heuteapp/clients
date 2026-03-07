import style from "../board.module.css"

function BoardCardContainer(props : BoardCardContainerProps) {
    return (
        <div className={style.cardContainer} style={{
            visibility: "hidden"
        }}/>
    )
}

export default BoardCardContainer


export interface BoardCardContainerProps {
}