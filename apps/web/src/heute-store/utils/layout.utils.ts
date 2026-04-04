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

export const getLayoutItem = <
    TLayoutSource extends LayoutBaseSource,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
>(
    state: LayoutBaseState<TLayoutSource, TLayoutItem, TLayoutItemContent, TLayoutSection, TLayoutSectionContent>, 
    owner: string, name: string, version: number
): TLayoutItem | null => {
    const content = getLayoutItemContent(state, owner, name, version);
    if (!content) return null;
    
    const sections = getLayoutSectionItemContents(state, content.id);
    
    return {
        ...content,
        sections,
    } as unknown as TLayoutItem;
};



export const getLayoutItemContent = <
    TLayoutSource extends LayoutBaseSource,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
>(  
    state: LayoutBaseState<TLayoutSource, TLayoutItem, TLayoutItemContent, TLayoutSection, TLayoutSectionContent>,
    owner: string, name: string, version: number
) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${name}/${version}`));
    return key ? state.byId[key] as TLayoutItemContent : null;
};

export const getLayoutSectionItemContents = <
    TLayoutSource extends LayoutBaseSource,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
>(
    state: LayoutBaseState<TLayoutSource, TLayoutItem, TLayoutItemContent, TLayoutSection, TLayoutSectionContent>, 
    layoutId: string | null
) => {
    if (!layoutId) return [];
    return Object.values(state.sectionById).filter(s => s.layoutId() === layoutId) as TLayoutSectionContent[];
};