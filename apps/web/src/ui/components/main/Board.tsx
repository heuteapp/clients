"use client";
import HeuteBoard from '@/src/ui/components/board/HeuteBoard';
import { useBoardStore } from "@/src/stores/board.store";
import { sectionExamples } from '@/src/dump/board.examples';
import { useEffect } from 'react';
import { createDataIdentifier } from '@/src/core/utils/shared/data';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const board = useBoardStore(state => state.board);
    const setState = useBoardStore(state => state.setState);

    useEffect(() => {
        setState({
            board: {
                id: createDataIdentifier(),
                category,
                date,
                layoutId: "",
            },
            cards: [],
            layout: {
                id: createDataIdentifier(),
                columnCount: 18,
                rowCount: 8
            },
            sections: (sectionExamples as any)[category ?? "two"] ?? sectionExamples.two
        });
    }, [])

    console.log(board);

    if(!board) return null;

    console.log("hiha");

    return (
        <>
            <HeuteBoard 
                {...board}
            />
        </>
    )
}

export default Board