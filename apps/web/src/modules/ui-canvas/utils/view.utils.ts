import { ViewParams } from "../../t-view/types/view.types";
import { VIEW } from "../../t-view/utils/view.utils";
import { CanvasViewSchema } from "../types/view.types";

export const canvasView = <const ID extends string>(
    render: (params: ViewParams<ID, CanvasViewSchema>) => React.ReactNode
) => VIEW<ID, CanvasViewSchema>(render);