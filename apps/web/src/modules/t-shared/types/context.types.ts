export interface TracingContextValue {
    trace: (key: string, item: TracingItemData) => boolean;
    untrace: (key: string) => boolean;
}

export interface TracingItemData {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
}