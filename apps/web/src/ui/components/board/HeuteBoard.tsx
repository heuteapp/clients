"use client"

import style from "@/src/ui/styles/board.module.css"

import HeuteLayout from "@/src/ui/components/layout/HeuteLayout";
import BoardCardContainer from "./BoardCardContainer";
import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "../../hooks/board.hooks";
import BoardGhostCard from "./BoardGhostCard";
import { useBoardStore } from "@/src/stores/board";
import { HeuteBoardProps } from "@/src/ui/types/board/board.props";

//

export default function HeuteBoard(props: HeuteBoardProps) {
  const { registry } = useBoardContext();
  const boardRef = useRef<HTMLDivElement>(null);

  const layout = useBoardStore(state => state.layout);
  const cards = useBoardStore(state => state.cards);

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
      <HeuteLayout {...layout} />
      <BoardCardContainer cards={cards} />
      <BoardGhostCard />
    </div>
  )
}