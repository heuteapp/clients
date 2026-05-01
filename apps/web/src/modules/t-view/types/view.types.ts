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
    states: {
        "root": ViewState;
        [key: string]: ViewState;
    }
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