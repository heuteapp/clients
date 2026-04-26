import { getNestedValue } from "../../d-core/utils/types";
import { ViewProps, ViewRenderProps } from "../types/props.types";
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

export function VIEW<
    const ID extends string,
    const TSchema extends ViewSchema,
>(  
    config: {
        id: ID;
        schema: TSchema;
    }
) {
    const func = (props: ViewProps<ID, TSchema>, renderFunc: (props: ViewRenderProps<ID, TSchema>) => React.ReactNode) => renderFunc({
        state: props.state,
        ref: props.ref,
        x: {
            className: props.port.className ? getNestedValue(props.port.className, config.id) as any : undefined,
            sx: props.port.sx ? getNestedValue(props.port.sx, config.id) as any : undefined,
            render: props.port.render ? getNestedValue(props.port.render, config.id) as any : undefined,
        },
        y: {
            className: props.port.className ? getNestedValue(props.port.className, config.id) as any : undefined,
            sx: props.port.sx ? getNestedValue(props.port.sx, config.id) as any : undefined,
            render: props.port.render ? getNestedValue(props.port.render, config.id) as any : undefined,
        }
    });

    return { RENDER: func }
}