import { UniqueData } from "@/src/library/base";
import { DayboardFieldModel } from "./boardField";

export interface DayboardLayoutModel extends UniqueData {
    fields: DayboardFieldModel[];
}

export default DayboardLayoutModel;