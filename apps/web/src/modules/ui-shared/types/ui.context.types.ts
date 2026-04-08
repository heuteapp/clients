export interface MetricsContextValue {
    targets: string[];
    subscribe: (target: string, fn: () => void) => boolean;
}