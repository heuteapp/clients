import { CanvasViewSchema } from "../types/view.types";

export const canvasView = <const ID extends string>(id: ID) => ({
    id,
    schema: {} as CanvasViewSchema,
});

export const canvasRootView = () => ({
    key: "canvas" as const,
    schema: {} as CanvasViewSchema,
});