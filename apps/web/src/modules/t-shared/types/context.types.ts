import { Rect } from "../../d-shared/types/common";

export interface TracingContextValue {
    trace: (key: string, item: TracingItemData) => boolean;
    untrace: (key: string) => boolean;
}

export interface TracingItemData {
    rect: Rect;
    type: string;
    data: any;
}