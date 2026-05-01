import React, { useContext, useRef, useReducer, useEffect, useCallback } from "react";
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

    const Provider = ({ children }: { children: React.ReactNode }) => (
        <ViewCtx.Provider value={{ stateStore, metricsStore }}>
            {children}
        </ViewCtx.Provider>
    );

    function useSelector<TSelected>(
        selector: (ctx: TContext) => TSelected
    ): TSelected {
        const stores = useContext(ViewCtx);
        
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }
        
        const [, forceUpdate] = useReducer(x => x + 1, 0);
        const selectedRef = useRef<TSelected | undefined>(undefined);
        const selectorRef = useRef(selector);
        selectorRef.current = selector;
        
        useEffect(() => {
            const getContext = (): TContext => ({
                state: stores.stateStore.get(),
                metrics: stores.metricsStore.get()
            } as TContext);
            
            selectedRef.current = selectorRef.current(getContext());
            
            const unsubscribeState = stores.stateStore.subscribe(() => {
                const newSelected = selectorRef.current(getContext());
                if (selectedRef.current !== newSelected) {
                    selectedRef.current = newSelected;
                    forceUpdate();
                }
            });
            
            const unsubscribeMetrics = stores.metricsStore.subscribe(() => {
                const newSelected = selectorRef.current(getContext());
                if (selectedRef.current !== newSelected) {
                    selectedRef.current = newSelected;
                    forceUpdate();
                }
            });
            
            return () => {
                unsubscribeState();
                unsubscribeMetrics();
            };
        }, [stores]);
        
        return selectedRef.current as TSelected;
    }

    function useContextValue(): TContext {
        const stores = useContext(ViewCtx);
        
        if (!stores) {
            throw new Error("ViewContext Provider not found");
        }
        
        const [, forceUpdate] = useReducer(x => x + 1, 0);
        
        useEffect(() => {
            const unsubscribeState = stores.stateStore.subscribe(forceUpdate);
            const unsubscribeMetrics = stores.metricsStore.subscribe(forceUpdate);
            
            return () => {
                unsubscribeState();
                unsubscribeMetrics();
            };
        }, [stores]);
        
        return {
            state: stores.stateStore.get(),
            metrics: stores.metricsStore.get()
        } as TContext;
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
        useSelector,
        useContextValue,
        useSetState,
        useSetMetrics
    };
}