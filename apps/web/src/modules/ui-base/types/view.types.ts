import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { FilterKeysByPrefix, FlattenKeys, GetNestedValue, IdKey, OmitKeysByPrefix } from "../../d-core/types/types";

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

export type ViewBaseTreeSchema<ID extends string, TTree extends ViewTreeSchema> = {
    [K in `${ID}-root`]: TTree;
}

export type ViewRootSchema<ID extends string, TTree extends ViewTreeSchema> 
    = FilterKeysByPrefix<FlattenKeys<TTree>, ID>;

export type ViewStateSchema<ID extends string, TTree extends ViewTreeSchema> = {
    [K in keyof ViewRootSchema<ID, TTree>]?: ViewState
};

//

export type ViewClassName = string[];

export type ViewClassNameTree<TSchema extends ViewTreeSchema> 
    = ViewTree<TSchema, ViewClassName>;

export type ViewSx = SxProps<Theme>;

export type ViewSxTree<TSchema extends ViewTreeSchema> 
    = ViewTree<TSchema, ViewSx>;

export type ViewWrapper<TState extends ViewState = ViewState> 
    = (children: React.ReactNode, state: TState) => React.ReactNode;

export type ViewWrapperTree<TSchema extends ViewTreeSchema, TState extends ViewState = ViewState> 
    = ViewTree<TSchema, ViewWrapper<TState>>;

export type ViewRender<TState extends ViewState = ViewState> 
    = (state: TState) => React.ReactNode;

export type ViewRenderTree<TSchema extends ViewTreeSchema, TState extends ViewState = ViewState> 
    = ViewTree<TSchema, ViewRender<TState>>;

//

export interface ViewPort<TSchema extends ViewTreeSchema | true> {
    className?: TSchema extends ViewTreeSchema ? ViewClassNameTree<TSchema> : ViewClassName;
    sx?: TSchema extends ViewTreeSchema ? ViewSxTree<TSchema> : ViewSx;
    wrapper?: TSchema extends ViewTreeSchema ? ViewWrapperTree<TSchema> : ViewWrapper;
    render?: TSchema extends ViewTreeSchema ? ViewRenderTree<TSchema> : ViewRender;
}

export interface ViewSlot<TStates extends ViewState = ViewState> {
    className?: ViewClassName;
    sx?: ViewSx;    
    wrapper?: ViewWrapper<TStates>;
    render?: ViewRender<TStates>;
}

export interface ViewX<
    ID extends string, 
    TSchema extends ViewTreeSchema | true,
    TX = TSchema extends ViewTreeSchema ? OmitKeysByPrefix<GetNestedValue<
            TSchema, 
        ID, true, ViewTreeSchema>, `${IdKey<ID>}-`> : true
> {
    className?: TX extends ViewTreeSchema ? ViewClassNameTree<TX> : ViewClassName;
    sx?: TX extends ViewTreeSchema ? ViewSxTree<TX> : ViewSx;
    wrapper?: TX extends ViewTreeSchema ? ViewWrapperTree<TX> : ViewWrapper;
    render?: TX extends ViewTreeSchema ? ViewRenderTree<TX> : ViewRender;
}

export interface ViewY<
    ID extends string, 
    TSchema extends ViewTreeSchema | true,
    TX = TSchema extends ViewTreeSchema ? FilterKeysByPrefix<GetNestedValue<
            TSchema, 
        ID, true, ViewTreeSchema>, `${IdKey<ID>}-`> : true
> {
    className?: TX extends ViewTreeSchema ? ViewClassNameTree<TX> : ViewClassName;
    sx?: TX extends ViewTreeSchema ? ViewSxTree<TX> : ViewSx;
    wrapper?: TX extends ViewTreeSchema ? ViewWrapperTree<TX> : ViewWrapper;
    render?: TX extends ViewTreeSchema ? ViewRenderTree<TX> : ViewRender;
}