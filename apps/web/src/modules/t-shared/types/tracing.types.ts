export interface TracingDomainSelector {
    items: (filter?: TracingItemFilter) => TracingItemData[];
    itemsOf: (type: string, filter?: TracingItemFilter) => TracingItemData[];
    uniqueItem: (type: string) => TracingItemData | null;
}

export interface TracingDomainData {
    items: Map<string, TracingItemData>;
}

export interface TracingItemData {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
}

export type TracingItemFilter = (item: TracingItemData) => boolean;