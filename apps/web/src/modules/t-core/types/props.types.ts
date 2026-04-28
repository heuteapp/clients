import { ViewSchema, ViewPort, ViewSlot, ViewUXSlot } from "./view.types";

export interface ViewProps<
    ID extends string,
    TSchema extends ViewSchema
> {
    state: TSchema["state"][ID];
    ref?: React.RefObject<HTMLDivElement | null>;
    port?: ViewPort<TSchema["tree"]>;
    slot?: ViewSlot<ID, TSchema["tree"], TSchema["state"]>;
}

export interface ViewUXProps<
    ID extends string,
    TSchema extends ViewSchema
> {
    slot?: ViewUXSlot<ID, TSchema["tree"]>;
}

export interface ViewRenderProps<
    ID extends string,
    TSchema extends ViewSchema
> {
  state: TSchema["state"][ID];
  ref?: React.RefObject<HTMLDivElement | null>;
  slot: ViewSlot<ID, TSchema["tree"], TSchema["state"]>;
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