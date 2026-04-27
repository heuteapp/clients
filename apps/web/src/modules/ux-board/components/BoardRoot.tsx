"use client"

import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { useRef } from "react";
import { BoardRootProps } from "../types/board.props";
import { BoardCardContainer } from "./BoardCardContainer";
import { BoardRootView } from "../../ui-board/components/BoardRootView";
import { CanvasRoot } from "../../ux-canvas/components/CanvasRoot";

export function BoardRoot({ rootRef, canvasRef, canvasSrc, src, slot }: BoardRootProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = rootRef || internalRef;

  return (
    <TracedUniqueItem
      type="board-root"
      data={src}
      ref={ref}
    >
      <BoardRootView 
        ref={ref}
        state={{
          board: src
        }}
        slot={{
          ...slot,
          render: {
            "&": (state) => (
                  <>
                    <CanvasRoot rootRef={canvasRef} src={canvasSrc} />
                    <BoardCardContainer src={state.board.cards}/>
                  </>
              )
          }
        }}
      />
    </TracedUniqueItem>
  )
}