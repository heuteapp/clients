import { LayoutBase } from "@/src/modules/layout/types/layout.base.types";
import { StoredLayoutItemContent } from "../types/layout/layout.base.types";

export const convertSourceToItemContent = <
    TSource extends LayoutBase, 
    TItemContent extends StoredLayoutItemContent
> (id: string, source: TSource) : TItemContent => {
    const { sections, ...rest } = source;

    return {
        id,
        ...rest,
    } as unknown as TItemContent;
}