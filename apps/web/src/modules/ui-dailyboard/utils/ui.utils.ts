import { StoredDailyboardData } from "@/src/heute-store/types/dailyboard.types";

export const getDailyboardDataSet = (dailyboard: StoredDailyboardData) => {
    return {
        "data-dailyboard": true,
        "data-id": dailyboard.id,
        "data-layout-name": dailyboard.layoutName,
        "data-layout-version": dailyboard.layoutVersion,
        "data-date": dailyboard.date,
    }
}