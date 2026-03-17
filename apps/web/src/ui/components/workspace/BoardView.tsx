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
                    board: null,
                    cards: [],
                    layout: null,
                    sections: []
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