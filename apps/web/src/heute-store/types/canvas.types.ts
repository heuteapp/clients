import { CanvasBase, CanvasGridBase } from "@/src/modules/canvas/types/canvas.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";

export interface CanvasBaseState<
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasGrid>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasGrid extends StoredCanvasGridItem,
    TCanvasGridContent extends StoredCanvasGridItemContent
> extends UserBasedStoreState<TCanvasItemContent> {
    gridById: Record<string, TCanvasGridContent>;

    loadGlobalCanvas: (canvas: TCanvasSource) => void;
    loadMeCanvas: (canvas: TCanvasSource) => void;
    loadUserCanvas: (user: string, canvas: TCanvasSource) => void;

    getGlobalCanvas: (name: string, version: number) => TCanvasItem | null;
    getMeCanvas: (name: string, version: number) => TCanvasItem | null;
    getUserCanvas: (user: string, name: string, version: number) => TCanvasItem | null;
}

//

export type CanvasBaseSource = CanvasBase;

export type CanvasGridBaseSource = CanvasGridBase;

export interface StoredCanvasItem<
    TCanvasGrid extends StoredCanvasGridItem = StoredCanvasGridItem
> extends StoredItem, CanvasBase {
    grids: TCanvasGrid[];
}

export interface StoredCanvasGridItem extends StoredItem, CanvasGridBase {
    canvasId: () => string;
}

export type StoredCanvasItemContent = Omit<StoredCanvasItem<StoredCanvasGridItem>, "grids">;

export type StoredCanvasGridItemContent = StoredCanvasGridItem;

//

import { CanvasData, CanvasGridData } from "@/src/modules/canvas/types/canvas.data.types";

export interface CanvasDataState extends CanvasBaseState<
    CanvasData, 
    StoredCanvasData, 
    StoredCanvasDataContent, 
    StoredCanvasGridData,
    StoredCanvasGridDataContent> {

}

//

export interface StoredCanvasData<
    TCanvasGrid extends StoredCanvasGridData = StoredCanvasGridData
> extends StoredCanvasItem<TCanvasGrid>, CanvasData {
    grids: TCanvasGrid[];
}

export interface StoredCanvasGridData extends StoredCanvasGridItem, CanvasGridData {

}

export type StoredCanvasDataContent = Omit<StoredCanvasData, "grids">;

export type StoredCanvasGridDataContent = StoredCanvasGridData;

//

import { CanvasStyle, CanvasGridStyle } from "@/src/modules/canvas/types/canvas.style.types";

export interface CanvasStyleState extends CanvasBaseState<
    CanvasStyle, 
    StoredCanvasStyle, 
    StoredCanvasStyleContent,
    StoredCanvasGridStyle,
    StoredCanvasGridStyleContent> {

}

//

export interface StoredCanvasStyle<
    TCanvasGrid extends StoredCanvasGridStyle = StoredCanvasGridStyle
> extends StoredCanvasItem<TCanvasGrid>, CanvasStyle {
    grids: TCanvasGrid[];
}

export interface StoredCanvasGridStyle extends StoredCanvasGridItem, CanvasGridStyle {

}

export type StoredCanvasStyleContent = Omit<StoredCanvasStyle, "grids">;

export type StoredCanvasGridStyleContent = StoredCanvasGridStyle;