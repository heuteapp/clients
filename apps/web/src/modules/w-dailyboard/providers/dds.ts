import { useDailyboardDataStore } from "@/src/heute-store/stores/board.store";
import { useState, useEffect, useCallback, useRef } from "react";
import { BoardCardColor } from "../../d-board/types/board.types";
import { isReadyIdle, workspaceDailyboardService } from "../state/workspace-dailyboard.machine";
import { BoardCardModel } from "../../d-board/types/board.model.types";
import { GridRect } from "../../d-core/types/common";
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard";

// Rastgele sayı üret (min-max arası)
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomSize = (maxCol: number, maxRow: number, score?: number) => {
  const s = Math.min(100, score || 0); // 0-100 arası
  
  // Score kadar yüzde ihtimalle büyük boyut, değilse küçük boyut
  const isBig = Math.random() * 100 < s;
  
  let colSpan, rowSpan;
  
  if (isBig) {
    // Yüksek score -> büyük kart (max'e yakın)
    colSpan = random(Math.floor(maxCol * 0.6), maxCol);
    rowSpan = random(Math.floor(maxRow * 0.7), maxRow);
  } else {
    // Düşük score -> küçük kart (min'e yakın)
    colSpan = random(4, Math.floor(maxCol * 0.4));
    rowSpan = random(3, Math.floor(maxRow * 0.5));
  }
  
  // Genişlik öncelikli
  if (colSpan < rowSpan) {
    [colSpan, rowSpan] = [rowSpan, colSpan];
  }
  
  return { colSpan, rowSpan };
};

// Fisher-Yates shuffle algoritması
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Belirli bir grid içinde boş pozisyon bul (1-based index, random sıralama ile)
const findEmptyPosition = (
  existingCards: BoardCardModel[],
  gridColCount: number,
  gridRowCount: number,
  colSpan: number,
  rowSpan: number,
  gridName: string
): GridRect | null => {
  // Kullanılan hücreleri matris olarak işaretle (0-based internal kullanım)
  const used = Array(gridRowCount).fill(null).map(() => Array(gridColCount).fill(false));
  
  existingCards.forEach(card => {
    if (card.placement?.gridName === gridName && card.placement?.position) {
      const { colIndex, rowIndex, colSpan: cardColSpan, rowSpan: cardRowSpan } = card.placement.position;
      // 1-based'den 0-based'e çevir
      const startCol = colIndex - 1;
      const startRow = rowIndex - 1;
      
      for (let r = startRow; r < startRow + cardRowSpan && r < gridRowCount; r++) {
        for (let c = startCol; c < startCol + cardColSpan && c < gridColCount; c++) {
          if (r >= 0 && c >= 0) used[r][c] = true;
        }
      }
    }
  });
  
  // Tüm olası pozisyonları topla
  const possiblePositions: Array<{ row: number; col: number }> = [];
  for (let row = 0; row <= gridRowCount - rowSpan; row++) {
    for (let col = 0; col <= gridColCount - colSpan; col++) {
      let available = true;
      for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + colSpan; c++) {
          if (used[r]?.[c]) {
            available = false;
            break;
          }
        }
        if (!available) break;
      }
      if (available) {
        possiblePositions.push({ row, col });
      }
    }
  }
  
  // Rastgele bir pozisyon seç
  if (possiblePositions.length === 0) return null;
  
  const randomPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
  
  // 1-based index'e çevirerek döndür
  return { 
    rowIndex: randomPosition.row + 1, 
    colIndex: randomPosition.col + 1, 
    rowSpan, 
    colSpan 
  };
};

export const useRandomCards = () => {
  const state = workspaceDailyboardService.getSnapshot();
  const { addCard, getMeDailyboard } = useDailyboardDataStore();
  const [placedCards, setPlacedCards] = useState<BoardCardModel[]>([]);
    const { categoryPath, date } = useWorkspaceDailyboard();
    const boardKey = `${categoryPath}@${date?.raw}`;

  // Grid tanımları (sabit)
  const grids = {
    'g@default/1/first': {
      id: 'g@default/1/first',
      name: 'first',
      colCount: 24,
      rowCount: 6,
      position: {
        colIndex: 1,
        rowIndex: 1,
        colSpan: 24,
        rowSpan: 6
      }
    },
    'g@default/1/second': {
      id: 'g@default/1/second',
      name: 'second',
      colCount: 24,
      rowCount: 6,
      position: {
        colIndex: 1,
        rowIndex: 7,
        colSpan: 24,
        rowSpan: 6
      }
    }
  };

    const addRandomCards = useCallback(async (count: number = 5) => {
    const availableGrids = Object.values(grids);
    const newCards: BoardCardModel[] = [];
    
    for (let i = 0; i < count; i++) {
        let cardAdded = false;
        let currentScore = random(0, 100); // Başlangıç skoru
        let attemptsForThisCard = 0;
        const maxAttemptsPerCard = 20;
        
        // Her kart için farklı grid'leri dene, skoru düşüre düşüre
        while (!cardAdded && attemptsForThisCard < maxAttemptsPerCard) {
        attemptsForThisCard++;
        
        // Grid'leri karıştır ki hep aynı grid'de deneme
        const shuffledGrids = shuffleArray(availableGrids);
        
        for (const grid of shuffledGrids) {
            const { colCount, rowCount, name: gridName } = grid;
            const { colSpan, rowSpan } = getRandomSize(colCount, rowCount, currentScore);
            
            // Store'dan güncel kartları al
            const currentBoard = getMeDailyboard(boardKey);
            const existingCards = currentBoard?.cards || [];
            
            const position = findEmptyPosition(
            existingCards,
            colCount,
            rowCount,
            colSpan,
            rowSpan,
            gridName
            );
            
            if (position) {
            const newCard: BoardCardModel = {
                name: `random_card_${Date.now()}_${i}_${Math.random()}`,
                content: {
                title: null,
                color: BoardCardColor.Default,
                frontFace: null,
                backFace: null,
                },
                placement: {
                gridName: gridName,
                position: position,
                },
            };
            
            addCard(boardKey, newCard);
            newCards.push(newCard);
            cardAdded = true;
            console.log(`Card ${i+1} placed with score ${currentScore}, size ${colSpan}x${rowSpan}`);
            break;
            }
        }
        
        // Bulamadıysa score'u düşür (küçült)
        if (!cardAdded) {
            currentScore = Math.max(0, currentScore - 25); // 25 puan düşür
            console.log(`Retrying card ${i+1} with lower score: ${currentScore}`);
        }
        }
        
        if (!cardAdded) {
        console.warn(`Could not place card ${i+1} even with minimum size`);
        }
    }
    
    if (newCards.length > 0) {
        setPlacedCards(prev => [...prev, ...newCards]);
    }
    
    console.log(`Successfully added ${newCards.length}/${count} cards`);
    }, [addCard, boardKey, getMeDailyboard]);

  useEffect(() => {
    const board = getMeDailyboard(boardKey);

    if(board?.cards.length == 0) {
        setPlacedCards([]);
        addRandomCards(5);
    }
  }, [state, boardKey]);

  return { 
    placedCards, 
    addRandomCards 
  };
};