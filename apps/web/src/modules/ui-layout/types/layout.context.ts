import { StoredLayoutRoot } from "@/src/heute-store/types/layout.types";
import { LayoutRegistry } from "./layout.registry";

export interface LayoutContextValue {
    source: StoredLayoutRoot | null;
    registry: LayoutRegistry;    
}