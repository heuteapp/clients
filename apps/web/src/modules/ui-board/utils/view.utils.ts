import { ViewParams } from "../../t-view/types/view.types";
import { VIEW, VIEWROOT } from "../../t-view/utils/view.utils";
import { BoardViewSchema } from "../types/view.types";

export const boardView = <const ID extends string>(
    render: (params: ViewParams<ID, BoardViewSchema>) => React.ReactNode
) => VIEW<ID, BoardViewSchema>(render);

export const boardRootView = (
    render: (params: ViewParams<"root", BoardViewSchema>) => React.ReactNode
) => VIEWROOT<BoardViewSchema>(render);