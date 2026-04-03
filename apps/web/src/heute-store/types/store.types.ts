export interface BaseStoreState<TItem extends StoredItem> {
    byId: Record<string, TItem>;
}

export interface StoredItem {
    id: string;
}

//

export interface UserBasedStoreState<TItem extends StoredItem> extends BaseStoreState<TItem> {
    userOrder: string[];

    hasUser: (user: string) => boolean;

    sortMe: () => void;
    sortUser: (user: string) => void;

    clearMe: () => void;
    clearUser: (user: string) => void;
}