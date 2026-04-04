import { LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.data.types";
import { LayoutResponse, LayoutSectionResponse } from "../models/responses/layout.response";

export function responseToLayout(response: LayoutResponse): LayoutData {
    return {
        name: response.name,
        version: response.version,
        colCount: response.colCount,
        rowCount: response.rowCount,
        sections: response.sections.map(responseToLayoutSections),
    };
}

export function responseToLayoutSections(response: LayoutSectionResponse): LayoutSectionData {
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