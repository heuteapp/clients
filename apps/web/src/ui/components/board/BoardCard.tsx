import { useBoardContext } from "../../../core/domain/board/board.hooks"
import style from "../board.module.css"
import { BoardCardData } from "../../../core/domain/board/board.types"

function BoardCard(props : BoardCardProps) {
    const context = useBoardContext();
    const { registry, measurements } = context;

    const section = registry.getLayoutGrid(props.sectionId);
    if(!section) return null;


    if(!measurements) return null;

    const rootRect = registry.layout!.ref!.current!.getBoundingClientRect();
    const sectionRect = section.ref!.current!.getBoundingClientRect();

    const gridSize = {
        width: measurements.gridSize.maxWidth / (measurements.cellCount.horizontal / section.props!.colSpan),
        height: measurements.gridSize.maxHeight / (measurements.cellCount.vertical / section.props!.rowSpan)
    }

    const gap = 6;

    const gridRect = {
        left: (sectionRect.left - rootRect.left) + gap,
        top: (sectionRect.top - rootRect.top) + gap,
        width: gridSize.width - gap * 2,
        height: gridSize.height - gap * 2
    }

    const stepSize = {
        width: gridRect.width / section.props!.colSpan,
        height: gridRect.height / section.props!.rowSpan
    }

    const rawPosition = {
        left: gridRect.left + (props.colIndex - 1) * stepSize.width,
        top: gridRect.top + (props.rowIndex - 1) * stepSize.height,
        width: props.colSpan * stepSize.width,
        height: props.rowSpan * stepSize.height,
    }

    const position = {
        left: rawPosition.left + gap,
        top: rawPosition.top + gap,
        width: rawPosition.width - gap * 2,
        height: rawPosition.height - gap * 2
    }

    return (
        <div 
            className={style.card} 
            style={{
                left: position.left,
                top: position.top,
                width: position.width,
                height: position.height
            }}
        >
        </div>
    )
}

export default BoardCard


export interface BoardCardProps extends BoardCardData {
}