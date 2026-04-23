import { DailyboardData, DailyboardCardData } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { DailyboardCardResponse, DailyboardResponse } from "../models/responses/dailyboard.response";
import { isoToYYMMDD } from "@/src/modules/shared/utils/date.utils";

export function responseToDailyboard(response: DailyboardResponse): DailyboardData {
    return {        
        categoryPath: response.categoryPath,
        date: isoToYYMMDD(response.date)!,
        canvasName: response.layout.name,
        canvasVersion: response.layout.version,
        cards: response.cards.map(responseToDailyboardCard)
    };
}

function responseToDailyboardCard(cardResponse: DailyboardCardResponse): DailyboardCardData {
    return {
        name: cardResponse.name,
        content: {
            title: cardResponse.title ?? null,
        },
        placement: 
            cardResponse.sectionName && 
            cardResponse.colIndex &&
            cardResponse.rowIndex &&
            cardResponse.colSpan &&
            cardResponse.rowSpan ? {
                sectionName: cardResponse.sectionName,
                position: {
                    colIndex: cardResponse.colIndex,
                    rowIndex: cardResponse.rowIndex,
                    colSpan: cardResponse.colSpan,
                    rowSpan: cardResponse.rowSpan
                }
            } : null
    };
}