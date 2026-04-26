import { ViewPort, ViewX, ViewSchema, ViewSlot, ViewTreeSchema, ViewY } from "./view.types";

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
    TSchema extends ViewSchema
> {
  state: TSchema["state"][ID];
  ref?: React.RefObject<HTMLDivElement | null>;
  x: ViewX<ID, TSchema["tree"]>;
  y: ViewY<ID, TSchema["tree"]>;
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