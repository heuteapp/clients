"use client"

import "@/src/modules/ui-board/styles/board.css";
import style from "@/src/modules/ui-board/styles/board.module.scss"
import { useLayoutEffect } from "react";

import BoardCardContainer from "./BoardCardContainer";

import { useBoardContext } from "../hooks/useBoardContext";
import { BoardRootProps } from "../types/board.props";
import { CanvasRoot } from "@/src/modules/ui-canvas/components/CanvasRoot";
import { useCanvasContext } from "../../ui-canvas/hooks/useCanvasContext";
import { TracedUniqueItem } from "../../t-shared/components/TracedUniqueItem";

//

export function BoardRoot(props: BoardRootProps) {
  const { registry } = useBoardContext();

  const data = props.data;
  const ref = registry.board.ref;
  const cards = data.cards;

  const { dataSource: canvasData } = useCanvasContext();

  useLayoutEffect(() => {
    registry.registerBoard(ref, props)

    return () => {
      registry.unregisterBoard()
    }
  }, [registry])
  
  if(!cards) return null;
  if(!canvasData) return null;

  return (
    <TracedUniqueItem
      type="board-root"
      data={data}
      ref={ref}
    >
      <div 
        ref={ref} 
        className={style.board}
      >
        <CanvasRoot data={canvasData} />
        <BoardCardContainer cards={cards} />
      </div>
    </TracedUniqueItem>
  )
}