import style from "@/src/modules/ux-board/styles/board.module.scss"
import clsx from "clsx";

import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { boardView } from "../utils/view.utils";
import { BoardCardContainerViewProps } from "../types/props.types";
import { BoardCardItemView } from "./BoardCardItemView";

//

export const BoardCardContainerView = (props : BoardCardContainerViewProps) => (
    VIEW(boardView("board-card-container"), props)
    .RENDER(({ ref, state, context, slot }) => {
        return (  
            <div
                ref={ref}
                className={clsx(style.cardContainer, ...(slot["&"]?.className || []))}
            > 
                {VIEWCONTENT(state, () => (
                    state.cards.map((s, i) => (
                        <BoardCardItemView 
                            key={i} 
                            state={{ data: s, isFrontFace: false, cellStep: 0 }} 
                            context={context}
                        />
                    ))
                ), slot["&"]?.wrapper)}
            </div>
        )
    })
)