export interface TracingDomainSelector {
    uniqueItem: (type: string) => TracingItemData | null;
    itemById: (type: string, id: string) => TracingItemData | null;
    items: (filter?: TracingItemFilter) => TracingItemData[];
    itemsByType: (type: string, filter?: TracingItemFilter) => TracingItemData[];

    uniqueRef: (type: string) => React.RefObject<HTMLElement | null> | null;
    refById: (type: string, id: string) => React.RefObject<HTMLElement | null> | null;
    refs: (filter?: TracingItemFilter) => React.RefObject<HTMLElement | null>[];
    refsByType: (type: string, filter?: TracingItemFilter) => React.RefObject<HTMLElement | null>[];

    uniqueData: (type: string) => any;
    dataById: (type: string, id: string) => any;
    datas: (filter?: TracingItemFilter) => any[];
    datasByType: (type: string, filter?: TracingItemFilter) => any[];
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