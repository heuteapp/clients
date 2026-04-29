import { ViewSchema, ViewSlot, ViewContextConfig, ViewComponentParams, ViewContextValue, ViewID } from "./view.types";

export interface ViewProps<
    ID extends string,
    TSchema extends ViewSchema
> extends ViewComponentParams<ID, TSchema> {
    context: ViewContextValue<TSchema>;
}

export interface ViewRootProps<
    KEY extends string,
    TSchema extends ViewSchema
> extends ViewComponentParams<ViewID<KEY>, TSchema> {
    config?: ViewContextConfig;
}

export interface ViewUXProps<
    ID extends string,
    TSchema extends ViewSchema
> {
    slot?: ViewSlot<ID, TSchema["hierarchy"], TSchema["state"]>;
}

//

export interface TracedItemPropsBase {
    type: string;
    data?: any;
    ref: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
}

export interface TracedItemProps extends TracedItemPropsBase {
    id: string | null;
}

export interface TracedUniqueItemProps extends TracedItemPropsBase {
    
}

export interface TracingDomainProviderProps {
    name: string;
    children: React.ReactNode;
}

export interface TracingStoreProviderProps {
    children: React.ReactNode;
}