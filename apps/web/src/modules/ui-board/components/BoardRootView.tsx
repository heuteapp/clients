import style from "@/src/modules/ux-board/styles/board.module.scss"

import { boardRootView } from "../utils/view.utils";
import { BoardCardContainerView } from "./BoardCardContainerView";
import { Box } from "@mui/material";
import { CanvasRootView } from "../../ui-canvas/components/CanvasRootView";

export const BoardRootView = boardRootView(({ ref, state, impl }) => (
  <Box 
    ref={ref} 
    className={impl.className(style.root)}
    style={impl.style()}
  >
    {impl.render(() => (
      <>
        <CanvasRootView 
          state={{ ...state.canvas }}
          provider={{ metrics: { type: "static", value: null! } }}
        />
        <BoardCardContainerView
          state={{ ...state.container }}
        />
      </>
    ))}
  </Box>
));