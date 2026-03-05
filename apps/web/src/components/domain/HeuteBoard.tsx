"use client"

import style from "@/src/styles/domain/HeuteBoard.module.css"
import HeuteLayout from "@/src/components/domain/HeuteLayout";

//

interface HeuteBoardProps {
  category: string;
  date: Date;
}

export default function HeuteBoard({ category, date }: HeuteBoardProps) {
  return (
    <div className={style.board}>
      <HeuteLayout />
    </div>
  )
}