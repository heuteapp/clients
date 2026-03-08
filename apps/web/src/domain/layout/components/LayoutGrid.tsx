import style from "../layout.module.css"

import LayoutGridCell from "./LayoutGridCell";
import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "../../board/board.hooks";
import { LayoutGridProps } from "../types/layout.props.types";

function LayoutGrid(props : LayoutGridProps) {
    const context = useBoardContext();

    const { layoutRegistry } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        layoutRegistry.registerGrid(props.sectionId, ref, props)

        return () => {
            layoutRegistry.unregisterGrid(props.sectionId)
        }
    }, [props.sectionId, layoutRegistry])

    return (
        <div ref={ref} className={style.grid} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, ${layoutRegistry.measurements!.cellSize.inner}px)`,
            gridTemplateRows: `repeat(${props.rowSpan}, ${layoutRegistry.measurements!.cellSize.inner}px)`,
        }}>
            {
                Array.from({ length: props.rowSpan }).map((_, rowIndex) => (
                    Array.from({ length: props.colSpan }).map((_, colIndex) => (
                        <LayoutGridCell
                            key={rowIndex + "-" + colIndex}
                            sectionId={props.sectionId}
                            rowIndex={rowIndex + 1}
                            colIndex={colIndex + 1}
                        />
                    ))
                ))
            }
        </div>
    )
}

export default LayoutGrid