import { SxProps, Theme } from "@mui/system";

export interface ViewProps<ID extends string, TSchema extends ViewSchema> {
    ref?: React.Ref<HTMLDivElement | null>;
    context: TSchema["context"];
    state: TSchema["states"][ID];
    overrides?: ViewOverrides;
    children?: React.ReactNode;
}

//

export interface ViewSchema {
    context: ViewContext | null;
    states: {
        [key: string]: ViewState;
    }
}

export interface ViewState {
    [key: string]: any;
}

export interface ViewContext {
    [key: string]: any;
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
    impl: ViewImpl;
}

export interface ViewImpl {
    className: ViewClassNameImpl;
    style: ViewStyleImpl;
    sx: ViewSxImpl;
    content: ViewContentImpl;
}

export type ViewClassNameImpl = (...classNames: string[]) => string;

export type ViewStyleImpl = (style?: React.CSSProperties) => React.CSSProperties;

export type ViewSxImpl = (sx?: SxProps<Theme>) => SxProps<Theme>;

export type ViewContentImpl = (def?: () => React.ReactNode) => React.ReactNode;