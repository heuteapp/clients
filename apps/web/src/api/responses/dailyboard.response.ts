import { Dailyboard, DailyboardCard } from "@/src/modules/dailyboard/types/dailyboard.types";
import { DailyboardCardResponse, DailyboardResponse } from "../models/responses/dailyboard.response";
import { isoToYYMMDD } from "@/src/modules/shared/utils/date.utils";

export function responseToDailyboard(response: DailyboardResponse): Dailyboard {
    return {
        layoutName: response.layout.name,
        layoutVersion: response.layout.version,
        date: isoToYYMMDD(response.date)!,
        cards: response.cards.map(responseToDailyboardCard)
    };
}

function responseToDailyboardCard(cardResponse: DailyboardCardResponse): DailyboardCard {
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