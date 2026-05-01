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
    const stateStore = createStoreFromProvider(provider.state);
    const metricsStore = createStoreFromProvider(provider.metrics);

    const ViewCtx = React.createContext<ViewStores<TContext> | null>(null);

    // Provider: value'yu memoize et
    const Provider = ({ children }: { children: React.ReactNode }) => {
        const value = useMemo(() => ({ stateStore, metricsStore }), [stateStore, metricsStore]);
        return <ViewCtx.Provider value={value}>{children}</ViewCtx.Provider>;
    };

    // useSelector – SADECE seçilen değer değiştiğinde render eder
    function useSelector<TSelected>(
        selector: (ctx: TContext) => TSelected
    ): TSelected {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }

        const getContext = useCallback(
            (): TContext => ({
                state: stores.stateStore.get(),
                metrics: stores.metricsStore.get()
            } as TContext),
            [stores]
        );

        const subscribe = useCallback(
            (onStoreChange: () => void) => {
                const unsubState = stores.stateStore.subscribe(onStoreChange);
                const unsubMetrics = stores.metricsStore.subscribe(onStoreChange);
                return () => {
                    unsubState();
                    unsubMetrics();
                };
            },
            [stores]
        );

        const getSnapshot = useCallback(() => selector(getContext()), [selector, getContext]);

        // useSyncExternalStore tüm zor işleri halleder:
        // - ilk değeri doğru alır
        // - selector değişince yeni snapshot alır
        // - sadece snapshot değiştiğinde re-render yapar
        return useSyncExternalStore(subscribe, getSnapshot);
    }

    // Tüm context değiştiğinde render eden hook (isteğe bağlı)
    function useContextValue(): TContext {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }

        const getContext = useCallback(
            (): TContext => ({
                state: stores.stateStore.get(),
                metrics: stores.metricsStore.get()
            } as TContext),
            [stores]
        );

        const subscribe = useCallback(
            (onStoreChange: () => void) => {
                const unsubState = stores.stateStore.subscribe(onStoreChange);
                const unsubMetrics = stores.metricsStore.subscribe(onStoreChange);
                return () => {
                    unsubState();
                    unsubMetrics();
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
        return useCallback((newState: TContext["state"]) => {
            stores.stateStore.set(newState);
        }, [stores]);
    }

    function useSetMetrics() {
        const stores = useContext(ViewCtx);
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }
        return useCallback((newMetrics: TContext["metrics"]) => {
            stores.metricsStore.set(newMetrics);
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