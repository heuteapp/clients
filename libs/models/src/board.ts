import { UniqueData, DataProps, createDataWithId } from "@heuteapp/common";
import { BoardCardModel } from "./board-card";

export interface BoardModel extends UniqueData {
    layoutId: string
    cards: BoardCardModel[];
}

export default BoardModel;

//

export function board(id: string, props: DataProps<BoardModel>) : BoardModel {
    return createDataWithId<BoardModel>(id, props);
}