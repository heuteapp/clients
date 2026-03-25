import { YYMMDDDate } from "./date.types";

export interface BoardPath {
    categories: string[];
    date: YYMMDDDate | null;
}