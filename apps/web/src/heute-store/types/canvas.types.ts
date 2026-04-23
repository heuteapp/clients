import { CanvasBase, CanvasSectionBase } from "@/src/modules/canvas/types/canvas.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";

export interface CanvasBaseState<
    TCanvasSource extends CanvasBaseSource,
    TCanvasItem extends StoredCanvasItem<TCanvasSection>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasSection extends StoredCanvasSectionItem,
    TCanvasSectionContent extends StoredCanvasSectionItemContent
> extends UserBasedStoreState<TCanvasItemContent> {
    sectionById: Record<string, TCanvasSectionContent>;

    loadGlobalCanvas: (canvas: TCanvasSource) => void;
    loadMeCanvas: (canvas: TCanvasSource) => void;
    loadUserCanvas: (user: string, canvas: TCanvasSource) => void;

    getGlobalCanvas: (name: string, version: number) => TCanvasItem | null;
    getMeCanvas: (name: string, version: number) => TCanvasItem | null;
    getUserCanvas: (user: string, name: string, version: number) => TCanvasItem | null;
}

//

export type CanvasBaseSource = CanvasBase;

export type CanvasSectionBaseSource = CanvasSectionBase;

export interface StoredCanvasItem<
    TCanvasSection extends StoredCanvasSectionItem = StoredCanvasSectionItem
> extends StoredItem, CanvasBase {
    sections: TCanvasSection[];
}

export interface StoredCanvasSectionItem extends StoredItem, CanvasSectionBase {
    canvasId: () => string;
}

export type StoredCanvasItemContent = Omit<StoredCanvasItem<StoredCanvasSectionItem>, "sections">;

export type StoredCanvasSectionItemContent = StoredCanvasSectionItem;

//

import { CanvasData, CanvasSectionData } from "@/src/modules/canvas/types/canvas.data.types";

export interface CanvasDataState extends CanvasBaseState<
    CanvasData, 
    StoredCanvasData, 
    StoredCanvasDataContent, 
    StoredCanvasSectionData,
    StoredCanvasSectionDataContent> {

}

//

export interface StoredCanvasData<
    TCanvasSection extends StoredCanvasSectionData = StoredCanvasSectionData
> extends StoredCanvasItem<TCanvasSection>, CanvasData {
    sections: TCanvasSection[];
}

export interface StoredCanvasSectionData extends StoredCanvasSectionItem, CanvasSectionData {

}

export type StoredCanvasDataContent = Omit<StoredCanvasData, "sections">;

export type StoredCanvasSectionDataContent = StoredCanvasSectionData;

//

import { CanvasStyle, CanvasSectionStyle } from "@/src/modules/canvas/types/canvas.style.types";

export interface CanvasStyleState extends CanvasBaseState<
    CanvasStyle, 
    StoredCanvasStyle, 
    StoredCanvasStyleContent,
    StoredCanvasSectionStyle,
    StoredCanvasSectionStyleContent> {

}

//

export interface StoredCanvasStyle<
    TCanvasSection extends StoredCanvasSectionStyle = StoredCanvasSectionStyle
> extends StoredCanvasItem<TCanvasSection>, CanvasStyle {
    sections: TCanvasSection[];
}

export interface StoredCanvasSectionStyle extends StoredCanvasSectionItem, CanvasSectionStyle {

}

export type StoredCanvasStyleContent = Omit<StoredCanvasStyle, "sections">;

export type StoredCanvasSectionStyleContent = StoredCanvasSectionStyle;