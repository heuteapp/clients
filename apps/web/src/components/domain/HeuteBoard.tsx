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
      <HeuteLayout columns={18} rows={8} sections={[{
        colIndex: 1,
        rowIndex: 1,
        colSpan: 18,
        rowSpan: 4
      }, {
        colIndex: 1,
        rowIndex: 5,
        colSpan: 18,
        rowSpan: 4
      }]} />
    </div>
  )
}