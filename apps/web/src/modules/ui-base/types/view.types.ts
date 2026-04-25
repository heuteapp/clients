import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";

export type ViewKey = string | null;

export type ViewState = {
    [key: string]: any;
}

export type ViewClassNames<TKeys extends string = string> = { [key in TKeys]?: string[]; }

export type ViewSxStyles<TKeys extends string = string> = { [key in TKeys]?: SxProps<Theme>; }

export type ViewRenderFunc<TStates extends any = any> = (state: TStates) => React.ReactNode;

export type ViewRenderMap<TStates extends ViewState = ViewState, TKeys extends string = string> = { 
    [key in TKeys]?: ViewRenderFunc<TStates>;
}

//

export interface ViewRendering<TStates extends ViewState = ViewState, TKeys extends string = string> {
    render?: ViewRenderMap<TStates, TKeys>;
}

export interface ViewStyling<TKeys extends string = string> {
    className?: ViewClassNames<TKeys>;
    sx?: ViewSxStyles<TKeys>;
}