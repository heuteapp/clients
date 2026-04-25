import { StoredBoardModel, StoredBoardCardModel } from "@/src/heute-store/types/board.types";
import { StoredCanvasModel } from "@/src/heute-store/types/canvas.types";

export interface BoardRootProps {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: StoredBoardModel;
    canvasSrc: StoredCanvasModel;
}

export interface BoardCardContainerProps {
    src: StoredBoardCardModel[];
}

export interface BoardCardItemProps {
    src: StoredBoardCardModel;
}

//

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}