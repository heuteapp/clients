import { LayoutBaseState } from "./layout.session";

export enum LayoutInteractionType {
    Idle = "idle"
}

export interface LayoutInteractionCallbacks {
    OnStart?: (type: LayoutInteractionType, state: LayoutBaseState) => void;
    OnUpdate?: (type: LayoutInteractionType, state: LayoutBaseState) => void;
    OnFinish?: (type: LayoutInteractionType, state: LayoutBaseState) => void;
}