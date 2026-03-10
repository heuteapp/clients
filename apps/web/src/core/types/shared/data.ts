export interface BaseData {
    id: Identifier;
}

export type DataContent<T extends BaseData> = Omit<T, "id">;

export type Identifier = {
    client: ClientId;
    server: ServerId | null;
};

export type ClientId = string & { __brand: "ClientId" };

export type ServerId = string & { __brand: "ServerId" };