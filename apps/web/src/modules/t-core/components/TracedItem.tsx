import { useLayoutEffect } from "react";
import { useTracingDomain } from "../hooks/useTracingDomain";
import { TracedItemProps } from "../types/props.types";

export function TracedItem({ type, id, data, ref, children }: TracedItemProps) {
    const { trace, untrace } = useTracingDomain();

    useLayoutEffect(() => {
        trace(id, { type, data, ref });

        return () => {
            untrace(id, type);
        };
    }, [type, id, data, trace, untrace]);

    return children;
}