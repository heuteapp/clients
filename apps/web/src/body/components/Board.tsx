"use client";
import HeuteBoard from '@/src/domain/board/components/HeuteBoard';
import style from '../body.module.css';
import { useBoardStore } from '@/src/domain/board/board.store';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const board = useBoardStore(state => state.board)

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