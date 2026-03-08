"use client";
import HeuteBoard from '@/src/domain/board/components/HeuteBoard';
import style from '../body.module.css';
import { sectionExamples } from '@/src/domain/board/board.examples';
import { useBoardContext } from '@/src/domain/board/board.hooks';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const context = useBoardContext();

    const board = context.board;

    return (
        <>
            <HeuteBoard 
                {...board}
            />
        </>
    )
}

export default Board