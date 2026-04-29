export interface ViewComponentParams<
    ID extends string,
    TSchema extends ViewSchema
> {
    state: TSchema["state"][ID];
    ref?: React.RefObject<HTMLDivElement | null>;
    slot?: ViewSlot<ID, TSchema["hierarchy"], TSchema["state"]>;
}

export interface ViewRenderParams<
    ID extends string,
    TSchema extends ViewSchema
> extends ViewComponentParams<ID, TSchema> {
    context: ViewContextValue<TSchema>;
    slot: ViewSlot<ID, TSchema["hierarchy"], TSchema["state"]>;
}

export interface ViewContextValue<TSchema extends ViewSchema> {
    rootSlot: ViewSlot<never, TSchema["hierarchy"], TSchema["state"]>;
}

export interface ViewContextConfig {

}

//

export type ViewID<TKey extends string> = `${TKey}-root`;

export type IsViewRootID<ID extends string> = ID extends `${string}-root` ? true : false;

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
    THierarchy extends ViewHierarchySchemaNode = ViewHierarchySchemaNode, 
    TState extends ViewStateSchema<ID, ViewHierarchySchemaRoot<ID, THierarchy>> = ViewStateSchema<ID, ViewHierarchySchemaRoot<ID, THierarchy>>
> = {
    hierarchy: THierarchy;
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

export type ViewSx = SxProps<Theme>;

export type ViewWrapper<TState extends ViewState | undefined = ViewState> 
    = (children: React.ReactNode, state: TState) => React.ReactNode;

export type ViewRender<TState extends ViewState | undefined = ViewState> 
    = (state: TState) => React.ReactNode;
//

import { IdKey, GetNestedValue } from "../../d-core/types/types";

export type ViewSlot<
    ID extends string, 
    THierarchy extends ViewHierarchySchemaNode | true,
    TState extends ViewStateSchema<ID>,
    TX = THierarchy extends ViewHierarchySchemaNode ? GetNestedValue<THierarchy, [IsViewRootID<ID>] extends [true] ? never : ID, true, ViewHierarchySchemaNode> : true
> = TX extends ViewHierarchySchemaNode ? ViewTree<TX, ViewSlotValue<ID, TState>> : ViewSlotValue<ID, TState>;

export interface ViewSlotValue<
    ID extends string, 
    TStateSchema extends ViewStateSchema<IdKey<ID>>
> {
    className?: ViewClassName;
    sx?: ViewSx;
    wrapper?: ID extends keyof TStateSchema 
        ? ViewWrapper<TStateSchema[ID]>
        : ViewWrapper<ViewState>;
}