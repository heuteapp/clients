"use client"

import style from "../board.module.css"

import HeuteLayout from "@/src/domain/layout/components/HeuteLayout";
import { useLayoutRegistry } from "@/src/domain/layout/layout.hooks";
import BoardCardContainer from "./BoardCardContainer";
import { useMemo, useRef } from "react";
import { BoardData } from "../board.types";
import { useBoardInteraction } from "../board.hooks";

//

interface HeuteBoardProps extends BoardData {

}

export default function HeuteBoard({ category, date, layout }: HeuteBoardProps) {

  const rootRef = useRef<HTMLDivElement>(null);

  const layoutRegistry = useLayoutRegistry();
  const session = useMemo(() => ({
    cardResize: null,
    cardMove: null,
    pointer: null
  }), [])
  const interaction = useBoardInteraction({ session });

  const contextValue = useMemo(
    () => ({
      rootRef,
      layoutRegistry,
    }),
    [layoutRegistry]
  );
  
  return (
    <div ref={rootRef} className={style.board}>
      <HeuteLayout {...layout} registry={layoutRegistry} />
      <BoardCardContainer />
    </div>
  )
}

