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
            layout: null,
            sections: (sectionExamples as any)[category ?? "two"] ?? sectionExamples.two
        });
    }, [])

    if(!board) return null;

    return (
        <>
            <HeuteBoard 
                {...board}
            />
        </>
    )
}

export default Board