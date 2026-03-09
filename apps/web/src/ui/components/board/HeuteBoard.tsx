"use client"

import style from "../board.module.css"

import HeuteLayout from "@/src/ui/components/layout/HeuteLayout";
import BoardCardContainer from "./BoardCardContainer";
import { useRef } from "react";
import { BoardData } from "../../../core/domain/board/board.types";
import { useBoardContext } from "../../../core/domain/board/board.hooks";
import BoardGhostCard from "./BoardGhostCard";
import { useBoardStore } from "@/src/core/stores/board.store";

//

export default function HeuteBoard(props: HeuteBoardProps) {
  const context = useBoardContext();
  const boardRef = useRef<HTMLDivElement>(null);

  const layout = useBoardStore(state => state.layout);
  const cards = useBoardStore(state => state.cards);

  if(!layout) return null;
  if(!cards) return null;

  const { session } = context!;
  
  return (
    <div ref={boardRef} className={style.board}>
      <HeuteLayout {...layout} />
      <BoardCardContainer cards={cards} />
      <BoardGhostCard />
    </div>
  )
}

interface HeuteBoardProps extends BoardData {

}