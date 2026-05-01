import React from "react";
import { SxProps, Theme } from "@mui/system";

//


export type ViewProps<ID extends ViewID, TSchema extends ViewSchema> = {
    ref?: React.Ref<HTMLDivElement | null>;
    overrides?: ViewOverrides;
} & (WithChildrenProps<ID, TSchema> | WithRichStateProps<ID, TSchema>);

export type ViewRootProps<KEY extends string, TSchema extends ViewSchema> = ViewProps<ViewRootId<KEY>, TSchema> & {
    provider: TSchema["context"] extends ViewContext ? ViewProvider<TSchema["context"]> : never;
}

export type ViewID<TSpace extends string = string, TKey extends string = string> = `${TSpace}:${TKey}`;

export type ViewRootId<TSpace extends string = string> = ViewID<TSpace, "root">;

// 

export type ViewValueProvider<TValue> =
    | { type: "static"; value: TValue }
    | { type: "dynamic"; host: (set: (value: TValue) => void) => void }

export type ViewProvider<TContext extends ViewContext> = (
    TContext["state"] extends Record<string, any> 
        ? { state: ViewValueProvider<TContext["state"]> } 
        : { state?: never }
) & (
    TContext["metrics"] extends Record<string, any> 
        ? { metrics: ViewValueProvider<TContext["metrics"]> } 
        : { metrics?: never }
)

//

export interface ViewSchema {
    context: ViewContext | null;
    hierarchy: {
        [key: ViewID]: ViewDefinition;
    };
    states: {
        [key: ViewID]: ViewState;
    }
}

export interface ViewDefinition {
    [key: string]: string | string[] | ViewDefinition;
}

export interface ViewState {
    [key: string]: any;
}

export interface ViewContext {
    state?: Record<string, any>;
    metrics?: Record<string, any>;
}

export interface ViewOverrides {
    className?: string[];
    style?: React.CSSProperties;
    sx?: SxProps<Theme>;
}

//

export interface ViewParams<ID extends ViewID, TSchema extends ViewSchema> {
    ref: React.Ref<HTMLDivElement | null> | null;
    state: TSchema["states"][ID];
    impl: ViewImpl;
}

export interface ViewImpl {
    className: ViewClassNameImpl;
    style: ViewStyleImpl;
    sx: ViewSxImpl;
    render: ViewContentImpl;
}

export type ViewClassNameImpl = (...classNames: string[]) => string;

export type ViewStyleImpl = (style?: React.CSSProperties) => React.CSSProperties;

export type ViewSxImpl = (sx?: SxProps<Theme>) => SxProps<Theme>;

export type ViewContentImpl = (def?: () => React.ReactNode) => React.ReactNode;

//

type WithChildrenProps<ID extends ViewID, TSchema extends ViewSchema> = {
    children: React.ReactNode;
} & (ResolveState<ID, TSchema["states"]> extends never 
    ? { state?: never }
    : { state: ResolveState<ID, TSchema["states"]> }
);

type WithRichStateProps<ID extends ViewID, TSchema extends ViewSchema> = {
    children?: never;
    state: ResolveRichState<ID, TSchema["states"], TSchema["hierarchy"]>;
};

export type ResolveState<
    TRef,
    TStates extends Record<string, ViewState>
> = TRef extends keyof TStates ? TStates[TRef] : never;

export type ResolveRichState<
    TRef,
    TStates extends Record<string, ViewState>,
    THierarchy extends Record<string, ViewDefinition>
> = TRef extends string ?
      ResolveRichState<
          ToAbsolute<THierarchy[TRef], GetSpace<TRef>>,
          TStates, 
          THierarchy
      > & TStates[TRef]
    : TRef extends Array<infer U> 
        ? ResolveRichState<U, THierarchy, TStates>[] 
        : TRef extends object 
            ? {
                [K in keyof TRef]: ResolveRichState<TRef[K], THierarchy, TStates>
              }
            : TRef;

type GetSpace<TKey extends string> = TKey extends `${infer TSpace}:${infer _}`
    ? TSpace
    : never;

type ToAbsolute<TRef, TSpace extends string> = TRef extends string
    ? TRef extends `${infer _}:${infer _}`
        ? TRef
        : `${TSpace}:${TRef}`
    : TRef extends Array<infer U>
        ? ToAbsolute<U, TSpace>[]
        : TRef extends object
            ? {
                [K in keyof TRef]: ToAbsolute<TRef[K], TSpace>;
              }
            : TRef;

//

export type ResolveHierarchy<
  TSpace extends string,
  THierarchy extends Record<string, any>,
  TDepends extends any[] = []
> = ResolveRecord<TSpace, THierarchy, TDepends>

export type ResolveStates<
    TSpace extends string,
    TStates extends Record<string, ViewState>,
    TDepends extends any[] = []
> = ResolveRecord<TSpace, TStates, TDepends>;

export type ResolveRecord<
  TSpace extends string,
  THierarchy extends Record<string, any>,
  TDepends extends any[] = []
> = PrefixedKeys<THierarchy, TSpace> & 
  (TDepends extends [infer First, ...infer Rest] 
    ? First & ResolveHierarchy<TSpace, {}, Rest>
    : {}
  );

type PrefixedKeys<T, TSpace extends string> = {
  [K in keyof T as K extends string ? `${TSpace}:${K}` : never]: T[K];
};