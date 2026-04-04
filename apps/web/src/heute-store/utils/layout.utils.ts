import { LayoutState } from "../types/layout.types";
import { LayoutBaseSource, LayoutBaseState, LayoutSectionBaseSource, StoredLayoutItem, StoredLayoutItemContent, StoredLayoutSectionItem, StoredLayoutSectionItemContent } from "../types/layout/layout.base.types";

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

//

export const saveLayoutToState = <
    TLayoutSource extends LayoutBaseSource,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
>(
    state: LayoutBaseState<TLayoutSource, TLayoutItem, TLayoutItemContent, TLayoutSection, TLayoutSectionContent>, 
    owner: string, layout: TLayoutSource
) => {
    const layoutId = `${owner}@${layout.name}/${layout.version}`;

    state.byId[layoutId] = convertLayoutSourceToItemContent(layoutId, layout);

    layout.sections.forEach((section) => {
        const sectionId = `${layoutId}/${section.name}`;
        state.sectionById[sectionId] = convertLayoutSectionSourceToItemContent(sectionId, section);
    });
};