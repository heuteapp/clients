import { ViewPort, ViewTreeSchema } from "../types/view.types";

export function getPort<ID extends string, TSchema extends ViewTreeSchema | true>(
    target: ViewPort<TSchema>, id: ID
) : ViewPort<TSchema extends ViewTreeSchema ? TSchema[ID] : true> {
    if(!target) return {};

    return {
        className: target.className && (target.className as any)[id],
        sx: target.sx && (target.sx as any)[id],
        render: target.render && (target.render as any)[id],
    }
}