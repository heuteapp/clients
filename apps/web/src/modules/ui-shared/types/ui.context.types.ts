export interface MetricsContextValue {
    target: string;
    subscribe: (target: string, fn: () => void) => boolean;
}