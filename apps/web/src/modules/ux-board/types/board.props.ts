import { StoredBoardModel, StoredBoardCardModel } from "@/src/heute-store/types/board.types";

export interface BoardRootProps {
    data: StoredBoardModel;
}

export interface BoardCardContainerProps {
    cards: StoredBoardCardModel[];
}

export interface BoardCardItemProps {
    data: StoredBoardCardModel;
}

//

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}