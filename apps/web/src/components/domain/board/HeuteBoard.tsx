"use client"

import style from "@/src/styles/domain/board/HeuteBoard.module.css"

//

interface HeuteBoardProps {
  category: string;
  date: Date;
}

export default function HeuteBoard({ category, date }: HeuteBoardProps) {
  return (
    <div className={style.board}>
      <h1>Board: {category}</h1>
      <p>Date: {date.toISOString().split("T")[0]}</p>
    </div>
  )
}