import { GridRect } from "@/src/types"
import style from "../board.module.css"
import { useBoardContext } from "../board.hooks";

function BoardGhostCard(props : BoardGhostCardProps) {
    const { layoutRegistry } = useBoardContext();

    const layoutMeasurements = layoutRegistry.measurements!;


    return (
        <div 
            className={style.ghostCard} 
            style={{
                width: layoutMeasurements.cellSize.full * props.rect.colSpan,
                height: layoutMeasurements.cellSize.full * props.rect.rowSpan,
                transform: `translate(${layoutMeasurements.cellSize.full * props.rect.colIndex}px, ${layoutMeasurements.cellSize.full * props.rect.rowIndex}px)`
            }}
        >
        </div>
    )
}

export default BoardGhostCard


export interface BoardGhostCardProps {
    rect: GridRect;
}