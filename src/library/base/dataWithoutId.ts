import UniqueData from "./uniqueData";

export type DataWithoutId<T extends UniqueData> = Omit<T, "id">;

export default DataWithoutId;

export function assignData<T extends UniqueData>(data: DataWithoutId<T>, genId?: () => string): T {
    const id = genId ? genId() : crypto.randomUUID();

    return {
        id,
        ...data,
    } as T;
}

export function assignDataWithId<T extends UniqueData>(id: string, data: Omit<T, "id">): T {
    return {
        id,
        ...data,
    } as T;
}