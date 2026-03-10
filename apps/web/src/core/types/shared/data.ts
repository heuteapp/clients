export interface BaseData {
    id: DataIdentifier;
}

export type DataContent<T extends BaseData> = Omit<T, "id">;

export interface Identifier {
    client: ClientId;
};

export interface DataIdentifier extends Identifier {
    server: ServerId | null;
}

export type ClientId = string & { __brand: "ClientId" };

export type ServerId = string & { __brand: "ServerId" };