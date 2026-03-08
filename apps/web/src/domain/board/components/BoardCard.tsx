import { useBoardContext } from "../board.hooks"
import style from "../board.module.css"
import { BoardCardData } from "../board.types"

function BoardCard(props : BoardCardProps) {
    const context = useBoardContext();
    const { registry, measurements } = context;

    const section = registry.getLayoutGrid(props.sectionId);
    if(!section) return null;

    const rootRect = registry.layout!.ref!.current!.getBoundingClientRect();
    const sectionRect = section.ref!.current!.getBoundingClientRect();

    const left = sectionRect.left - rootRect.left;
    const top = sectionRect.top - rootRect.top;

    return (
        <div 
            className={style.card} 
            style={{
                left: left + (props.colIndex - 1) * measurements!.cellSize.inner,
                top: top + (props.rowIndex - 1) * measurements!.cellSize.inner,
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