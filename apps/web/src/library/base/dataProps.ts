import type { UniqueData } from "./uniqueData";

export type DataProps<T extends UniqueData> = Omit<T, "id">;

export function createData<T extends UniqueData>(props: DataProps<T>, genId?: () => string): T {
    const id = genId ? genId() : crypto.randomUUID();

    return {
        id,
        ...props,
    } as T
;
}

export function createDataWithId<T extends UniqueData>(id: string, props: DataProps<T>): T {
    return {
        id,
        ...props,
    } as T;
}