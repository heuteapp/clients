import { SxProps, Theme } from "@mui/system";

export interface ViewProps {
    ref?: React.Ref<HTMLDivElement | null>;
    state: ViewState;
    classNames?: string[];
    styles?: React.CSSProperties;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
}

export interface ViewState {
    [key: string]: any;
}

export interface ViewOverrides {
    classNames: string[];
    styles: React.CSSProperties;
    sx: SxProps<Theme>;
}

export interface ViewParams {
    ref: React.Ref<HTMLDivElement | null> | null;
    state: ViewState;
    overrides: ViewOverrides;
    content: (def?: () => React.ReactNode) => React.ReactNode;
}