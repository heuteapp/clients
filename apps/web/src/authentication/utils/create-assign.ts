import { AnyEventObject, assign, MachineContext } from "xstate";

export function createAssign<TContext extends MachineContext, TExpressionEvent extends AnyEventObject>(
    assignFn: (args: { context: TContext; event: TExpressionEvent; params: any }) => Partial<TContext>
) {
    return assign<TContext, TExpressionEvent, any, any, any>(assignFn as any);
}