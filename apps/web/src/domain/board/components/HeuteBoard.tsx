"use client"

import style from "../board.module.css"

import HeuteLayout from "@/src/domain/layout/components/HeuteLayout";
import { sectionExamples } from "../board.examples";
import { useLayoutRegistry } from "@/src/domain/layout/layout.hooks";

//

interface HeuteBoardProps {
  category: string;
  date: Date;
}

export default function HeuteBoard({ category, date }: HeuteBoardProps) {

  const layoutRegistry = useLayoutRegistry()
  
  return (
    <div className={style.board}>
      <HeuteLayout columnCount={18} rowCount={8} sections={(sectionExamples as any)[category] ?? sectionExamples.two} registry={layoutRegistry} />
    </div>
  )
}

