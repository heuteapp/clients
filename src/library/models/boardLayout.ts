import { createDataWithId, DataProps, UniqueData } from "@/src/library/base";
import { BoardFieldModel } from "./boardField";

export interface BoardLayoutModel extends UniqueData {
    fields: BoardFieldModel[];
}

export default BoardLayoutModel;

export function boardLayout(id: string, data: DataProps<BoardLayoutModel>): BoardLayoutModel {
    return createDataWithId<BoardLayoutModel>(id, data);
}