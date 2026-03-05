"use client"

function HeuteBoard({ category, date }: HeuteBoardProps) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Board: {category}</h1>
      <p>Date: {date.toISOString().split("T")[0]}</p>
    </div>
  )
}

export default HeuteBoard

interface HeuteBoardProps {
  category: string;
  date: Date;
}