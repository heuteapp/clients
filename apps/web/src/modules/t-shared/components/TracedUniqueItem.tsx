import { TracedUniqueItemProps } from "../types/props.types";
import { TracedItem } from "./TracedItem";

export function TracedUniqueItem({ type, data, ref, children }: TracedUniqueItemProps) {
    return (
        <TracedItem type={type} id={type} data={data} ref={ref}>
            {children}
        </TracedItem>
    );
}