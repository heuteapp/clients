import { ViewPort, ViewX, ViewSchema, ViewSlot, ViewTreeSchema } from "./view.types";

export interface ViewProps<
    ID extends string,
    TSchema extends ViewSchema
> {
    state: TSchema["state"][ID];
    port: ViewPort<GetViewTreeValue<TSchema["tree"], ID>>;
    ref?: React.RefObject<HTMLDivElement | null>;
    slot?: ViewSlot<Exclude<TSchema["state"][ID], undefined>>;
}

export interface ViewRenderProps<
    ID extends string,
    TSchema extends ViewTreeSchema
> {
  x: ViewX<ID, TSchema>;
}

//

type GetViewTreeValue<
  T, 
  K extends string,
  V extends ViewTreeSchema = ViewTreeSchema
> = K extends keyof T
  ? T[K] extends V
    ? T[K]
    : T[K] extends true
      ? T[K]
      : never
  : T extends Record<string, infer U>
  ? GetViewTreeValue<U, K, V>
  : never;