"use client"

//

interface HeuteBoardProps {
  category: string;
  date: Date;
}

export default function HeuteBoard({ category, date }: HeuteBoardProps) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Board: {category}</h1>
      <p>Date: {date.toISOString().split("T")[0]}</p>
    </div>
  )
}