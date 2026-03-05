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
      <HeuteLayout columnCount={18} rowCount={8} sections={sectionExamples.four} />
    </div>
  )
}

const sectionExamples = { 
  two:[
    {
      colIndex: 1,
      rowIndex: 1,
      colSpan: 18,
      rowSpan: 4
    },
    {
      colIndex: 1,
      rowIndex: 5,
      colSpan: 18,
      rowSpan: 4
    }
  ],
  three:[
    {
      colIndex: 1,
      rowIndex: 1,
      colSpan: 12,
      rowSpan: 4
    }, {
      colIndex: 1,
      rowIndex: 5,
      colSpan: 12,
      rowSpan: 4
    }, {
      colIndex: 13,
      rowIndex: 1,
      colSpan: 6,
      rowSpan: 8
    }
  ],
  four:[
    {
      colIndex: 1,
      rowIndex: 1,
      colSpan: 9,
      rowSpan: 4
    },
    {
      colIndex: 10,
      rowIndex: 1,
      colSpan: 9,
      rowSpan: 4
    },
    {
      colIndex: 1,
      rowIndex: 5,
      colSpan: 9,
      rowSpan: 4
    },
    {
      colIndex: 10,
      rowIndex: 5,
      colSpan: 9,
      rowSpan: 4
    }
  ]
}