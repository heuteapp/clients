import { TracedRootItemProps } from "../types/props.types";
import { TracedItem } from "./TracedItem";

export function TracedRootItem({ type, data, ref, children }: TracedRootItemProps) {
    return (
        <TracedItem type={type} id={type} data={data} ref={ref}>
            {children}
        </TracedItem>
    );
}