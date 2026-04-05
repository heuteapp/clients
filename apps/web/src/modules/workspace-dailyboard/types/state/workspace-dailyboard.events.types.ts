import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export type FETCH_EVENT = { type: "FETCH", categoryPath: string, date: YYMMDDDate };