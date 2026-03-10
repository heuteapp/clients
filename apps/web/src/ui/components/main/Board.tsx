"use client";
import HeuteBoard from '@/src/ui/components/board/HeuteBoard';
import { useBoardStore } from "@/src/stores/board.store";
import { sectionExamples } from '@/src/dump/board.examples';
import { useEffect } from 'react';
import { createClientId } from '@/src/core/utils/shared/identifiers';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const board = useBoardStore(state => state.board);
    const setBoard = useBoardStore(state => state.setBoard)
    const setLayout = useBoardStore(state => state.setLayout);
    const setSections = useBoardStore(state => state.setSections);

    useEffect(() => {
        setBoard(() => {
            return {
                id: createClientId(),
                category,
                date,
                layoutId: category,
            };
        });

        setLayout(() => {
            return {
                id: createClientId(),
                columnCount: 18,
                rowCount: 8
            }
        });

        setSections((sectionExamples as any)[category ?? "two"] ?? sectionExamples.two);
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