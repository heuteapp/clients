import { useBoardContext } from "../board.hooks"
import style from "../board.module.css"
import { BoardCardData } from "../board.types"

function BoardCard(props : BoardCardProps) {
    const context = useBoardContext();
    const { measurements } = context.layoutRegistry;

    const section = context.layoutRegistry.getSection(props.sectionId);
    if(!section) return null;

    const rect = section.ref!.current!.getBoundingClientRect();


    console.log(measurements);
    return (
        <div 
            className={style.card} 
            style={{
                left: rect.left + props.colIndex * measurements!.cellSize.inner,
                top: rect.top + props.rowIndex * measurements!.cellSize.inner,
                width: props.colSpan * measurements!.cellSize.inner,
                height: props.rowSpan * measurements!.cellSize.inner,
            }}
        >
        </div>
    )
}

export default BoardCard


export interface BoardCardProps extends BoardCardData {
}