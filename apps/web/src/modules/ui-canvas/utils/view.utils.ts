import { CanvasViewSchema } from "../types/view.types";

export const canvasView = <const ID extends string>(id: ID) => ({
    schema: {} as CanvasViewSchema,
    id,
});