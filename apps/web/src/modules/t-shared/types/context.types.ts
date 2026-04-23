export interface TracingStoreContextValue {
    subscribe: (name: string, data: TracingDomainData) => boolean;
    unsubscribe: (name: string) => boolean;
    domains: Record<string, TracingDomain>;
}

export interface TracingDomainContextValue {
    trace: (id: string, data: TracingItemData) => boolean;
    untrace: (id: string) => boolean;
}

export interface TracingDomain {
    getItemsOf: (type: string, filter?: (item: TracingItemData) => boolean) => TracingItemData[];
}

export interface TracingDomainData {
    items: TracingItemData[];
}

export interface TracingItemData {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
}