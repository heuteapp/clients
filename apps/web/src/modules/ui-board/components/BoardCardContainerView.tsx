import style from "@/src/modules/ux-board/styles/board.module.scss"
import clsx from "clsx";

import { VIEW } from "../../ui-base/utils/view.utils";
import { boardView } from "../utils/view.utils";
import { BoardCardContainerViewProps } from "../types/props.types";
import { BoardCardItemView } from "./BoardCardItemView";

//

export const BoardCardContainerView = (props : BoardCardContainerViewProps) => (
    VIEW(boardView("board-card-container"))
    .RENDER(props, ({ ref, state, slot }) => {
        return (  
            <div
                ref={ref}
                className={clsx(style.cardContainer, ...(slot.className?.["&"] || []))}
            > 
                {slot.render?.["&"] ? slot.render["&"](state) 
                    : state.cards.map((s, i) => <BoardCardItemView key={i} state={s} port={props.port} />)}
            </div>
        )
    })
)