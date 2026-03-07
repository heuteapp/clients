import { GridRect } from "@/src/types"
import style from "../board.module.css"
import { useBoardContext } from "../board.hooks";

function BoardGhostCard(props : BoardGhostCardProps) {
    const { interaction, session, layoutRegistry } = useBoardContext();

    const section = layoutRegistry.getSection(session.cardCreate?.currentSectionId!);
    const cellSize = layoutRegistry.measurements!.cellSize.inner;

    let stylePosition: React.CSSProperties;

    if (section) {
        const gridEl = section.grid!.ref!.current!;
        const rect = gridEl.getBoundingClientRect();

        stylePosition = {
            left: rect.left + (props.rect.colIndex - 1) * cellSize,
            top: rect.top + (props.rect.rowIndex - 1) * cellSize,
        };

    } else {
        stylePosition = {
            left: "var(--ghost-card-x)",
            top: "var(--ghost-card-y)",
        };
    }

    return (
        <div 
            className={style.ghostCard} 
            style={{
                ...stylePosition,
                width: props.rect.colSpan * cellSize,
                height: props.rect.rowSpan * cellSize,
            }}
        >
        </div>
    )
}

export default BoardGhostCard


export interface BoardGhostCardProps {
    rect: GridRect;
}