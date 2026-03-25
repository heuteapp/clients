import { fromCallback, AnyEventObject } from "xstate";

export function createCallback<
    TInput,
    TEmitted extends AnyEventObject
>(
    callBack: (args: {
        input: TInput;
        sendBack: (event: TEmitted) => void;
    }) => void | (() => void)
) {
    return fromCallback<AnyEventObject, TInput, TEmitted>(
        ({ input, sendBack }) => {
            const typedSendBack = (event: TEmitted) => sendBack(event);

            return callBack({
                input,
                sendBack: typedSendBack
            });
        }
    );
}