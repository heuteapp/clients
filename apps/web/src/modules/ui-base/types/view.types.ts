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

export type ViewClassName = string[];

export type ViewClassNameTree<TSchema extends ViewSchema> 
    = ViewTree<TSchema, ViewClassName>;

export type ViewSx = SxProps<Theme>;

export type ViewSxTree<TSchema extends ViewSchema> 
    = ViewTree<TSchema, ViewSx>;

export type ViewWrapper<TState extends ViewState = ViewState> 
    = (children: React.ReactNode, state: TState) => React.ReactNode;

export type ViewWrapperTree<TSchema extends ViewSchema, TState extends ViewState = ViewState> 
    = ViewTree<TSchema, ViewWrapper<TState>>;

export type ViewRender<TState extends ViewState = ViewState> 
    = (state: TState) => React.ReactNode;

export type ViewRenderTree<TSchema extends ViewSchema, TState extends ViewState = ViewState> 
    = ViewTree<TSchema, ViewRender<TState>>;

//

export interface ViewStructure<TSchema extends ViewSchema, TStates extends ViewState = ViewState> {
    className?: ViewClassNameTree<TSchema>;
    sx?: ViewSxTree<TSchema>;    
    wrapper?: ViewWrapperTree<TSchema, TStates>;
    render?: ViewRenderTree<TSchema, TStates>;
}

export interface ViewSlot<TStates extends ViewState = ViewState> {
    className?: ViewClassName;
    sx?: ViewSx;    
    wrapper?: ViewWrapper<TStates>;
    render?: ViewRender<TStates>;
}