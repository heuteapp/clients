"use client"

import style from "../board.module.css"

import HeuteLayout from "@/src/domain/layout/components/HeuteLayout";
import BoardCardContainer from "./BoardCardContainer";
import { useRef } from "react";
import { BoardData } from "../board.types";
import { useBoardContext } from "../board.hooks";
import BoardGhostCard from "./BoardGhostCard";
import { useLayoutStore } from "../../layout/layout.store";
import { useBoardStore } from "../board.store";

//

export default function HeuteBoard(props: HeuteBoardProps) {
  const context = useBoardContext();
  const boardRef = useRef<HTMLDivElement>(null);

  const layout = useLayoutStore(state => state.layout);
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