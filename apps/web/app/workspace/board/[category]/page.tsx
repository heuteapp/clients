"use client"

import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";

import Board from "@/src/ui/components/(home)/Board";

//

export default function BoardTodayPage(){
    const params = useParams<BoardTodayPageParams>();
    const date = new Date();

    return (
        <>
            <Board category={params.category} date={date} />
        </>
    )
}

interface BoardTodayPageParams extends Params {
    category: string;
}