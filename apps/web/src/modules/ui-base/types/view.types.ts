import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { FilterKeysByPrefix, FlattenKeys } from "../../d-core/types/types";

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
    TState extends ViewStateSchema<ID, TTree> = ViewStateSchema<ID, TTree>
> = {
    tree: TTree;
    state: TState;
}

export type ViewTreeSchema = {
    [key in string]: true | ViewTreeSchema;
}

export type ViewRootSchema<ID extends string, TTree extends ViewTreeSchema> 
    = FilterKeysByPrefix<FlattenKeys<TTree> & { [key in `${ID}-root`]: true }, ID>

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

export interface ViewStructure<TSchema extends ViewTreeSchema> {
    className?: ViewClassNameTree<TSchema>;
    sx?: ViewSxTree<TSchema>;    
    wrapper?: ViewWrapperTree<TSchema>;
    render?: ViewRenderTree<TSchema>;
}

export interface ViewSlot<TStates extends ViewState = ViewState> {
    className?: ViewClassName;
    sx?: ViewSx;    
    wrapper?: ViewWrapper<TStates>;
    render?: ViewRender<TStates>;
}