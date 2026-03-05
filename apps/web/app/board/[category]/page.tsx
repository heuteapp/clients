"use client"
import HeuteBoard from "@/src/components/domain/board/HeuteBoard"
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";

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