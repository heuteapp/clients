import { ViewRendering, ViewState, ViewStyling } from "./view.types";

export interface ViewProps<
    TState extends TStates,
    TStates extends ViewState = ViewState,
    TKeys extends string = string
> extends ViewRendering<TStates, TKeys>, ViewStyling<TKeys> {
    state: TState;
    ref?: React.RefObject<HTMLDivElement>;
}