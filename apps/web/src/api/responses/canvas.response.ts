import { CanvasData, CanvasGridData } from "@/src/modules/canvas/types/canvas.data.types";
import { CanvasResponse, CanvasGridResponse } from "../models/responses/canvas.response";

export function responseToCanvas(response: CanvasResponse): CanvasData {
    return {
        name: response.name,
        version: response.version,
        colCount: response.colCount,
        rowCount: response.rowCount,
        grids: response.sections.map(responseToCanvasGrids),
    };
}

export function responseToCanvasGrids(response: CanvasGridResponse): CanvasGridData {
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