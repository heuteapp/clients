import { ViewRendering, ViewSchema, ViewState, ViewStyling } from "./view.types";

export interface ViewProps<
    TSchema extends ViewSchema,
    TState extends TStates,
    TStates extends ViewState
> extends ViewRendering<TSchema, TStates>, ViewStyling<TSchema> {
    state: TState;
    ref?: React.RefObject<HTMLDivElement | null>;
}