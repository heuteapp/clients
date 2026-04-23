import { CanvasData, CanvasSectionData } from "@/src/modules/canvas/types/canvas.data.types";
import { CanvasResponse, CanvasSectionResponse } from "../models/responses/canvas.response";

export function responseToCanvas(response: CanvasResponse): CanvasData {
    return {
        name: response.name,
        version: response.version,
        colCount: response.colCount,
        rowCount: response.rowCount,
        sections: response.sections.map(responseToCanvasSections),
    };
}

export function responseToCanvasSections(response: CanvasSectionResponse): CanvasSectionData {
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