import UniqueData from "./uniqueData";

export type DataProps<T extends UniqueData> = Omit<T, "id">;

export default DataProps;

export function createData<T extends UniqueData>(data: DataProps<T>, genId?: () => string): T {
    const id = genId ? genId() : crypto.randomUUID();

    return {
        id,
        ...data,
    } as T;
}

export function createDataGivenId<T extends UniqueData>(id: string, data: Omit<T, "id">): T {
    return {
        id,
        ...data,
    } as T;
}