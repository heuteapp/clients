import { ViewStructure, ViewSchema, ViewSlot } from "./view.types";

export interface ViewProps<
    ID extends string,
    TSchema extends ViewSchema
> extends ViewStructure<TSchema["tree"]> {
    state: TSchema["state"][ID];
    ref?: React.RefObject<HTMLDivElement | null>;
    slot?: ViewSlot<Exclude<TSchema["state"][ID], undefined>>;
}