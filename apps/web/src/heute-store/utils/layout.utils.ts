import { LayoutBaseSource, LayoutBaseState, LayoutSectionBaseSource, StoredLayoutItem, StoredLayoutItemContent, StoredLayoutSectionItem, StoredLayoutSectionItemContent } from "../types/layout.types";

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
        layoutId: () => id.split("/").slice(0, -1).join("/"),
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

export const getLayoutItemFromState = <
    TLayoutSource extends LayoutBaseSource,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
>(
    state: LayoutBaseState<TLayoutSource, TLayoutItem, TLayoutItemContent, TLayoutSection, TLayoutSectionContent>, 
    owner: string, name: string, version: number
): TLayoutItem | null => {
    const content = getLayoutItemContentFromState(state, owner, name, version);
    if (!content) return null;
    
    const sections = getLayoutSectionItemContentsFromState(state, content.id);
    
    return {
        ...content,
        sections,
    } as unknown as TLayoutItem;
};



export const getLayoutItemContentFromState = <
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

export const getLayoutSectionItemContentsFromState = <
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