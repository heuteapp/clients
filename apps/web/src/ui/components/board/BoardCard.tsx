import { useBoardContext } from "../../hooks/board.hooks"
import style from "@/src/ui/styles/board.module.css"
import { BoardCardProps } from "@/src/ui/types/board/board.props";
import { useLayoutEffect, useRef } from "react";

function BoardCard(props : BoardCardProps) {
    const { registry} = useBoardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerBoardCard(props.id, ref, props)

        return () => {
            registry.unregisterBoardCard(props.id)
        }
    }, [registry]) 

    const section = registry.getLayoutGrid(props.sectionId);
    if(!section) return null;

    const gap = 6;

    /*const rawPosition = {
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
    }*/

    const current = section.ref!.current;


    return (
        <div 
            className={style.card} 
            style={{
                left: "var(--card-left)",
                top: "var(--card-top)",
                width: "var(--card-width)",
                height: "var(--card-height)",
            }}
            ref={ref}
        >
        </div>
    )
}

export default BoardCard