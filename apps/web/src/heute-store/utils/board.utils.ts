import { produce } from 'immer';
import { YYMMDDDate } from "@/src/modules/d-core/types/date.types";
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
    board: TBoardSource
) => {
    const dailyboardId = `${owner}@${board.getKey()}`;

    state.byId[dailyboardId] = convertBoardSourceToItemContent(dailyboardId, board);

    board.cards.forEach((card) => {
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
    key: string,
): TBoardItem | null => {
    const content = getBoardItemContentFromState(state, owner, key);
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
    key: string,
) => {
    const id = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${key}`));
    return id ? state.byId[id] as TBoardItemContent : null;
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
    key: string, 
    cardKey: string
) => {
    const cardId = `${owner}@${key}/${cardKey}`;
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
    key: string,
    card: TBoardCardSource
): boolean => {
    const dailyboardContent = getBoardItemContentFromState(state, "me", key);
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
    key: string,
    cardKey: string,
    cardUpdates: (draftCard: TBoardCardItemContent) => void
): BoardBaseState<TBoardSource, TBoardCardSource, TBoardItem, TBoardItemContent, TBoardCardItem, TBoardCardItemContent> => {
    
    return produce(state, (draft) => {
        const cardId = `me@${key}/${cardKey}`;
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
    key: string,
    cardKey: string
): boolean => {
    const dailyboardContent = getBoardItemContentFromState(state, "me", key);
    if (!dailyboardContent) return false;

    const dailyboardId = dailyboardContent.id;
    const cardId = `${dailyboardId}/${cardKey}`;
    
    if (!state.cardById[cardId]) {
        console.warn(`Card not found with name: ${cardKey}`);
        return false;
    }

    delete state.cardById[cardId];
    
    return true;
};