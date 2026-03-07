"use client"

import style from "../board.module.css"

import HeuteLayout from "@/src/domain/layout/components/HeuteLayout";
import BoardCardContainer from "./BoardCardContainer";
import { useRef } from "react";
import { BoardData } from "../board.types";
import { useBoardContext } from "../board.hooks";
import BoardGhostCard from "./BoardGhostCard";

//

export default function HeuteBoard({ layout }: HeuteBoardProps) {
  const context = useBoardContext();
  const boardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={boardRef} className={style.board}>
      <HeuteLayout {...layout} />
      <BoardCardContainer />
      { context.interaction.eventType === "create" && <BoardGhostCard /> }
    </div>
  )
}

interface HeuteBoardProps extends BoardData {

}