import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";

export type ViewKey = string | null;

export type ViewState = {
    [key: string]: any;
}

export type ViewSchema = {
    [key in string]: true | ViewSchema;
}

export type ViewTree<TSchema extends ViewSchema, TReturn, TX extends string = ""> = {
    [K in keyof TSchema]: TSchema[K] extends true 
        ? TReturn 
        : TSchema[K] extends object 
            ? ViewTree<TSchema[K], TReturn, TX> & { [key in TX]: TReturn }
            : never;
}

//

export type ViewClassName<TSchema extends ViewSchema> 
    = ViewTree<TSchema, string[], "body">;

export type ViewSx<TSchema extends ViewSchema> 
    = ViewTree<TSchema, SxProps<Theme>, "body">;

export type ViewRender<TSchema extends ViewSchema, TStates extends ViewState = ViewState> 
    = ViewTree<TSchema, (state: TStates) => React.ReactNode>;

//

export interface ViewComposition<TSchema extends ViewSchema, TStates extends ViewState = ViewState> {
    render?: ViewRender<TSchema, TStates>;
    className?: ViewClassName<TSchema>;
    sx?: ViewSx<TSchema>;
}

export interface ViewSlot<TStates extends ViewState = ViewState> {
    render?: (state: TStates) => React.ReactNode;
    className?: string[];
    sx?: SxProps<Theme>;
}