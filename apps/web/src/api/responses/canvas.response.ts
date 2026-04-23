import { CanvasModel, CanvasGridModel } from "@/src/modules/d-canvas/types/canvas.model.types";
import { CanvasResponse, CanvasGridResponse } from "../models/responses/canvas.response";

export function responseToCanvas(response: CanvasResponse): CanvasModel {
    return {
        name: response.name,
        version: response.version,
        colCount: response.colCount,
        rowCount: response.rowCount,
        grids: response.sections.map(responseToCanvasGrids),
    };
}

export function responseToCanvasGrids(response: CanvasGridResponse): CanvasGridModel {
    return {
        name: response.name,
        position: {
            colIndex: response.colIndex,
            rowIndex: response.rowIndex,
            colSpan: response.colSpan,
            rowSpan: response.rowSpan
        }
    };
}