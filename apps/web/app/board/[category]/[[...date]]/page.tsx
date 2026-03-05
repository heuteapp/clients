"use client"
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation"

export default async function BoardPage() {
    const params = useParams<BoardPageParams>();

    let finalDate = params.date || getTodayISO();

    return (
        <div style={{ padding: 24 }}>
        <h1>Board: {params.category}</h1>
        <p>Date: {finalDate}</p>
        </div>
    )
}

interface BoardPageParams extends Params {
    category: string;
    date?: string;
}

function getTodayISO() {
  return new Date().toISOString().split("T")[0]
}