import { RichViewData, RichViewOverrides, SimpleViewData, SimpleViewOverrides, ViewStateValue } from "./view.types";

export interface SimpleViewProps<TState extends ViewStateValue = ViewStateValue> extends SimpleViewData<TState>, SimpleViewOverrides {
    ref?: React.RefObject<HTMLDivElement | null>;
}

export interface RichViewProps<TState extends ViewStateValue = ViewStateValue, TKey extends string = string> extends RichViewData<TState, TKey>, RichViewOverrides<TKey> {
    ref?: React.RefObject<HTMLDivElement | null>;
}