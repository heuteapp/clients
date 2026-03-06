"use client"

import style from "@/src/styles/domain/HeuteBoard.module.css"
import HeuteLayout from "@/src/components/domain/HeuteLayout";
import { sectionExamples } from "@/src/data/sectionExamples";

//

interface HeuteBoardProps {
  category: string;
  date: Date;
}

export default function HeuteBoard({ category, date }: HeuteBoardProps) {
  return (
    <div className={style.board}>
      <HeuteLayout columnCount={18} rowCount={8} sections={(sectionExamples as any)[category] ?? sectionExamples.two} />
    </div>
  )
}

