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

  const { session } = context!;
  const size = session.cardCreate?.startSize;
  
  return (
    <div ref={boardRef} className={style.board}>
      <HeuteLayout {...layout} />
      <BoardCardContainer />
      { context.interaction.eventType === "create" &&
       <BoardGhostCard rect={{ rowIndex: 0, colIndex: 0, rowSpan: size!.rowSpan, colSpan: size!.colSpan }} /> }
    </div>
  )
}

interface HeuteBoardProps extends BoardData {

}