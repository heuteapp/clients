"use client";
import HeuteBoard from '@/src/domain/board/components/HeuteBoard';
import style from '../body.module.css';
import { useBoardStore } from '@/src/domain/board/board.store';
import { sectionExamples } from '@/src/domain/board/board.examples';
import { useEffect } from 'react';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const board = useBoardStore(state => state.board);
    const setBoard = useBoardStore(state => state.setBoard)

    useEffect(() => {
        setBoard(() => {
            return {
            id: "board-1",
            category,
            date,
            layout: {                
                columnCount: 18,
                rowCount: 8,
                sections: (sectionExamples as any)[category] ?? sectionExamples.two,
            },
            cards: [{
                id: "card-1",
                sectionId: "0-0",
                rowIndex: 0,
                colIndex: 0,
                rowSpan: 2,
                colSpan: 3
            }]
        };
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