import { SxProps, Theme } from "@mui/system";

export interface ViewProps<ID extends string, TSchema extends ViewSchema> {
    ref?: React.Ref<HTMLDivElement | null>;
    context: TSchema["context"] | null;
    state: TSchema["states"][ID];
    overrides?: ViewOverrides;
    children?: React.ReactNode;
}

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
    context: TSchema["context"];
    state: TSchema["states"][ID];
    impl: ViewImpl<TSchema>;
}

export interface ViewImpl<TSchema extends ViewSchema> {
    className: ViewClassNameImpl;
    style: ViewStyleImpl;
    sx: ViewSxImpl;
    content: ViewContentImpl;
    pass: ViewPassImpl<TSchema>;
}

export type ViewClassNameImpl = (...classNames: string[]) => string;

export type ViewStyleImpl = (style?: React.CSSProperties) => React.CSSProperties;

export type ViewSxImpl = (sx?: SxProps<Theme>) => SxProps<Theme>;

export type ViewContentImpl = (def?: () => React.ReactNode) => React.ReactNode;

export type ViewPassImpl<TSchema extends ViewSchema> = <ID extends string>(params: ViewPassParams<ID, TSchema>) => ViewPassProps<ID, TSchema>;

export type ViewPassParams<ID extends string, TSchema extends ViewSchema> = {
    key?: number | string;
    state: TSchema["states"][ID];
}

export type ViewPassProps<ID extends string, TSchema extends ViewSchema> = {
    context: TSchema["context"];
    key?: number | string | undefined;
    state: TSchema["states"][ID];
}