import { BoardViewSchema } from "../types/view.types";

export const boardView = <const ID extends string>(id: ID) => ({
    schema: {} as BoardViewSchema,
    id,
});

export const boardRootView = {
    key: "board",
    schema: {} as BoardViewSchema,
} as const;