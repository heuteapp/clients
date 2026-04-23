import { CanvasBase, CanvasGridBase } from "@/src/modules/canvas/types/canvas.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";

export interface CanvasBaseState<
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasGrid>,
    TCanvasItemData extends StoredCanvasItemData,
    TCanvasGrid extends StoredCanvasGridItem,
    TCanvasGridData extends StoredCanvasGridItemData
> extends UserBasedStoreState<TCanvasItemData> {
    gridById: Record<string, TCanvasGridData>;

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

export type StoredCanvasItemData = Omit<StoredCanvasItem<StoredCanvasGridItem>, "grids">;

export type StoredCanvasGridItemData = StoredCanvasGridItem;

//

import { CanvasModel, CanvasGridModel } from "@/src/modules/canvas/types/canvas.model.types";

export interface CanvasModelState extends CanvasBaseState<
    CanvasModel, 
    StoredCanvasModel, 
    StoredCanvasModelData, 
    StoredCanvasGridModel,
    StoredCanvasGridModelData> {

}

//

export interface StoredCanvasModel<
    TCanvasGrid extends StoredCanvasGridModel = StoredCanvasGridModel
> extends StoredCanvasItem<TCanvasGrid>, CanvasModel {
    grids: TCanvasGrid[];
}

export interface StoredCanvasGridModel extends StoredCanvasGridItem, CanvasGridModel {

}

export type StoredCanvasModelData = Omit<StoredCanvasModel, "grids">;

export type StoredCanvasGridModelData = StoredCanvasGridModel;

//

import { CanvasStyle, CanvasGridStyle } from "@/src/modules/canvas/types/canvas.style.types";

export interface CanvasStyleState extends CanvasBaseState<
    CanvasStyle, 
    StoredCanvasStyle, 
    StoredCanvasStyleData,
    StoredCanvasGridStyle,
    StoredCanvasGridStyleData> {

}

//

export interface StoredCanvasStyle<
    TCanvasGrid extends StoredCanvasGridStyle = StoredCanvasGridStyle
> extends StoredCanvasItem<TCanvasGrid>, CanvasStyle {
    grids: TCanvasGrid[];
}

export interface StoredCanvasGridStyle extends StoredCanvasGridItem, CanvasGridStyle {

}

export type StoredCanvasStyleData = Omit<StoredCanvasStyle, "grids">;

export type StoredCanvasGridStyleData = StoredCanvasGridStyle;