import { createDataWithId, DataProps, UniqueData } from "@heuteapp/common";
import { BoardSectionModel } from "./board-section";

export interface BoardLayoutModel extends UniqueData {
    fields: BoardSectionModel[];
}

export function boardLayout(id: string, props: DataProps<BoardLayoutModel>): BoardLayoutModel {
    return createDataWithId<BoardLayoutModel>(id, props);
}