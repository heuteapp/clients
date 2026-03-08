"use client";
import HeuteBoard from '@/src/domain/board/components/HeuteBoard';
import style from '../body.module.css';
import { sectionExamples } from '@/src/domain/board/board.examples';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
  return (
    <>
        <HeuteBoard 
            id="test"
            category={category} 
            date={date} 
            layout={{ 
                columnCount: 18, 
                rowCount: 8, 
                sections: (sectionExamples as any)[category] ?? sectionExamples.two
            }} 
            cards={[]}
        />
    </>
  )
}

export default Board