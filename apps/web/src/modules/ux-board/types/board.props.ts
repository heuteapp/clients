import { StoredBoardModel } from "@/src/heute-store/types/board.types";
import { StoredCanvasModel } from "@/src/heute-store/types/canvas.types";
import { ViewUXProps } from "../../ui-base/types/props.types";
import { BoardViewSchema } from "../../ui-board/types/view.types";
import { BoardCardModel, BoardModel } from "../../d-board/types/board.model.types";

export interface BoardRootProps extends ViewUXProps<"board-root", BoardViewSchema> {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    canvasRef?: React.RefObject<HTMLDivElement | null>;
    src: BoardModel;
    canvasSrc: StoredCanvasModel;
}

export interface BoardCardContainerProps extends ViewUXProps<"board-card-container", BoardViewSchema> {
    src: BoardCardModel[];
}

export interface BoardCardItemProps extends ViewUXProps<"board-card-item", BoardViewSchema> {
    src: BoardCardModel;
}

//

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}