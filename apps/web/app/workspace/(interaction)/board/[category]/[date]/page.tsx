"use client"

import { Params } from "next/dist/server/request/params";
import { useParams, redirect } from "next/navigation"

import { parseYYMMDD } from "@/src/core/utils/shared/parseYYMMDD";
import Board from "@/src/ui/components/workspace/BoardView";

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
            <Board category={params.category} date={finalDate} />
        </>
    )
}

interface BoardPageParams extends Params {
    category: string;
    date?: string;
}