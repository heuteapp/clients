"use client"

import { Params } from "next/dist/server/request/params";
import { useParams, redirect } from "next/navigation"

import HeuteBoard from "@/src/domain/board/components/HeuteBoard";
import { parseYYMMDD } from "@/src/domain/board/board.utils";

//

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
        <>
            <HeuteBoard category={params.category} date={finalDate} />
        </>
    )
}

interface BoardPageParams extends Params {
    category: string;
    date?: string;
}