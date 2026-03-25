import { LayoutRegistry } from "./layout.registry";

export interface LayoutContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: LayoutRegistry;    
}