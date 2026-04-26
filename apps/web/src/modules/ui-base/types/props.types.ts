import { ViewStructure, ViewSchema, ViewSlot, ViewState } from "./view.types";

export interface ViewProps<
    TSchema extends ViewSchema,
    TState extends TStates,
    TStates extends ViewState
> extends ViewStructure<TSchema, TStates> {
    state: TState;
    ref?: React.RefObject<HTMLDivElement | null>;
    slot?: ViewSlot<TStates>;
}