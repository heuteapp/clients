export interface TracingDomainSelector {
    items: (filter?: TracingItemFilter) => TracingItemData[];
    itemsOf: (type: string, filter?: TracingItemFilter) => TracingItemData[];
    uniqueItem: (type: string) => TracingItemData | null;
}

export interface TracingDomainData {
    items: Map<string, TracingItemData>;
}

export interface TracingItemParams {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
}

export interface TracingItemData extends TracingItemParams {
    id: string | null;
}

export type TracingItemFilter = (item: TracingItemData) => boolean;