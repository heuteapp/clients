import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { LayoutRegistry } from "./layout.registry";

export interface LayoutContextValue {
    dataSource: StoredLayoutData | null;
    styleSource: StoredLayoutStyle | null;
    registry: LayoutRegistry;    
}