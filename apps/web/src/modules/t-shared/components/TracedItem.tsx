import { useEffect } from "react";
import { useTracingDomainContext } from "../hooks/useTracingDomainContext";
import { TracedItemProps } from "../types/props.types";

export function TracedItem({ type, id, data, ref, children }: TracedItemProps) {
    const { trace, untrace } = useTracingDomainContext();

    useEffect(() => {
        trace(id, { type, data, ref });

        return () => {
            untrace(id, type);
        };
    }, [type, id, data, trace, untrace]);

    return children;
}