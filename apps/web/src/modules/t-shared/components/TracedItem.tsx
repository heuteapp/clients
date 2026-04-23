import { useEffect } from "react";
import { useTracingContext } from "../hooks/useTracingContext";
import { TracedItemProps } from "../types/props.types";

export function TracedItem({ type, key, data, ref, children }: TracedItemProps) {
    const { trace, untrace } = useTracingContext();

    useEffect(() => {
        trace(key, { type, data, ref });
        
        return () => {
            untrace(key);
        };
    }, [type, key, data, ref, trace, untrace]);

    return (
        <>
            {children}
        </>
    );
}