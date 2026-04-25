"use client"

import "@/src/modules/ux-board/styles/board.css";

import React from "react";
import style from "@/src/modules/ux-board/styles/board.module.scss"

import { BoardRootProps } from "../types/board.props";
import { CanvasRoot } from "@/src/modules/ux-canvas/components/CanvasRoot";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { BoardCardContainer } from "./BoardCardContainer";

//

export function BoardRoot({ rootRef, src, canvasSrc }: BoardRootProps) {
  const initialRef = React.useRef<HTMLDivElement | null>(null);
  const ref = rootRef || initialRef;

  return (
    <TracedUniqueItem
      type="board-root"
      data={src}
      ref={ref}
    >
      <div 
        ref={ref} 
        className={style.board}
      >
        <CanvasRoot data={canvasSrc} />
        <BoardCardContainer src={src.cards} />
      </div>
    </TracedUniqueItem>
  )
}