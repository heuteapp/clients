import { assignDataWithId, DataWithoutId, UniqueData } from "@/src/library/base";
import { BoardFieldModel } from "./boardField";

export interface BoardLayoutModel extends UniqueData {
    fields: BoardFieldModel[];
}

export default BoardLayoutModel;

export function boardLayout(id: string, data: DataWithoutId<BoardLayoutModel>): BoardLayoutModel {
    const layout = assignDataWithId<BoardLayoutModel>(id, data);
    const ids = new Set<string>();

    for (const field of layout.fields) {
        if (ids.has(field.id)) {
            throw new Error(`Layout ${id} has duplicate field id: ${field.id}`);
        }
        ids.add(field.id);
    }

    return layout;
}