import React, { useSyncExternalStore, useCallback, useContext, useMemo } from "react";
import { ViewContext, ViewProvider } from "../types/view.types";
import { IStore, createStoreFromProvider } from "./view.store";

interface ViewStores<TContext extends ViewContext> {
    stateStore: IStore<TContext["state"]>;
    metricsStore: IStore<TContext["metrics"]>;
}

export function createViewContext<TContext extends ViewContext>(
    provider: ViewProvider<TContext>
) {
    const stateStore = provider.state 
        ? createStoreFromProvider(provider.state)
        : undefined;
    
    const metricsStore = provider.metrics 
        ? createStoreFromProvider(provider.metrics)
        : undefined;

    const ViewCtx = React.createContext<ViewStores<TContext> | null>(null);

    const Provider = ({ children }: { children: React.ReactNode }) => {
        const value = useMemo(() => ({ 
            stateStore, 
            metricsStore 
        }), []);
        return <ViewCtx.Provider value={value as ViewStores<TContext>}>{children}</ViewCtx.Provider>;
    };

    function useSelector<TSelected>(
        selector: (ctx: TContext) => TSelected
    ): TSelected {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }

        const getContext = useCallback((): TContext => {
            const ctx: Partial<TContext> = {};
            
            if (stores.stateStore) {
                (ctx as any).state = stores.stateStore.get();
            }
            if (stores.metricsStore) {
                (ctx as any).metrics = stores.metricsStore.get();
            }
            
            return ctx as TContext;
        }, [stores]);

        const subscribe = useCallback(
            (onStoreChange: () => void) => {
                const unsubscribers: (() => void)[] = [];
                
                if (stores.stateStore) {
                    unsubscribers.push(stores.stateStore.subscribe(onStoreChange));
                }
                if (stores.metricsStore) {
                    unsubscribers.push(stores.metricsStore.subscribe(onStoreChange));
                }
                
                return () => {
                    unsubscribers.forEach(unsub => unsub());
                };
            },
            [stores]
        );

        const getSnapshot = useCallback(() => selector(getContext()), [selector, getContext]);

        return useSyncExternalStore(subscribe, getSnapshot);
    }

    function useContextValue(): TContext {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }

        const getContext = useCallback((): TContext => {
            const ctx: Partial<TContext> = {};
            
            if (stores.stateStore) {
                (ctx as any).state = stores.stateStore.get();
            }
            if (stores.metricsStore) {
                (ctx as any).metrics = stores.metricsStore.get();
            }
            
            return ctx as TContext;
        }, [stores]);

        const subscribe = useCallback(
            (onStoreChange: () => void) => {
                const unsubscribers: (() => void)[] = [];
                
                if (stores.stateStore) {
                    unsubscribers.push(stores.stateStore.subscribe(onStoreChange));
                }
                if (stores.metricsStore) {
                    unsubscribers.push(stores.metricsStore.subscribe(onStoreChange));
                }
                
                return () => {
                    unsubscribers.forEach(unsub => unsub());
                };
            },
            [stores]
        );

        return useSyncExternalStore(subscribe, getContext);
    }

    function useSetState() {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }
        
        if (!stores.stateStore) {
            throw new Error("state is not defined in this context");
        }
        
        return useCallback((newState: TContext["state"]) => {
            stores.stateStore!.set(newState);
        }, [stores]);
    }

    function useSetMetrics() {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }
        
        if (!stores.metricsStore) {
            throw new Error("metrics is not defined in this context");
        }
        
        return useCallback((newMetrics: TContext["metrics"]) => {
            stores.metricsStore!.set(newMetrics);
        }, [stores]);
    }

    return {
        Provider,
        use: {
            selector: useSelector,
            contextValue: useContextValue,
            setState: useSetState,
            setMetrics: useSetMetrics
        }
    };
}