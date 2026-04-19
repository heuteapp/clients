export interface MetricsContextValue {
    targets: string[];
    subscribe: (target: string, fn: () => void) => boolean;
    unsubscribe: (target: string) => boolean;
}

export interface HammerContextValue {
    Hammer: HammerStatic | null;
    loading: boolean;
    error: null;
}