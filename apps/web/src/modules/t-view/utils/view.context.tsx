import React, { useSyncExternalStore, useCallback, useContext, useMemo } from "react";
import { ViewContext, ViewProvider } from "../types/view.types";
import { IStore, createStoreFromProvider } from "./view.store";

const contextStoresMap = new Map<string, { stateStore?: IStore<any>, metricsStore?: IStore<any> }>();

let activeContextId: string | null = null;

export function createViewContext<TContext extends ViewContext>(
    id: string,
    provider: ViewProvider<TContext>
) {
    const stateStore = provider.state ? createStoreFromProvider(provider.state) : undefined;
    const metricsStore = provider.metrics ? createStoreFromProvider(provider.metrics) : undefined;
    
    contextStoresMap.set(id, { stateStore, metricsStore });
    
    activeContextId = id;
    
    const ViewContext = React.createContext<{ stateStore?: IStore<TContext["state"]>, metricsStore?: IStore<TContext["metrics"]> } | null>(null);
    
    const Provider = ({ children }: { children: React.ReactNode }) => {
        const value = useMemo(() => ({ stateStore, metricsStore }), []);
        return React.createElement(ViewContext.Provider, { value }, children);
    };
    
    return { Provider };
}

export function useSelector<TSelected>(
    selector: (ctx: any) => TSelected
): TSelected {
    const stores = activeContextId ? contextStoresMap.get(activeContextId) : null;
    
    const getContext = useCallback(() => {
        const ctx: any = {};
        if (stores?.stateStore) {
            ctx.state = stores.stateStore.get();
        }
        if (stores?.metricsStore) {
            ctx.metrics = stores.metricsStore.get();
        }
        return ctx;
    }, []);
    
    const subscribe = useCallback((onStoreChange: () => void) => {
        const unsubscribers: (() => void)[] = [];
        if (stores?.stateStore) {
            unsubscribers.push(stores.stateStore.subscribe(onStoreChange));
        }
        if (stores?.metricsStore) {
            unsubscribers.push(stores.metricsStore.subscribe(onStoreChange));
        }
        return () => unsubscribers.forEach(unsub => unsub());
    }, []);
    
    const getSnapshot = useCallback(() => selector(getContext()), [selector, getContext]);
    return useSyncExternalStore(subscribe, getSnapshot);
}

export function useContextValue(): any {
    const stores = activeContextId ? contextStoresMap.get(activeContextId) : null;
    
    const getContext = useCallback(() => {
        const ctx: any = {};
        if (stores?.stateStore) {
            ctx.state = stores.stateStore.get();
        }
        if (stores?.metricsStore) {
            ctx.metrics = stores.metricsStore.get();
        }
        return ctx;
    }, []);
    
    const subscribe = useCallback((onStoreChange: () => void) => {
        const unsubscribers: (() => void)[] = [];
        if (stores?.stateStore) {
            unsubscribers.push(stores.stateStore.subscribe(onStoreChange));
        }
        if (stores?.metricsStore) {
            unsubscribers.push(stores.metricsStore.subscribe(onStoreChange));
        }
        return () => unsubscribers.forEach(unsub => unsub());
    }, []);
    
    return useSyncExternalStore(subscribe, getContext);
}

export function useSetState(): (newState: any) => void {
    const stores = activeContextId ? contextStoresMap.get(activeContextId) : null;
    
    if (!stores?.stateStore) {
        throw new Error("state is not defined in this context");
    }
    
    return useCallback((newState: any) => {
        stores.stateStore!.set(newState);
    }, []);
}

export function useSetMetrics(): (newMetrics: any) => void {
    const stores = activeContextId ? contextStoresMap.get(activeContextId) : null;
    
    if (!stores?.metricsStore) {
        throw new Error("metrics is not defined in this context");
    }
    
    return useCallback((newMetrics: any) => {
        stores.metricsStore!.set(newMetrics);
    }, []);
}