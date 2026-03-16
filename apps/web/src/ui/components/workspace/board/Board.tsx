"use client"

import style from "@/src/ui/styles/board.module.css"

import BoardLayout from "@/src/ui/components/workspace/board/BoardLayout";
import BoardCardContainer from "./BoardCardContainer";
import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "@/src/ui/hooks/board/useBoardContext";
import BoardGhostCard from "./BoardGhostCard";
import { useBoardContentStore } from "@/src/stores/board.content.store";
import { BoardRootProps } from "@/src/ui/types/board/board.props";

//

export default function Board(props: BoardRootProps) {
  const { registry } = useBoardContext();
  const boardRef = useRef<HTMLDivElement>(null);

  const layout = useBoardContentStore(state => state.layout);
  const cards = useBoardContentStore(state => state.cards);

  useLayoutEffect(() => {
    registry.registerBoard(boardRef, props)

    return () => {
      registry.unregisterBoard()
    }
  }, [registry])
  
  if(!layout) return null;
  if(!cards) return null;

  return (
    <div ref={boardRef} className={style.board}>
      <BoardLayout {...layout} />
      <BoardCardContainer cards={cards} />
      <BoardGhostCard />
    </div>
  )
}