import { CanvasBaseSource, CanvasBaseState, CanvasSectionBaseSource, StoredCanvasItem, StoredCanvasItemContent, StoredCanvasSectionItem, StoredCanvasSectionItemContent } from "../types/canvas.types";

export const convertCanvasSourceToItemContent = <
    TSource extends CanvasBaseSource, 
    TItemContent extends StoredCanvasItemContent
> (id: string, source: TSource) : TItemContent => {
    const { sections, ...rest } = source;

    return {
        id,
        ...rest,
    } as unknown as TItemContent;
}

export const convertCanvasSectionSourceToItemContent = <
    TSource extends CanvasSectionBaseSource,
    TItemContent extends StoredCanvasSectionItemContent
> (id: string, source: TSource) : TItemContent => {

    return {
        id,
        canvasId: () => id.split("/").slice(0, -1).join("/"),
        ...source,
    } as unknown as TItemContent;
}

//

export const saveCanvasToState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasSection>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasSection extends StoredCanvasSectionItem,
    TCanvasSectionContent extends StoredCanvasSectionItemContent
>(
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasSection, TCanvasSectionContent>, 
    owner: string, canvas: TCanvasSource
) => {
    const canvasId = `${owner}@${canvas.name}/${canvas.version}`;

    state.byId[canvasId] = convertCanvasSourceToItemContent(canvasId, canvas);

    canvas.sections.forEach((section) => {
        const sectionId = `${canvasId}/${section.name}`;
        state.sectionById[sectionId] = convertCanvasSectionSourceToItemContent(sectionId, section);
    });
};

export const getCanvasItemFromState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasSection>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasSection extends StoredCanvasSectionItem,
    TCanvasSectionContent extends StoredCanvasSectionItemContent
>(
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasSection, TCanvasSectionContent>, 
    owner: string, name: string, version: number
): TCanvasItem | null => {
    const content = getCanvasItemContentFromState(state, owner, name, version);
    if (!content) return null;
    
    const sections = getCanvasSectionItemContentsFromState(state, content.id);
    
    return {
        ...content,
        sections,
    } as unknown as TCanvasItem;
};



export const getCanvasItemContentFromState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasSection>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasSection extends StoredCanvasSectionItem,
    TCanvasSectionContent extends StoredCanvasSectionItemContent
>(  
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasSection, TCanvasSectionContent>,
    owner: string, name: string, version: number
) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${name}/${version}`));
    return key ? state.byId[key] as TCanvasItemContent : null;
};

export const getCanvasSectionItemContentsFromState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasSection>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasSection extends StoredCanvasSectionItem,
    TCanvasSectionContent extends StoredCanvasSectionItemContent
>(
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasSection, TCanvasSectionContent>, 
    canvasId: string | null
) => {
    if (!canvasId) return [];
    return Object.values(state.sectionById).filter(s => s.canvasId() === canvasId) as TCanvasSectionContent[];
};