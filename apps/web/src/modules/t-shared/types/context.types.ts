export interface TracingContextValue {
    trace: (key: string, item: TracingItemData) => boolean;
    untrace: (key: string) => boolean;
    getItemsOf: (type: string, filter?: (item: TracingItemData) => boolean) => TracingItemData[];
}

export interface TracingItemData {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
}