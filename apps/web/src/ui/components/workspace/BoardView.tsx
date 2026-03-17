"use client";
import { BoardRoot } from '@/src/ui/components/workspace/board/BoardRoot';
import { useBoardContentStore } from "@/src/stores/board.content.store";
import { useBoardThemeStore } from '@/src/stores/board.theme.store';
import { useEffect } from 'react';
import { createDataIdentifier } from '@/src/core/utils/shared/data';
import { server } from '@/src/api/server';

interface BoardProps {
    category: string;
    date: Date;
}

function Board({ category, date }: BoardProps) {
    const board = useBoardContentStore(state => state.board);
    const setState = useBoardContentStore(state => state.setState);

    const setThemeState = useBoardThemeStore(state => state.setState);
    
    useEffect(() => {
        const fetchBoard = async () => {
            try {   
                const response = await server.workspace.board.getBoard(category , /*date*/);
                
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

                setThemeState({
                    board: null,
                    cards: [],
                    layout: null,
                    sections: [{
                        name: "first",
                        box: {
                            margin: {
                                left: 100,
                                top: 20,
                                right: 0,
                                bottom: 20,
                            },                                
                        }
                    },
                    {
                        name: "second",
                        box: {
                            margin: {
                                left: 0,
                                top: 20,
                                right: 100,
                                bottom: 20,
                            },
                        }
                    },]
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
            <BoardRoot 
                {...board}
            />
        </>
    )
}

export default Board