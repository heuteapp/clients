import { useBoardContext } from "../../hooks/board.hooks"
import style from "@/src/ui/styles/board.module.css"
import { BoardCardProps } from "@/src/ui/types/board/props/BoardCardProps";
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

    current?.style.setProperty("--step-size-width", `var(--layout-grid-inner-width) / ${section.props!.colSpan}`);
    current?.style.setProperty("--step-size-height", `var(--layout-grid-inner-height) / ${section.props!.rowSpan}`);

    current?.style.setProperty("--card-left", `calc(var(--layout-grid-relative-inner-left) + (var(--step-size-width) * ${props.colIndex - 1}) + ${gap}px)`);
    current?.style.setProperty("--card-top", `calc(var(--layout-grid-relative-inner-top) + (var(--step-size-height) * ${props.rowIndex - 1}) + ${gap}px)`);
    current?.style.setProperty("--card-width", `calc((var(--step-size-width) * ${props.colSpan}) - ${gap * 2}px)`);
    current?.style.setProperty("--card-height", `calc((var(--step-size-height) * ${props.rowSpan}) - ${gap * 2}px)`);

 

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