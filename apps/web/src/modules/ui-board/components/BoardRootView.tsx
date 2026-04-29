import style from "@/src/modules/ux-board/styles/board.module.scss"
import clsx from "clsx";

import { VIEWCONTENT, VIEWROOT } from "../../t-core/utils/view.utils";
import { boardRootView } from "../utils/view.utils";
import { BoardRootViewProps } from "../types/props.types";
import { BoardCardContainerView } from "./BoardCardContainerView";
import { Box } from "@mui/material";

export const BoardRootView = (props : BoardRootViewProps) => (
    VIEWROOT(boardRootView, props)
    .CONFIG({})
    .RENDER(({ ref, state, context, slot }) => {
      return (
        <Box 
          ref={ref} 
          className={clsx(style.board, ...(slot["&"]?.className || []))}
          sx={{
            ...slot["&"]?.sx
          }}
        >
          {VIEWCONTENT(state, () => (
            <BoardCardContainerView 
              state={{ ...state.container }}
              context={context}
            />
          ), slot["&"]?.wrapper)}
        </Box>
      )
    })
)