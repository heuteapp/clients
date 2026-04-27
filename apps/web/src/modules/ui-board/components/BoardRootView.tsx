import style from "@/src/modules/ux-board/styles/board.module.scss"
import clsx from "clsx";

import { VIEW } from "../../ui-base/utils/view.utils";
import { boardView } from "../utils/view.utils";
import { BoardRootViewProps } from "../types/props.types";
import { BoardCardContainerView } from "./BoardCardContainerView";

export const BoardRootView = (props : BoardRootViewProps) => (
    VIEW(boardView("board-root"))
    .RENDER(props, ({ ref, state, slot }) => {
      return (
        <div 
          ref={ref} 
          className={clsx(style.board, ...(slot.className?.["&"] || []))}
        >
          {slot.render?.["&"] ? slot.render["&"](state) 
            : <BoardCardContainerView state={{ cards: state.board.cards }} port={props.port} />}
        </div>
      )
    })
)