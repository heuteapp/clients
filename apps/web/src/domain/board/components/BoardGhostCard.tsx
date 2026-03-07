import { GridRect } from "@/src/types"
import style from "../board.module.css"
import { useBoardContext } from "../board.hooks";

function BoardGhostCard(props : BoardGhostCardProps) {
    const { session, layoutRegistry } = useBoardContext();

    const section = layoutRegistry.getSection(session.cardCreate?.currentSectionId!);

    if(!section) return null;

    const gridEl = section.grid!.ref?.current!;
    const gridRect = gridEl.getBoundingClientRect();
    const layoutMeasurements = layoutRegistry.measurements!;

    const position = {
        left : gridRect.left + (props.rect.colIndex - 2) * layoutMeasurements.cellSize.inner,
        top: gridRect.top + (props.rect.rowIndex - 1) * layoutMeasurements.cellSize.inner,
        width: layoutMeasurements.cellSize.inner * props.rect.colSpan,
        height: layoutMeasurements.cellSize.inner * props.rect.rowSpan,
    }

    return (
        <div 
            className={style.ghostCard} 
            style={{
                left: position.left,
                top: position.top,
                width: position.width,
                height: position.height,
            }}
        >
        </div>
    )
}

export default BoardGhostCard


export interface BoardGhostCardProps {
    rect: GridRect;
}