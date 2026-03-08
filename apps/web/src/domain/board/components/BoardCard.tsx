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
                left: 8 + left + (props.colIndex - 1) * measurements!.cellSize.inner,
                top: 8 + top + (props.rowIndex - 1) * measurements!.cellSize.inner,
                width: props.colSpan * measurements!.cellSize.inner - 16,
                height: props.rowSpan * measurements!.cellSize.inner - 16,
            }}
        >
        </div>
    )
}

export default BoardCard


export interface BoardCardProps extends BoardCardData {
}