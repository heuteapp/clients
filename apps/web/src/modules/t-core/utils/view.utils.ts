import { ViewProps } from "../types/props.types";
import { ViewRenderParams, ViewSchema } from "../types/view.types";

export function VIEW<
    const ID extends string,
    const TSchema extends ViewSchema,
>(  
    _: {
        id: ID;
        schema: TSchema;
    }
) {
    return { RENDER: VIEWRENDER<ID, TSchema> }
}

export function VIEWROOT<
    const KEY extends string,
    const TSchema extends ViewSchema
>(  
    _: {
        key: KEY;
        schema: TSchema;
    }
) {
    type ID = `${KEY}-root`;
    return { RENDER: VIEWRENDER<ID, TSchema> }
}

//

const VIEWRENDER = <
    ID extends string, 
    TSchema extends ViewSchema
> (
    props: ViewProps<ID, TSchema>,
    renderFunc: (props: ViewRenderParams<ID, TSchema>) => React.ReactNode
) => {
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
        slot: {
            className: className ? className as any : undefined,
            sx: sx ? sx as any : undefined,
            render: render ? render as any : undefined,
        },
    })
};