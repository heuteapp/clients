import { StoredBoardModel, StoredBoardCardModel } from "@/src/heute-store/types/board.types";
import { StoredCanvasModel } from "@/src/heute-store/types/canvas.types";
import { ViewUXProps } from "../../ui-base/types/props.types";
import { BoardViewSchema } from "../../ui-board/types/view.types";

export interface BoardRootProps extends ViewUXProps<"board-root", BoardViewSchema> {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    canvasRef?: React.RefObject<HTMLDivElement | null>;
    src: StoredBoardModel;
    canvasSrc: StoredCanvasModel;
}

export interface BoardCardContainerProps extends ViewUXProps<"board-card-container", BoardViewSchema> {
    src: StoredBoardCardModel[];
}

export interface BoardCardItemProps extends ViewUXProps<"board-card-item", BoardViewSchema> {
    src: StoredBoardCardModel;
}

//

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}