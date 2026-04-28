export interface ViewComponentParams<
    ID extends string,
    TSchema extends ViewSchema
> {
    state: TSchema["state"][ID];
    ref?: React.RefObject<HTMLDivElement | null>;
    port?: ViewPort<TSchema["tree"]>;
    slot?: ViewSlot<ID, TSchema["tree"], TSchema["state"]>;
}

export interface ViewRenderParams<
    ID extends string,
    TSchema extends ViewSchema
> {
  state: TSchema["state"][ID];
  ref?: React.RefObject<HTMLDivElement | null>;
  slot: ViewSlot<ID, TSchema["tree"], TSchema["state"]>;
}

export interface ViewContextValue {

}

export interface ViewContextConfig {

}

//

export type ViewState = {
    [key: string]: any;
}

export type ViewKey = string | null;

export type ViewTree<TSchema extends ViewTreeSchema, TReturn> = {
    [K in keyof TSchema]?: TSchema[K] extends true 
        ? TReturn 
        : TSchema[K] extends object 
            ? ViewTree<TSchema[K], TReturn>
            : never;
} & { "&"?: TReturn };

//

import { FilterKeysByPrefix, FlattenKeys } from "../../d-core/types/types";

export type ViewSchema<
    ID extends string = string, 
    TTree extends ViewTreeSchema = ViewTreeSchema, 
    TState extends ViewStateSchema<ID, ViewBaseTreeSchema<ID, TTree>> = ViewStateSchema<ID, ViewBaseTreeSchema<ID, TTree>>
> = {
    tree: ViewBaseTreeSchema<ID, TTree>;
    state: TState;
}

export type ViewTreeSchema = {
    [key in string]: true | ViewTreeSchema;
}

export type ViewBaseTreeSchema<KEY extends string, TTree extends ViewTreeSchema> = {
    [K in `${KEY}-root`]: TTree;
}

export type ViewRootSchema<KEY extends string, TTree extends ViewTreeSchema = ViewTreeSchema> 
    = FilterKeysByPrefix<FlattenKeys<TTree>, KEY>;

export type ViewStateSchema<KEY extends string, TTree extends ViewTreeSchema = ViewTreeSchema> = {
    [K in keyof ViewRootSchema<KEY, TTree>]?: ViewState
};

//

import { Theme, SxProps } from "@mui/system";

export type ViewClassName = string[];

export type ViewClassNameTree<TSchema extends ViewTreeSchema> 
    = ViewTree<TSchema, ViewClassName>;

export type ViewSx = SxProps<Theme>;

export type ViewSxTree<TSchema extends ViewTreeSchema> 
    = ViewTree<TSchema, ViewSx>;

export type ViewWrapper<TState extends ViewState | undefined = ViewState> 
    = (children: React.ReactNode, state: TState) => React.ReactNode;

export type ViewWrapperTree<TSchema extends ViewTreeSchema, TState extends ViewState | undefined = ViewState> 
    = ViewTree<TSchema, ViewWrapper<TState>>;

export type ViewRender<TState extends ViewState | undefined = ViewState> 
    = (state: TState) => React.ReactNode;

export type ViewRenderTree<TSchema extends ViewTreeSchema, TState extends ViewState | undefined = ViewState> 
    = ViewTree<TSchema, ViewRender<TState>>;

//

export type ViewPort<TSchema extends ViewTreeSchema> = {
    className?: ViewClassNameTree<TSchema>;
    sx?: ViewSxTree<TSchema>;
    wrapper?: ViewWrapperTree<TSchema>;
    render?: ViewRenderTree<TSchema>;
}

//

import { IdKey, GetNestedValue } from "../../d-core/types/types";

export interface ViewSlot<
    ID extends string, 
    TSchema extends ViewTreeSchema | true,
    TStateSchema extends ViewStateSchema<ID>
> extends ViewStylingSlot<ID, TSchema>, ViewWrapperSlot<ID, TSchema>, ViewRenderSlot<ID, TSchema, TStateSchema> {
}

export interface ViewUXSlot<
    ID extends string, 
    TSchema extends ViewTreeSchema | true
> extends ViewStylingSlot<ID, TSchema>, ViewWrapperSlot<ID, TSchema> {
}

export interface ViewStylingSlot<
    ID extends string, 
    TSchema extends ViewTreeSchema | true, 
    TX = TSchema extends ViewTreeSchema ? GetNestedValue<TSchema, ID, true, ViewTreeSchema> : true
> {
    className?: TX extends ViewTreeSchema ? ViewClassNameTree<TX> : ViewClassName;
    sx?: TX extends ViewTreeSchema ? ViewSxTree<TX> : ViewSx;
}

export interface ViewWrapperSlot<
    ID extends string, 
    TSchema extends ViewTreeSchema | true, 
    TX = TSchema extends ViewTreeSchema ? GetNestedValue<TSchema, ID, true, ViewTreeSchema> : true
> {
    wrapper?: TX extends ViewTreeSchema ? ViewWrapperTree<TX> : ViewWrapper;
}

export interface ViewRenderSlot<
    ID extends string, 
    TSchema extends ViewTreeSchema | true, 
    TStateSchema extends ViewStateSchema<IdKey<ID>>,
    TX = TSchema extends ViewTreeSchema ? GetNestedValue<TSchema, ID, true, ViewTreeSchema> : true
> {
    render?: TX extends ViewTreeSchema ? ID extends keyof TStateSchema 
        ? ViewRenderTree<TX, TStateSchema[ID]>
        : ViewRenderTree<TX, ViewState> : ViewRender;
}