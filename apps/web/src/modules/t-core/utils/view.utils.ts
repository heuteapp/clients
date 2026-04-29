import { ViewProps } from "../types/props.types";
import { ViewComponentParams, ViewContextConfig, ViewContextValue, ViewRenderParams, ViewSchema, ViewTree, ViewWrapper } from "../types/view.types";

export function VIEW<
    const ID extends string,
    const TSchema extends ViewSchema,
>(
    _: {
        id: ID;
        schema: TSchema;
    },
    props: ViewProps<ID, TSchema>
) {
    return { 
        RENDER: (renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode) => {
            return VIEWRENDER<ID, TSchema>(props, props.context, renderFunc);
        }
    }
}

export function VIEWROOT<
    const KEY extends string,
    const TSchema extends ViewSchema,
    const ID extends string = `${KEY}-root`
>(  
    _: {
        key: KEY;
        schema: TSchema;
    },
    props: ViewProps<ID, TSchema>
) {
    return { 
        CONFIG: (config: ViewContextConfig) => {
            return VIEWCONFIG<ID, TSchema>(props, config);
        }
    }
}

export function VIEWCONTENT<
    const ID extends string,
    const TSchema extends ViewSchema,
    const TState = TSchema['state'][ID]
>(
    state: TState,
    render: (() => React.ReactNode) | null, 
    wrapper?: (children: React.ReactNode, state: TState) => React.ReactNode
) {
    if (wrapper) {
        return wrapper(render?.() || null, state);
    } else {
        return render?.() || null;
    }
}

//

const VIEWCONFIG = <
    ID extends string, 
    TSchema extends ViewSchema
> (
    params: ViewComponentParams<ID, TSchema>,
    config: ViewContextConfig
) => {
    const context : ViewContextValue = null!;

    return { 
        RENDER: (
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
    context: ViewContextValue,
    renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
) => {
    const { state, ref, slot } = params;

    const className = slot?.className ? slot.className : undefined;
        //: port?.className ? port.className : undefined;

    const sx = slot?.sx ? slot.sx : undefined;
        //: port?.sx ? port.sx : undefined;

    const wrapper = slot?.wrapper ? slot.wrapper : undefined;
        //: port?.wrapper ? port.wrapper : undefined;

    return renderFunc({
        state: state,
        context: context,
        ref: ref,
        slot: {
            className: className ? className as any : undefined,
            sx: sx ? sx as any : undefined,
            wrapper: wrapper ? wrapper as any : undefined,
        },
    })
};