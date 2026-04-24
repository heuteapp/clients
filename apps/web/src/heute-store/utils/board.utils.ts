import { produce } from 'immer';
import { YYMMDDDate } from "@/src/modules/d-shared/types/date.types";
import { BoardBaseSource, BoardBaseState, BoardCardBaseSource, StoredBoardItem, StoredBoardItemData, StoredBoardCardItem, StoredBoardCardItemData } from "../types/board.types";

export const convertBoardSourceToItemContent = <
    TSource extends BoardBaseSource, 
    TItemContent extends StoredBoardItemData
> (id: string, source: TSource) : TItemContent => {
    const { cards, ...rest } = source;

    return {
        id,
        ...rest,
    } as unknown as TItemContent;
}

export const convertBoardCardSourceToItemContent = <
    TSource extends BoardCardBaseSource,
    TItemContent extends StoredBoardCardItemData
> (id: string, source: TSource) : TItemContent => {

    return {
        id,
        dailyboardId: () => id.split("/").slice(0, -1).join("/"),
        ...source,
    } as unknown as TItemContent;
}

//

export const saveDailyboardToState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>, 
    owner: string, 
    dailyboard: TBoardSource
) => {
    const dailyboardId = `${owner}@${dailyboard.categoryPath}@${dailyboard.date.raw}`;

    state.byId[dailyboardId] = convertBoardSourceToItemContent(dailyboardId, dailyboard);

    dailyboard.cards.forEach((card) => {
        const cardId = `${dailyboardId}/${card.name}`;
        state.cardById[cardId] = convertBoardCardSourceToItemContent(cardId, card);
    });
};

export const getBoardItemFromState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>, 
    owner: string, 
    categoryPath: string, 
    date: YYMMDDDate
): TBoardItem | null => {
    const content = getBoardItemContentFromState(state, owner, categoryPath, date);
    if (!content) return null;
    
    const cards = getBoardCardItemContentsFromState(state, content.id);
    
    return {
        ...content,
        cards,
    } as unknown as TBoardItem;
};

export const getBoardItemContentFromState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(  
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>,
    owner: string, 
    categoryPath: string, 
    date: YYMMDDDate
) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${categoryPath}@${date.raw}`));
    return key ? state.byId[key] as TBoardItemContent : null;
};

export const getBoardCardItemFromState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>,
    owner: string, 
    categoryPath: string, 
    date: YYMMDDDate,
    cardKey: string
) => {
    const cardId = `${owner}@${categoryPath}@${date.raw}/${cardKey}`;
    return state.cardById[cardId] as unknown as TBoardCardItem || null;
};

export const getBoardCardItemContentsFromState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>, 
    dailyboardId: string | null
) => {
    if (!dailyboardId) return [];
    return Object.values(state.cardById).filter(card => card.dailyboardId() === dailyboardId) as TBoardCardItemContent[];
};

//

// dailyboard.utils.ts - Eklenecek yardımcı fonksiyonlar

export const addCardToDailyboardState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>,
    categoryPath: string,
    date: YYMMDDDate,
    card: TBoardCardSource
): boolean => {
    const dailyboardContent = getBoardItemContentFromState(state, "me", categoryPath, date);
    if (!dailyboardContent) return false;

    const dailyboardId = dailyboardContent.id;
    const cardId = `${dailyboardId}/${card.name}`;
    
    if (state.cardById[cardId]) {
        console.warn(`Card already exists with name: ${card.name}`);
        return false;
    }

    state.cardById[cardId] = convertBoardCardSourceToItemContent<TBoardCardSource, TBoardCardItemContent>(cardId, card);
    
    return true;
};

export const updateCardInDailyboardState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData,
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>,
    categoryPath: string,
    date: YYMMDDDate,
    cardKey: string,
    cardUpdates: (draftCard: TBoardCardItemContent) => void
): BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent> => {
    
    return produce(state, (draft) => {
        const cardId = `me@${categoryPath}@${date.raw}/${cardKey}`;
        const card = draft.cardById[cardId];

        console.log("Updating card in state with ID:", cardId, "Current card data:", card);


        if(card) {
            cardUpdates(card as TBoardCardItemContent);
        }
    });
};

export const removeCardFromDailyboardState = <
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemContent extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemContent extends StoredBoardCardItemData
>(
    state: BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent>,
    categoryPath: string,
    date: YYMMDDDate,
    cardName: string
): boolean => {
    const dailyboardContent = getBoardItemContentFromState(state, "me", categoryPath, date);
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