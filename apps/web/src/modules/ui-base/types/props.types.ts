import { ViewClassNameType, ViewClassNameValue, ViewRenderType, ViewStateValue, ViewSxType, ViewSxValue } from "./view.types";

export interface BaseViewProps {
    ref: React.RefObject<HTMLDivElement | null>;
    state: ViewStateValue;
}

export interface SimpleViewProps extends BaseViewProps {
    className?: ViewClassNameValue;
    sx?: ViewSxValue;
}

export interface RichViewProps<TKey extends string = string> extends BaseViewProps {
    className?: ViewClassNameType<TKey>;
    sx?: ViewSxType<TKey>;
    render?: ViewRenderType<TKey>;
}