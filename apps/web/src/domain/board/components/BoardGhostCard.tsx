import { GridRect, GridSize } from "@/src/shared/types"
import style from "../board.module.css"
import { useBoardContext } from "../board.hooks";

function BoardGhostCard(props : BoardGhostCardProps) {
    const { layoutRegistry } = useBoardContext();

    const cellSize = layoutRegistry.measurements!.cellSize.inner;

    return (
        <div 
            className={style.ghostCard} 
            style={{
                left: "var(--ghost-card-x)",
                top: "var(--ghost-card-y)",
                width: `var(--ghost-card-width)`,
                height: `var(--ghost-card-height)`
            }}
        >
        </div>
    )
}

export default BoardGhostCard


export interface BoardGhostCardProps {

}