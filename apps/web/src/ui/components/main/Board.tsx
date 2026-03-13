"use client";
import HeuteBoard from '@/src/ui/components/board/HeuteBoard';
import { useBoardStore } from "@/src/stores/board.store";
import { useEffect } from 'react';
import { createDataIdentifier } from '@/src/core/utils/shared/data';
import { server } from '@/src/api/client';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const board = useBoardStore(state => state.board);
    const setState = useBoardStore(state => state.setState);
    
    useEffect(() => {
        const fetchBoard = async () => {
            try {   
                const response = await server.workspace.board.getBoard(category , /*date*/);

                console.log("Board data received:", response.data);
                
                setState({
                    board: {
                        id: createDataIdentifier(),
                        layoutName: response.data.layout.name,
                        layoutVersion: response.data.layout.version,
                        category: "mihr",
                        date: new Date(response.data.date),
                    },
                    cards: response.data.cards.map(card => ({
                        id: createDataIdentifier(),
                        name: card.name,
                        content: {
                            title: card.title,
                        },
                        placement: card.sectionName && card.rowIndex !== null && card.colIndex !== null && card.rowSpan !== null && card.colSpan !== null ? {
                            sectionName: card.sectionName,
                            position: {               
                                rowIndex: card.rowIndex,
                                colIndex: card.colIndex,
                                rowSpan: card.rowSpan,
                                colSpan: card.colSpan,
                            }
                        } : null,
                    })),
                    layout: {
                        id: createDataIdentifier(),
                        columnCount: response.data.layout.colCount,
                        rowCount: response.data.layout.rowCount,
                    },
                    sections: response.data.layout.sections.map(section => ({
                        id: createDataIdentifier(),
                        name: section.name,
                        position: {
                            colIndex: section.colIndex,
                            rowIndex: section.rowIndex,
                            colSpan: section.colSpan,
                            rowSpan: section.rowSpan,
                        }
                    }))
                });

            } catch (err) {
                console.error("Board yüklenemedi:", err);
            }
        };

        fetchBoard();
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