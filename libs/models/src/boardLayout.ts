import { createDataWithId, DataProps, UniqueData } from "@heuteapp/common";
import { BoardFieldModel } from "./boardField";

export interface BoardLayoutModel extends UniqueData {
    fields: BoardFieldModel[];
}

export function boardLayout(id: string, props: DataProps<BoardLayoutModel>): BoardLayoutModel {
    return createDataWithId<BoardLayoutModel>(id, props);
}