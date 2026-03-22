import { Identifier, ClientId, ServerId, DataIdentifier } from "@/src/types/shared/core/data";

export function createIdentifier(id?: Partial<Identifier>): Identifier {
    return {
        client: id?.client ? ensureClientId(id.client) : createClientId(),
    };
}

export function createDataIdentifier(id?: Partial<DataIdentifier>): DataIdentifier {
    return {
        client: id?.client ? ensureClientId(id.client) : createClientId(),
        server: id?.server ? ensureServerId(id.server) : null
    };
}

export function createClientId(): ClientId {
    return crypto.randomUUID() as ClientId;
}

export function ensureClientId(id: string): ClientId {
    return id as ClientId;
}

export function ensureServerId(id: string): ServerId {
    return id as ServerId;
}