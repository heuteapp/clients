import style from "../layout.module.css"

import LayoutGridCell from "./LayoutGridCell";
import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "../../../core/domain/board/board.hooks";
import { LayoutGridProps } from "../../../core/domain/layout/types/props";

function LayoutGrid(props : LayoutGridProps) {
    const context = useBoardContext();

    const { registry, measurements } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerLayoutGrid(props.sectionId, ref, props)

        return () => {
            registry.unregisterLayoutGrid(props.sectionId)
        }
    }, [props.sectionId, registry])

    return (
        <div ref={ref} className={style.grid} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, ${measurements!.cellSize.inner}px)`,
            gridTemplateRows: `repeat(${props.rowSpan}, ${measurements!.cellSize.inner}px)`,
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