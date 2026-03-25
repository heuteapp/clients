import style from "@/src/ui-board/styles/board.module.css"

import { useBoardContext } from "@/src/ui-board/hooks/useBoardContext"
import { BoardCardProps } from "@/src/ui-board/types/board.props";
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