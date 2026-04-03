export interface BaseStoreState<TItem extends BaseStoredItem> {
    byId: Record<string, TItem>;
}

export interface BaseStoredItem {
    id: string;
}

//

export interface UserBasedStoreState<TItem extends BaseStoredItem> extends BaseStoreState<TItem> {
    userOrder: string[];

    hasUser: (user: string) => boolean;

    sortMe: () => void;
    sortUser: (user: string) => void;

    clearMe: () => void;
    clearUser: (user: string) => void;
}