"use client"

import style from "@/src/ui/styles/board.module.css"
import { useLayoutEffect, useRef } from "react";

import BoardCardContainer from "./BoardCardContainer";
import BoardGhostCard from "./BoardGhostCard";

import { useBoardContext } from "../hooks/useBoardContext";
import { BoardRootProps } from "../types/board.props";
import { LayoutRoot } from "@/src/ui-layout/components/LayoutRoot";

//

export function BoardRoot(props: BoardRootProps) {
  const { registry } = useBoardContext();
  const boardRef = useRef<HTMLDivElement>(null);

  // !! FIX HERE !!
  const layout = null! as any;
  const cards = [] as any[];

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
      <LayoutRoot {...layout} />
      <BoardCardContainer cards={cards} />
      <BoardGhostCard />
    </div>
  )
}