import { GridDimensions, GridRect } from "../../d-core/types/common";
import { ViewSchema } from "../../t-core/types/view.types";

export type CanvasViewSchema = ViewSchema<"canvas", CanvasViewContextSchema, CanvasViewHiearchySchema, CanvasViewStateSchema>;

export type CanvasViewContextSchema = {

}

export type CanvasViewHiearchySchema = {
    "canvas-grid-container": {
        "canvas-grid-section": {
            "canvas-grid-item": true;
        }
    }
}

export type CanvasViewStateSchema = {
    "canvas-root": {
        container: CanvasViewStateSchema["canvas-grid-container"];
    }
    "canvas-grid-container": {
        dimensions: GridDimensions;
        items: CanvasViewStateSchema["canvas-grid-item"][];
    };
    "canvas-grid-section": {
        item: CanvasViewStateSchema["canvas-grid-item"];
    };
    "canvas-grid-item": {
        areaName: string;
        position: GridRect;
    };
}