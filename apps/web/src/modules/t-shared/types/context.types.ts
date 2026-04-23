export interface TracingContextValue {
    trace: (id: string, item: TracingItemData) => boolean;
    untrace: (id: string) => boolean;
    getItemsOf: (type: string, filter?: (item: TracingItemData) => boolean) => TracingItemData[];
}

export interface TracingItemData {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
}