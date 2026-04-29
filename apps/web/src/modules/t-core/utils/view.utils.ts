import { getNestedValue } from "../../d-core/utils/types";
import { ViewProps, ViewRootProps } from "../types/props.types";
import { ViewComponentParams, ViewContextConfig, ViewContextValue, ViewRenderParams, ViewSchema, ViewSlot, ViewTree, ViewWrapper } from "../types/view.types";

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
            return VIEWRENDER<ID, TSchema>(_.id, props, props.context, renderFunc);
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
    props: ViewRootProps<KEY, TSchema>
) {
    const rootId = `${_.key}-root` as ID;

    return { 
        CONFIG: (config: ViewContextConfig) => {
            return VIEWCONFIG<ID, TSchema>(rootId, props as ViewComponentParams<ID, TSchema>, config);
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
    const ID extends string, 
    const TSchema extends ViewSchema
> (
    id: ID,
    params: ViewComponentParams<ID, TSchema>,
    config: ViewContextConfig
) => {
    const context : ViewContextValue<TSchema> = {
        rootSlot: params.slot as ViewSlot<never, TSchema["hierarchy"], TSchema["state"]>,
    };

    return { 
        RENDER: (
            renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
        ) => {
            return VIEWRENDER<ID, TSchema>(id, params, context, renderFunc);
        }
    }
}

//

const VIEWRENDER = <
    const ID extends string, 
    const TSchema extends ViewSchema
> (
    id: ID,
    params: ViewComponentParams<ID, TSchema>,
    context: ViewContextValue<TSchema>,
    renderFunc: (params: ViewRenderParams<ID, TSchema>) => React.ReactNode
) => {
    const { state, ref, slot } = params;

    const rootSlot = context?.rootSlot;

    const targetSlot = slot || getNestedValue(rootSlot, id) as ViewSlot<ID, TSchema["hierarchy"], TSchema["state"]>;
        
    return renderFunc({
        state: state,
        context: context,
        ref: ref,
        slot: targetSlot
    })
};