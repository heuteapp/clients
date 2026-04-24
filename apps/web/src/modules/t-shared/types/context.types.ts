import { TracingDomainData, TracingDomainSelector, TracingItemData } from "./tracing.types";

export interface TracingStoreContextValue {
    subscribe: (name: string, data: TracingDomainData) => boolean;
    unsubscribe: (name: string) => boolean;
    domains: Record<string, TracingDomainSelector>;
}

export interface TracingDomainContextValue {
    trace: (id: string | null, data: TracingItemData) => boolean;
    untrace: (id: string | null, type: string) => boolean;
}