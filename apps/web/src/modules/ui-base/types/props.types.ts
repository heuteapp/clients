import { ViewClassNameType, ViewClassNameValue, ViewRenderType, ViewStateValue, ViewSxType, ViewSxValue } from "./view.types";

export interface BaseViewProps<TState extends ViewStateValue = ViewStateValue> {
    ref?: React.RefObject<HTMLDivElement | null>;
    state: TState;
}

export interface SimpleViewProps<TState extends ViewStateValue = ViewStateValue>  extends BaseViewProps<TState> {
    className?: ViewClassNameValue;
    sx?: ViewSxValue;
}

export interface RichViewProps<
    TState extends ViewStateValue = ViewStateValue, 
    TKey extends string = string
> extends BaseViewProps<TState> {
    className?: ViewClassNameType<TKey>;
    sx?: ViewSxType<TKey>;
    render?: ViewRenderType<TState, TKey>;
}