import { useEffect } from "react";
import { useTracingContext } from "../hooks/useTracingContext";
import { TracedItemProps } from "../types/props.types";

export function TracedItem({ type, id, data, ref, children }: TracedItemProps) {
    const { trace, untrace } = useTracingContext();

    useEffect(() => {
        trace(id, { type, data, ref });

        return () => {
            untrace(id);
        };
    }, [type, id, data, trace, untrace]);

    return children;
}