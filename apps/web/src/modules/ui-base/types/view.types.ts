import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";

export type ViewKey = string | null;

export type ViewStateType = ViewStateValue;

export type ViewStateValue = {
    [key: string]: any;
}

export type ViewClassNameValue = string[];

export type ViewClassNameType<TKey extends string = string> = { [key in TKey]: ViewClassNameValue; } & { body: ViewClassNameValue} 

export type ViewSxValue = SxProps<Theme>;

export type ViewSxRecord<TKey extends string = string> = { [key in TKey]: ViewSxValue; } & { body: ViewSxValue} 

export type ViewRenderValue<TState extends any = any> = (state: TState) => React.ReactNode;

export type ViewRenderRecord<TState extends ViewStateType = ViewStateType, TKey extends string = string> = { 
    [key in TKey]: ViewRenderValue<TState>;
}

//

export interface ViewData<TState extends ViewStateValue = ViewStateValue, TKey extends string = string> {
    state: TState;
    render?: ViewRenderValue<TState> | ViewRenderRecord<TState, TKey>;
}

export interface SimpleViewData<TState extends ViewStateValue = ViewStateValue> extends ViewData<TState, never> {
    render?: ViewRenderValue<TState>;
}

export interface RichViewData<
    TState extends ViewStateValue = ViewStateValue, 
    TKey extends string = string
> extends ViewData<TState, TKey> {
    render?: ViewRenderRecord<TState, TKey>;
}

//

export interface ViewOverrides<TKey extends string = string> {
    className?: ViewClassNameValue | ViewClassNameType<TKey>;
    sx?: ViewSxValue | ViewSxRecord<TKey>;
}

export interface SimpleViewOverrides extends ViewOverrides<never> {
    className?: ViewClassNameValue;
    sx?: ViewSxValue;
}

export interface RichViewOverrides<TKey extends string = string> extends ViewOverrides<TKey> {
    className?: ViewClassNameType<TKey>;
    sx?: ViewSxRecord<TKey>;
}