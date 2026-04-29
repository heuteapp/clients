import { SxProps, Theme } from "@mui/system";

export interface ViewProps {
    sx?: SxProps<Theme>;
    classNames?: string[];
    children?: React.ReactNode;
}

export interface ViewParams {
    props: ViewProps;
    content: (def: () => React.ReactNode) => React.ReactNode;
}