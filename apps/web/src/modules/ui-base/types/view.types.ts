import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";

export type ViewKey = string | null;

export type ViewState = {
    [key: string]: any;
}

export type ViewSchema = {
    [key in string]: true | ViewSchema;
}

export type ViewTree<TSchema extends ViewSchema, TReturn> = {
    [K in keyof TSchema]?: TSchema[K] extends true 
        ? TReturn 
        : TSchema[K] extends object 
            ? ViewTree<TSchema[K], TReturn>
            : never;
} & { "&"?: TReturn };

//

export type ViewClassName<TSchema extends ViewSchema> 
    = ViewTree<TSchema, ViewClassNameValue>;

export type ViewClassNameValue = string[];

export type ViewSx<TSchema extends ViewSchema> 
    = ViewTree<TSchema, ViewSxValue>;

export type ViewSxValue = SxProps<Theme>;

export type ViewWrapper<TSchema extends ViewSchema, TState extends ViewState = ViewState> 
    = ViewTree<TSchema, ViewWrapperValue<TState>>;

export type ViewWrapperValue<TState extends ViewState = ViewState> 
    = (children: React.ReactNode, state: TState) => React.ReactNode;

export type ViewRender<TSchema extends ViewSchema, TState extends ViewState = ViewState> 
    = ViewTree<TSchema, ViewRenderValue<TState>>;

export type ViewRenderValue<TState extends ViewState = ViewState> 
    = (state: TState) => React.ReactNode;

//

export interface ViewComposition<TSchema extends ViewSchema, TStates extends ViewState = ViewState> {
    className?: ViewClassName<TSchema>;
    sx?: ViewSx<TSchema>;    
    wrapper?: ViewWrapper<TSchema, TStates>;
    render?: ViewRender<TSchema, TStates>;
}

export interface ViewSlot<TStates extends ViewState = ViewState> {
    className?: ViewClassNameValue;
    sx?: ViewSxValue;    
    wrapper?: ViewWrapperValue<TStates>;
    render?: ViewRenderValue<TStates>;
}