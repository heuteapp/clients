import { getNestedValue } from "../../d-core/utils/types";
import { ViewProps, ViewRenderProps } from "../types/props.types";
import { ViewPort, ViewSchema, ViewTreeSchema } from "../types/view.types";

export function VIEW<
    const ID extends string,
    const TSchema extends ViewSchema,
>(  
    config: {
        id: ID;
        schema: TSchema;
    }
) {
    const func = (props: ViewProps<ID, TSchema>, renderFunc: (props: ViewRenderProps<ID, TSchema>) => React.ReactNode) => {
        const { port, slot } = props;

        const className = slot?.className ? slot.className 
            : port?.className ? port.className : undefined;

        const sx = slot?.sx ? slot.sx 
            : port?.sx ? port.sx : undefined;

        const render = slot?.render ? slot.render 
            : port?.render ? port.render : undefined;

        return renderFunc({
            state: props.state,
            ref: props.ref,
            x: {
                className: className ? className as any : undefined,
                sx: sx ? sx as any : undefined,
                render: render ? render as any : undefined,
            },
            y: {
                className: className ? className as any : undefined,
                sx: sx ? sx as any : undefined,
                render: render ? render as any : undefined,
            }
        })
    };

    return { RENDER: func }
}