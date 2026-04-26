import { GetNestedValue } from "../../d-core/types/types";
import { filterKeysByPrefix, getNestedValue, idKey, omitKeysByPrefix } from "../../d-core/utils/types";
import { ViewRenderProps } from "../types/props.types";
import { ViewPort, ViewSchema, ViewTreeSchema } from "../types/view.types";

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

export function viewRender<ID extends string, TSchema extends ViewSchema>(  
    id: ID,
    state: TSchema["state"][ID],
    ref: React.RefObject<HTMLDivElement | null> | undefined,
    port: ViewPort<GetNestedValue<TSchema["tree"], ID, true, ViewTreeSchema>>,
    renderFunc: (props: ViewRenderProps<ID, TSchema>) => React.ReactNode
) {
    return renderFunc({
        state,
        ref,
        x: {
            className: port.className ? omitKeysByPrefix(getNestedValue(port.className, id) as any, idKey(id)) as any : undefined,
            sx: port.sx ? omitKeysByPrefix(getNestedValue(port.sx, id) as any, idKey(id)) as any : undefined,
            render: port.render ? omitKeysByPrefix(getNestedValue(port.render, id) as any, idKey(id)) as any : undefined,
        },
        y: {
            className: port.className ? filterKeysByPrefix(getNestedValue(port.className, id) as any, idKey(id)) as any : undefined,
            sx: port.sx ? filterKeysByPrefix(getNestedValue(port.sx, id) as any, idKey(id)) as any : undefined,
            render: port.render ? filterKeysByPrefix(getNestedValue(port.render, id) as any, idKey(id)) as any : undefined,
        }
    });
}