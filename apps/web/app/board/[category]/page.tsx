"use client"

import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";

import HeuteBoard from "@/src/domain/board/components/HeuteBoard"

//

export default function BoardTodayPage(){
    const params = useParams<BoardTodayPageParams>();
    const date = new Date();

    return (
        <>
            <HeuteBoard category={params.category} date={date} />
        </>
    )
}

interface BoardTodayPageParams extends Params {
    category: string;
}