import { DailyboardModel, DailyboardCardModel } from "@/src/modules/d-board/types/board.model.types";
import { DailyboardCardResponse, DailyboardResponse } from "../models/responses/dailyboard.response";
import { isoToYYMMDD } from "@/src/modules/d-shared/utils/date.utils";

export function responseToDailyboard(response: DailyboardResponse): DailyboardModel {
    return {        
        categoryPath: response.categoryPath,
        date: isoToYYMMDD(response.date)!,
        canvasName: response.layout.name,
        canvasVersion: response.layout.version,
        cards: response.cards.map(responseToDailyboardCard)
    };
}

function responseToDailyboardCard(cardResponse: DailyboardCardResponse): DailyboardCardModel {
    return {
        name: cardResponse.name,
        content: {
            title: cardResponse.title ?? null,
        },
        placement: 
            cardResponse.gridName && 
            cardResponse.colIndex &&
            cardResponse.rowIndex &&
            cardResponse.colSpan &&
            cardResponse.rowSpan ? {
                gridName: cardResponse.gridName,
                position: {
                    colIndex: cardResponse.colIndex,
                    rowIndex: cardResponse.rowIndex,
                    colSpan: cardResponse.colSpan,
                    rowSpan: cardResponse.rowSpan
                }
            } : null
    };
}