import React from "react";
import { SxProps, Theme } from "@mui/system";

//


export type ViewProps<ID extends string, TSchema extends ViewSchema> = {
    ref?: React.Ref<HTMLDivElement | null>;
    overrides?: ViewOverrides;
} & (
    | { children: React.ReactNode; state?: never }
    | { children?: never; state: TSchema["states"][ID] }
)

export type ViewRootProps<TSchema extends ViewSchema> = ViewProps<"root", TSchema> & {
    provider: TSchema["context"] extends ViewContext ? ViewProvider<TSchema["context"]> : never;
}

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
        [key: string]: ViewDefinition;
    };
    states: {
        [key: string]: ViewState;
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

export interface ViewParams<ID extends string, TSchema extends ViewSchema> {
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

export type ResolveState<
    TRef,
    TStates extends Record<string, ViewState>
> = TRef extends keyof TStates ? TStates[TRef] : never;

export type ResolveRichState<
    TRef,
    TStates extends Record<string, ViewState>,
    THierarchy extends Record<string, ViewDefinition>
> = TRef extends string ?
      ResolveRichState<THierarchy[TRef], THierarchy, TStates> & TStates[TRef]
    : TRef extends Array<infer U> 
        ? ResolveRichState<U, THierarchy, TStates>[] 
        : TRef extends object 
            ? {
                [K in keyof TRef]: ResolveRichState<TRef[K], THierarchy, TStates>;
              }
            : TRef;