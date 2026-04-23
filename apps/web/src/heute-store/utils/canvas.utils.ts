import { CanvasBaseSource, CanvasBaseState, CanvasGridBaseSource, StoredCanvasItem, StoredCanvasItemContent, StoredCanvasGridItem, StoredCanvasGridItemContent } from "../types/canvas.types";

export const convertCanvasSourceToItemContent = <
    TSource extends CanvasBaseSource, 
    TItemContent extends StoredCanvasItemContent
> (id: string, source: TSource) : TItemContent => {
    const { grids, ...rest } = source;

    return {
        id,
        ...rest,
    } as unknown as TItemContent;
}

export const convertCanvasGridSourceToItemContent = <
    TSource extends CanvasGridBaseSource,
    TItemContent extends StoredCanvasGridItemContent
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
    TCanvasItem extends StoredCanvasItem<TCanvasGrid>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasGrid extends StoredCanvasGridItem,
    TCanvasGridContent extends StoredCanvasGridItemContent
>(
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasGrid, TCanvasGridContent>, 
    owner: string, canvas: TCanvasSource
) => {
    const canvasId = `${owner}@${canvas.name}/${canvas.version}`;

    state.byId[canvasId] = convertCanvasSourceToItemContent(canvasId, canvas);

    canvas.grids.forEach((grid) => {
        const gridId = `${canvasId}/${grid.name}`;
        state.gridById[gridId] = convertCanvasGridSourceToItemContent(gridId, grid);
    });
};

export const getCanvasItemFromState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasGrid>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasGrid extends StoredCanvasGridItem,
    TCanvasGridContent extends StoredCanvasGridItemContent
>(
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasGrid, TCanvasGridContent>, 
    owner: string, name: string, version: number
): TCanvasItem | null => {
    const content = getCanvasItemContentFromState(state, owner, name, version);
    if (!content) return null;
    
    const grids = getCanvasGridItemContentsFromState(state, content.id);
    
    return {
        ...content,
        grids,
    } as unknown as TCanvasItem;
};



export const getCanvasItemContentFromState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasGrid>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasGrid extends StoredCanvasGridItem,
    TCanvasGridContent extends StoredCanvasGridItemContent
>(  
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasGrid, TCanvasGridContent>,
    owner: string, name: string, version: number
) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${name}/${version}`));
    return key ? state.byId[key] as TCanvasItemContent : null;
};

export const getCanvasGridItemContentsFromState = <
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasGrid>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasGrid extends StoredCanvasGridItem,
    TCanvasGridContent extends StoredCanvasGridItemContent
>(
    state: CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasGrid, TCanvasGridContent>, 
    canvasId: string | null
) => {
    if (!canvasId) return [];
    return Object.values(state.gridById).filter(s => s.canvasId() === canvasId) as TCanvasGridContent[];
};