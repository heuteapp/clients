export interface CardTransformOverlayProps {
    cardRef: React.RefObject<HTMLElement> | null;
}

export type CardTransformOverlayMode = "idle" | "replacing" | "resizing"