import { ViewStructure, ViewSchema, ViewSlot, ViewTreeSchema } from "./view.types";

export interface ViewProps<
    ID extends string,
    TSchema extends ViewSchema
> extends ViewStructure<GetViewTreeValue<TSchema["tree"], ID>> {
    state: TSchema["state"][ID];
    ref?: React.RefObject<HTMLDivElement | null>;
    slot?: ViewSlot<Exclude<TSchema["state"][ID], undefined>>;
}

//

type GetViewTreeValue<
  T, 
  K extends string,
  V extends ViewTreeSchema = ViewTreeSchema
> = K extends keyof T
  ? T[K] extends V
    ? T[K]
    : never
  : T extends Record<string, infer U>
  ? GetViewTreeValue<U, K, V>
  : never;