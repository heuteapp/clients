import { UniqueData } from "@/src/library/base";
import { BoardFieldModel } from "./boardField";

export interface BoardLayoutModel extends UniqueData {
    fields: BoardFieldModel[];
}

export default BoardLayoutModel;