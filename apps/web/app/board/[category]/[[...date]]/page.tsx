import { notFound } from "next/navigation"

type Props = {
  params: {
    category: string
    date?: string[]
  }
}

function getTodayISO() {
  return new Date().toISOString().split("T")[0]
}

function isValidDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

export default async function BoardPage({ params }: Props) {
  const { category, date } = params

  const finalDate =
    !date || date.length === 0
      ? getTodayISO()
      : date[0] === "today"
      ? getTodayISO()
      : date[0]

  if (!isValidDate(finalDate)) {
    return notFound()
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Board: {category}</h1>
      <p>Date: {finalDate}</p>
    </div>
  )
}