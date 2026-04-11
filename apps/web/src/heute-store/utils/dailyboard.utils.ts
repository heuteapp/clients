import { produce } from 'immer';
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
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>, 
    owner: string, 
    dailyboard: TDailyboardSource
) => {
    const dailyboardId = `${owner}@${dailyboard.categoryPath}@${dailyboard.date.raw}`;

    state.byId[dailyboardId] = convertDailyboardSourceToItemContent(dailyboardId, dailyboard);

    dailyboard.cards.forEach((card) => {
        const cardId = `${dailyboardId}/${card.name}`;
        state.cardById[cardId] = convertDailyboardCardSourceToItemContent(cardId, card);
    });
};

export const getDailyboardItemFromState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>, 
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
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(  
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>,
    owner: string, 
    categoryPath: string, 
    date: YYMMDDDate
) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${categoryPath}@${date.raw}`));
    return key ? state.byId[key] as TDailyboardItemContent : null;
};

export const getDailyboardCardItemContentsFromState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>, 
    dailyboardId: string | null
) => {
    if (!dailyboardId) return [];
    return Object.values(state.cardById).filter(card => card.dailyboardId() === dailyboardId) as TDailyboardCardItemContent[];
};

//

// dailyboard.utils.ts - Eklenecek yardımcı fonksiyonlar

export const addCardToDailyboardState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>,
    categoryPath: string,
    date: YYMMDDDate,
    card: TDailyboardCardSource
): boolean => {
    const dailyboardContent = getDailyboardItemContentFromState(state, "me", categoryPath, date);
    if (!dailyboardContent) return false;

    const dailyboardId = dailyboardContent.id;
    const cardId = `${dailyboardId}/${card.name}`;
    
    if (state.cardById[cardId]) {
        console.warn(`Card already exists with name: ${card.name}`);
        return false;
    }

    state.cardById[cardId] = convertDailyboardCardSourceToItemContent<TDailyboardCardSource, TDailyboardCardItemContent>(cardId, card);
    
    return true;
};

export const updateCardInDailyboardState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent,
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>,
    categoryPath: string,
    date: YYMMDDDate,
    cardKey: string,
    cardUpdates: (draftCard: TDailyboardCardItemContent) => void
): DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent> => {
    
    return produce(state, (draft) => {
        const dailyboardContent = getDailyboardItemContentFromState(state, "me", categoryPath, date);
        if (!dailyboardContent) return;

        const dailyboardId = dailyboardContent.id;
        const cardId = `${dailyboardId}/${cardKey}`;
        
        const existingCard = draft.cardById[cardId];
        if (!existingCard) {
            console.warn(`Card not found with key: ${cardKey}`);
            return;
        }

        cardUpdates(existingCard as TDailyboardCardItemContent);
    });
};

export const removeCardFromDailyboardState = <
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>(
    state: DailyboardBaseState<TDailyboardSource, TDailyboardCardSource, TDailyboardItem, TDailyboardItemContent, TDailyboardCardItem, TDailyboardCardItemContent>,
    categoryPath: string,
    date: YYMMDDDate,
    cardName: string
): boolean => {
    const dailyboardContent = getDailyboardItemContentFromState(state, "me", categoryPath, date);
    if (!dailyboardContent) return false;

    const dailyboardId = dailyboardContent.id;
    const cardId = `${dailyboardId}/${cardName}`;
    
    if (!state.cardById[cardId]) {
        console.warn(`Card not found with name: ${cardName}`);
        return false;
    }

    delete state.cardById[cardId];
    
    return true;
};