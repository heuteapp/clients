"use client"
import HeuteBoard from "@/src/components/domain/board/HeuteBoard";
import { Params } from "next/dist/server/request/params";
import { useParams, redirect } from "next/navigation"

export default function BoardPage() {
    const params = useParams<BoardPageParams>();

    var finalDate: Date;

    if(params.date) {
        const parsedDate = parseYYMMDD(params.date);

        if (!parsedDate) {
          redirect("/board/" + params.category);
        }

        finalDate = parsedDate;
    }
    else {
        finalDate = new Date();
    }

    return (
        <div style={{ padding: 24 }}>
            <HeuteBoard category={params.category} date={finalDate} />
        </div>
    )
}

interface BoardPageParams extends Params {
    category: string;
    date?: string;
}

function parseYYMMDD(date: string): Date | null {
  if (!/^\d{6}$/.test(date)) return null

  const year = 2000 + Number(date.slice(0, 2))
  const month = Number(date.slice(2, 4))
  const day = Number(date.slice(4, 6))

  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null

  return new Date(Date.UTC(year, month - 1, day))
}