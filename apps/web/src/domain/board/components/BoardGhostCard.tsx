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

    return (
        <div 
            className={style.ghostCard} 
            style={{
                left: gridRect.left,
                top: gridRect.top,
                width: layoutMeasurements.cellSize.full * props.rect.colSpan,
                height: layoutMeasurements.cellSize.full * props.rect.rowSpan,
            }}
        >
        </div>
    )
}

export default BoardGhostCard


export interface BoardGhostCardProps {
    rect: GridRect;
}