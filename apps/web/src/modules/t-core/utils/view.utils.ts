import { ViewProps } from "../types/props.types";
import { ViewComponentParams, ViewContextConfig, ViewContextValue, ViewRenderParams, ViewSchema } from "../types/view.types";

export function VIEW<
    const ID extends string,
    const TSchema extends ViewSchema,
>(  
    _: {
        id: ID;
        schema: TSchema;
    }
) {
    return { RENDER: VIEWRENDER_FROMPROPS<ID, TSchema> }
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
    return { CONFIG: VIEWCONFIG<ID, TSchema>, RENDER: VIEWRENDER_NOCONTEXT<ID, TSchema> }
}

//

const VIEWCONFIG = <
    ID extends string, 
    TSchema extends ViewSchema
> (
    config: ViewContextConfig
) => {
    const context : ViewContextValue = null!;

    return { 
        RENDER: (
            params: ViewComponentParams<ID, TSchema>,
            renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
        ) => {
            return VIEWRENDER<ID, TSchema>(params, context, renderFunc);
        } 
    }
}

//

const VIEWRENDER = <
    ID extends string, 
    TSchema extends ViewSchema
> (
    params: ViewComponentParams<ID, TSchema>,
    context: ViewContextValue | null,
    renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
) => {
    const { state, ref, port, slot } = params;

    const className = slot?.className ? slot.className 
        : port?.className ? port.className : undefined;

    const sx = slot?.sx ? slot.sx 
        : port?.sx ? port.sx : undefined;

    const render = slot?.render ? slot.render 
        : port?.render ? port.render : undefined;

    return renderFunc({
        state: state,
        context: context,
        ref: ref,
        slot: {
            className: className ? className as any : undefined,
            sx: sx ? sx as any : undefined,
            render: render ? render as any : undefined,
        },
    })
};

const VIEWRENDER_FROMPROPS = <
    ID extends string, 
    TSchema extends ViewSchema
> (
    props: ViewProps<ID, TSchema>,
    renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
) => {
    return VIEWRENDER<ID, TSchema>(props, props.context, renderFunc);
};

const VIEWRENDER_NOCONTEXT = <
    ID extends string, 
    TSchema extends ViewSchema
> (
    params: ViewComponentParams<ID, TSchema>,
    renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
) => {
    return VIEWRENDER<ID, TSchema>(params, null, renderFunc);
}