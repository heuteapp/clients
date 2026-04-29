import { SxProps, Theme } from "@mui/system";

export interface ViewProps {
    ref?: React.Ref<HTMLDivElement | null>;
    state: ViewState;
    overrides?: ViewOverrides;
    children?: React.ReactNode;
}

export interface ViewState {
    [key: string]: any;
}

export interface ViewOverrides {
    className?: string[];
    styles?: React.CSSProperties;
    sx?: SxProps<Theme>;
}

export interface ViewParams {
    ref: React.Ref<HTMLDivElement | null> | null;
    state: ViewState;
    impl: ViewImpl;
}

export interface ViewImpl {
    className: ViewClassNameImpl;
    styles: ViewStylesImpl;
    sx: ViewSxImpl;
    content: ViewContentImpl;
}

export type ViewClassNameImpl = (...classNames: string[]) => string;

export type ViewStylesImpl = (styles?: React.CSSProperties) => React.CSSProperties;

export type ViewSxImpl = (sx?: SxProps<Theme>) => SxProps<Theme>;

export type ViewContentImpl = (def?: () => React.ReactNode) => React.ReactNode;