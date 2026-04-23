import { Rect } from "../../d-shared/types/common";

export interface TracingContextValue {
    components: Map<string, TracingItemData>;
}

export interface TracingItemData {
    rect: Rect;
    type: string;
    data: any;
}