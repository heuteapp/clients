export interface BaseData {
    id: Identifier;
}

export type Identifier = ClientId | ServerId;

export type ClientId = string & { __brand: "ClientId" };

export type ServerId = string & { __brand: "ServerId" };