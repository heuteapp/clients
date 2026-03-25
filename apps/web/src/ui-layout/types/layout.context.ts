import { LayoutRegistry } from "./layout.registry";

export interface LayoutContextValue {
    layoutRef: React.RefObject<HTMLDivElement | null>;
    layoutRegistry: LayoutRegistry;    
}