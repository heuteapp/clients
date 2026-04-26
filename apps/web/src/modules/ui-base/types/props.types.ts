import { ViewStructure, ViewTreeSchema, ViewSlot, ViewState } from "./view.types";

export interface ViewProps<
    TSchema extends ViewTreeSchema,
    TState extends TStates,
    TStates extends ViewState
> extends ViewStructure<TSchema, TStates> {
    state: TState;
    ref?: React.RefObject<HTMLDivElement | null>;
    slot?: ViewSlot<TStates>;
}