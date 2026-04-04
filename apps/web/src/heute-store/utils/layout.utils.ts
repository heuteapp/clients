import { LayoutBaseSource, LayoutSectionBaseSource, StoredLayoutItemContent, StoredLayoutSectionItemContent } from "../types/layout/layout.base.types";

export const convertLayoutSourceToItemContent = <
    TSource extends LayoutBaseSource, 
    TItemContent extends StoredLayoutItemContent
> (id: string, source: TSource) : TItemContent => {
    const { sections, ...rest } = source;

    return {
        id,
        ...rest,
    } as unknown as TItemContent;
}

export const convertLayoutSectionSourceToItemContent = <
    TSource extends LayoutSectionBaseSource,
    TItemContent extends StoredLayoutSectionItemContent
> (id: string, source: TSource) : TItemContent => {

    return {
        id,
        ...source,
    } as unknown as TItemContent;
}