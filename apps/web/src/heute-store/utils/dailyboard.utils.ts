import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { DailyboardBaseSource, DailyboardBaseState, DailyboardCardBaseSource, StoredDailyboardItem, StoredDailyboardItemContent, StoredDailyboardCardItem, StoredDailyboardCardItemContent } from "../types/dailyboard.types";

export const convertDailyboardSourceToItemContent = <
    TSource extends DailyboardBaseSource, 
    TItemContent extends StoredDailyboardItemContent
> (id: string, source: TSource) : TItemContent => {
    const { cards, ...rest } = source;

    return {
        id,
        ...rest,
    } as unknown as TItemContent;
}

export const convertDailyboardCardSourceToItemContent = <
    TSource extends DailyboardCardBaseSource,
    TItemContent extends StoredDailyboardCardItemContent
> (id: string, source: TSource) : TItemContent => {

    return {
        id,
        dailyboardId: () => id.split("/").slice(0, -1).join("/"),
        ...source,
    } as unknown as TItemContent;
}

//

export const saveDailyboardToState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>, 
    owner: string, 
    dailyboard: TDailyboardSource
) => {
    const dailyboardId = `${owner}@${dailyboard.categoryPath}@${dailyboard.date}`;

    state.byId[dailyboardId] = convertDailyboardSourceToItemContent(dailyboardId, dailyboard);

    dailyboard.cards.forEach((card) => {
        const cardId = `${dailyboardId}/${card.name}`;
        state.cardById[cardId] = convertDailyboardCardSourceToItemContent(cardId, card);
    });
};

export const getDailyboardItemFromState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>, 
    owner: string, 
    categoryPath: string, 
    date: YYMMDDDate
): TDailyboardItem | null => {
    const content = getDailyboardItemContentFromState(state, owner, categoryPath, date);
    if (!content) return null;
    
    const cards = getDailyboardCardItemContentsFromState(state, content.id);
    
    return {
        ...content,
        cards,
    } as unknown as TDailyboardItem;
};

export const getDailyboardItemContentFromState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(  
    state: DailyboardBaseState<TDailyboardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>,
    owner: string, 
    categoryPath: string, 
    date: YYMMDDDate
) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${categoryPath}@${date}`));
    return key ? state.byId[key] as TDailyboardItemContent : null;
};

export const getDailyboardCardItemContentsFromState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>, 
    dailyboardId: string | null
) => {
    if (!dailyboardId) return [];
    return Object.values(state.cardById).filter(card => card.dailyboardId() === dailyboardId) as TDailyboardCardItemContent[];
};