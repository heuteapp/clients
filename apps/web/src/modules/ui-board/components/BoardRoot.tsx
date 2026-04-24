"use client"

import "@/src/modules/ui-board/styles/board.css";
import style from "@/src/modules/ui-board/styles/board.module.scss"

import BoardCardContainer from "./BoardCardContainer";

import { BoardRootProps } from "../types/board.props";
import { CanvasRoot } from "@/src/modules/ui-canvas/components/CanvasRoot";
import { useCanvasContext } from "../../ui-canvas/hooks/useCanvasContext";
import { TracedUniqueItem } from "../../t-shared/components/TracedUniqueItem";
import { useBoardContext } from "../hooks/useBoardContext";

//

export function BoardRoot({ data }: BoardRootProps) {
  const { rootRef } = useBoardContext();
  const cards = data.cards;

  const { dataSource: canvasData } = useCanvasContext();
  
  if(!cards) return null;
  if(!canvasData) return null;

  return (
    <TracedUniqueItem
      type="board-root"
      data={data}
      ref={rootRef}
    >
      <div 
        ref={rootRef} 
        className={style.board}
      >
        <CanvasRoot data={canvasData} />
        <BoardCardContainer cards={cards} />
      </div>
    </TracedUniqueItem>
  )
}