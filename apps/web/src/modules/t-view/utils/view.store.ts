import { ViewValueProvider } from "../types/view.types";

export interface IStore<T> {
    get: () => T;
    set: (value: T) => void;
    subscribe: (listener: () => void) => () => void;
}

export class Store<T> implements IStore<T> {
    private value: T;
    private listeners = new Set<() => void>();
    
    constructor(initialValue: T) {
        this.value = initialValue;
    }
    
    get(): T {
        return this.value;
    }
    
    set(newValue: T): void {
        if (this.value !== newValue) {
            this.value = newValue;
            this.listeners.forEach(listener => listener());
        }
    }
    
    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

export function createStoreFromProvider<T>(
    provider: ViewValueProvider<T>
): IStore<T> {
    if (provider.type === "static") {
        return new Store(provider.value);
    }
    
    const store = new Store<T>(undefined as any);
    provider.host((value) => store.set(value));
    return store;
}