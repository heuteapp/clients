import { StoredLayoutData } from "@/src/heute-store/types/layout.types";
import { LayoutRegistry } from "./layout.registry";

export interface LayoutContextValue {
    source: StoredLayoutData | null;
    registry: LayoutRegistry;    
}