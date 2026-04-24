"use client"

import "@/src/modules/ui-board/styles/board.css";
import style from "@/src/modules/ui-board/styles/board.module.scss"
import { useLayoutEffect } from "react";

import BoardCardContainer from "./BoardCardContainer";

import { useBoardContext } from "../hooks/useBoardContext";
import { BoardRootProps } from "../types/board.props";
import { CanvasRoot } from "@/src/modules/ui-canvas/components/CanvasRoot";
import { useCanvasContext } from "../../ui-canvas/hooks/useCanvasContext";
import { getBoardDataSet } from "../utils/ui.utils";

//

export function BoardRoot(props: BoardRootProps) {
  const { registry } = useBoardContext();

  const { data: boardData } = props;
  const boardRef = registry.board.ref;
  const boardCards = boardData.cards;

  const { dataSource: canvasData } = useCanvasContext();

  useLayoutEffect(() => {
    registry.registerBoard(boardRef, props)

    return () => {
      registry.unregisterBoard()
    }
  }, [registry])
  
  if(!boardCards) return null;
  if(!canvasData) return null;

  return (
    <div 
      ref={boardRef} 
      className={style.board}
      {...getBoardDataSet(boardData)}
    >
      <CanvasRoot data={canvasData} />
      <BoardCardContainer cards={boardCards} />
    </div>
  )
}