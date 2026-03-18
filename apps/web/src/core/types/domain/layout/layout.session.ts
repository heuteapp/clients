import { Draft } from "immer";

export interface LayoutSessionValue {
    pointerId?: number | null;
}
    
export type LayoutSessionUpdater = (updater: (draft: Draft<LayoutSessionValue>) => void) => void;