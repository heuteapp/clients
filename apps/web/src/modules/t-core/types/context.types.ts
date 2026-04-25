import { TracingDomainData, TracingDomainSelector, TracingItemParams } from "./tracing.types";

export interface TracingStoreContextValue {
    subscribe: (name: string, data: TracingDomainData) => boolean;
    unsubscribe: (name: string) => boolean;
    domains: Record<string, TracingDomainSelector>;
}

export interface TracingDomainContextValue {
    trace: (id: string | null, params: TracingItemParams) => boolean;
    untrace: (id: string | null, type: string) => boolean;
    selector: TracingDomainSelector;
}