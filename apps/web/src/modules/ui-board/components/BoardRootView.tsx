import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
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
          className={clsx(style.canvas, ...(slot.className?.["&"] || []))}
        >
          {slot.render?.["board-card-container"]?.["&"] ? slot.render["board-card-container"]["&"](state) 
            : state.container && <BoardCardContainerView state={state.container} port={props.port} />}
        </div>
      )
    })
)