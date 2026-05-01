import { StoredBoardModel } from "@/src/heute-store/types/board.types";
import { StoredCanvasModel } from "@/src/heute-store/types/canvas.types";
import { BoardCardModel, BoardModel } from "../../d-board/types/board.model.types";

export interface BoardRootProps {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    canvasRef?: React.RefObject<HTMLDivElement | null>;
    src: BoardModel;
    canvasSrc: StoredCanvasModel;
}

export interface BoardCardContainerProps {
    src: BoardCardModel[];
}

export interface BoardCardItemProps {
    src: BoardCardModel;
}

//

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}