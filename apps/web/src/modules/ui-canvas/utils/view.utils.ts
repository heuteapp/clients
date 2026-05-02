import { ViewID, ViewRootId } from "../../t-view/types/view.types";
import { ViewParams } from "../../t-view/types/view.types";
import { VIEW, VIEWROOT } from "../../t-view/utils/view.utils";
import { CanvasViewSchema } from "../types/view.types";

export const canvasView = <const ID extends ViewID>(
    render: (params: ViewParams<ID, CanvasViewSchema>) => React.ReactNode
) => VIEW<ID, CanvasViewSchema>(render);

export const canvasRootView = <const SPACE extends string>(
    render: (params: ViewParams<ViewRootId<SPACE>, CanvasViewSchema>) => React.ReactNode
) => VIEWROOT<CanvasViewSchema>(render);