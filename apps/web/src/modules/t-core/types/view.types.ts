export interface ViewComponentParams<
    ID extends string,
    TSchema extends ViewSchema
> {
    state: TSchema["state"][ID];
    ref?: React.RefObject<HTMLDivElement | null>;
    port?: ViewPort<TSchema["hierarchy"]>;
    slot?: ViewSlot<ID, TSchema["hierarchy"], TSchema["state"]>;
}

export interface ViewRenderParams<
    ID extends string,
    TSchema extends ViewSchema
> {
    state: TSchema["state"][ID];
    context: ViewContextValue;
    ref?: React.RefObject<HTMLDivElement | null>;
    slot: ViewSlot<ID, TSchema["hierarchy"], TSchema["state"]>;
}

export interface ViewContextValue {

}

export interface ViewContextConfig {

}

//

export type ViewID<TKey extends string> = `${TKey}-root`;

export type ViewState = {
    [key: string]: any;
}

export type ViewKey = string | null;

export type ViewTree<TSchema extends ViewHierarchySchemaNode, TReturn> = {
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
    TTree extends ViewHierarchySchemaNode = ViewHierarchySchemaNode, 
    TState extends ViewStateSchema<ID, ViewHierarchySchemaRoot<ID, TTree>> = ViewStateSchema<ID, ViewHierarchySchemaRoot<ID, TTree>>
> = {
    hierarchy: ViewHierarchySchemaRoot<ID, TTree>;
    state: TState;
}

export type ViewHierarchySchemaNode = {
    [key in string]: true | ViewHierarchySchemaNode;
}

export type ViewHierarchySchemaRoot<KEY extends string, TNode extends ViewHierarchySchemaNode> = {
    [K in ViewID<KEY>]: TNode;
}

export type ViewRootSchema<ID extends string, TNode extends ViewHierarchySchemaNode = ViewHierarchySchemaNode> 
    = FilterKeysByPrefix<FlattenKeys<TNode>, ID>;

export type ViewStateSchema<ID extends string, TNode extends ViewHierarchySchemaNode = ViewHierarchySchemaNode> = {
    [K in keyof ViewRootSchema<ID, TNode>]?: ViewState
};

//

import { Theme, SxProps } from "@mui/system";

export type ViewClassName = string[];

export type ViewClassNameTree<TSchema extends ViewHierarchySchemaNode> 
    = ViewTree<TSchema, ViewClassName>;

export type ViewSx = SxProps<Theme>;

export type ViewSxTree<TSchema extends ViewHierarchySchemaNode> 
    = ViewTree<TSchema, ViewSx>;

export type ViewWrapper<TState extends ViewState | undefined = ViewState> 
    = (children: React.ReactNode, state: TState) => React.ReactNode;

export type ViewWrapperTree<TSchema extends ViewHierarchySchemaNode, TState extends ViewState | undefined = ViewState> 
    = ViewTree<TSchema, ViewWrapper<TState>>;

export type ViewRender<TState extends ViewState | undefined = ViewState> 
    = (state: TState) => React.ReactNode;

export type ViewRenderTree<TSchema extends ViewHierarchySchemaNode, TState extends ViewState | undefined = ViewState> 
    = ViewTree<TSchema, ViewRender<TState>>;

//

export type ViewPort<TSchema extends ViewHierarchySchemaNode> = {
    className?: ViewClassNameTree<TSchema>;
    sx?: ViewSxTree<TSchema>;
    wrapper?: ViewWrapperTree<TSchema>;
    render?: ViewRenderTree<TSchema>;
}

//

import { IdKey, GetNestedValue } from "../../d-core/types/types";

export interface ViewSlot<
    ID extends string, 
    THierarchy extends ViewHierarchySchemaNode | true,
    TState extends ViewStateSchema<ID>
> extends ViewSlotClassName<ID, THierarchy>, ViewSlotSx<ID, THierarchy>, ViewSlotWrapper<ID, THierarchy, TState> {
}

export interface ViewUXSlot<
    ID extends string, 
    THierarchy extends ViewHierarchySchemaNode | true
> extends ViewSlotClassName<ID, THierarchy>, ViewSlotSx<ID, THierarchy> {
}

export interface ViewSlotClassName<
    ID extends string, 
    THierarchy extends ViewHierarchySchemaNode | true, 
    TX = THierarchy extends ViewHierarchySchemaNode ? GetNestedValue<THierarchy, ID, true, ViewHierarchySchemaNode> : true
> {
    className?: TX extends ViewHierarchySchemaNode ? ViewClassNameTree<TX> : ViewClassName;
}

export interface ViewSlotSx<
    ID extends string, 
    THierarchy extends ViewHierarchySchemaNode | true, 
    TX = THierarchy extends ViewHierarchySchemaNode ? GetNestedValue<THierarchy, ID, true, ViewHierarchySchemaNode> : true
> {
    sx?: TX extends ViewHierarchySchemaNode ? ViewSxTree<TX> : ViewSx;
}

export interface ViewSlotWrapper<
    ID extends string, 
    THierarchy extends ViewHierarchySchemaNode | true, 
    TStateSchema extends ViewStateSchema<IdKey<ID>>,
    TX = THierarchy extends ViewHierarchySchemaNode ? GetNestedValue<THierarchy, ID, true, ViewHierarchySchemaNode> : true
> {
    wrapper?:  TX extends ViewHierarchySchemaNode ? ID extends keyof TStateSchema 
        ? ViewWrapperTree<TX, TStateSchema[ID]>
        : ViewWrapperTree<TX, ViewState> : ViewWrapper;
}